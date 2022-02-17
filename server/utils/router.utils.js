const { number } = require("joi");
const { isCompositeComponent } = require("react-dom/test-utils");
const joiToSwagger = require("joi-to-swagger");

function createAddRouter({ basePath, router, paths }) {
  return function addRoute(
    { path, method, content, schema, ...props },
    ...funcs
  ) {
    let swaggerPath = basePath + path;
    const matches = swaggerPath.match(/(\:[a-zA-Z0-9]+)/g);
    if (schema) {
      const { swagger: swaggerSchema, components } = joiToSwagger(schema);
      props.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: swaggerSchema,
          },
        },
      };
    }
    if (matches) {
      matches.forEach((match) => {
        const name = match.replace(":", "");
        swaggerPath = swaggerPath.replace(
          match,
          `\{${match.replace(":", "")}\}`
        );
        if (!props.parameters) {
          props.parameters = [];
        }
        const alreadyExistsAt = props.parameters.find(
          (param) => param.name === name
        );
        if (typeof alreadyExistsAt === "undefined") {
          props.parameters.push({
            name,
            in: "path",
            required: true,
          });
        } else {
          console.error({ alreadyExistsAt });
        }
      });
    }

    paths[swaggerPath] = {
      [method]: {
        ...props,
        responses: {
          200: {
            description: "A JSON array of user names",
            content: {
              "application/json": {
                schema: content,
              },
            },
          },
        },
      },
    };
    if (!router[method]) {
      throw new Error(`Router method ${method} doesn't exist`);
    }
    router[method](path, curryValidateBodySchema(schema), ...funcs);
  };
}

function curryValidateBodySchema(schema) {
  if (!schema) {
    return function (req, res, next) {
      return next();
    };
  }
  return function (req, res, next) {
    const validation = schema.validate(req.body, {
      abortEarly: false,
    });
    const errorMessages = validation?.error?.details.map(
      ({ message }) => message
    );
    if (errorMessages?.length) {
      console.error({ validationError: errorMessages });
      return res.status(400).json({
        errorMessages,
        errorCode: "VALIDATION_ERROR",
      });
    }
    return next();
  };
}

function formatMongooseErrResponse(err) {
  const code = err.errmsg && err.errmsg.substr(0, 6);
  if ("E11000" === code) {
    return {
      errorCode: "ALREADY_EXISTS",
      errorMessage: err.errmsg.split('"')[1] + " already exists.",
    };
  }
  if (err.message) {
    err.errorCode = "MONGOOSE_VALIDATION_ERROR";
    err.errorMessage = err.message.split("Path ")[1]
      ? err.message.split("Path ")[1]
      : err.message;
  }
  return err;
}
function formatSchemaErrResponse({ schema, obj }) {
  const result = schema.validate(obj);
  if (!result.error || !result.error.details) {
    return;
  }
  result.errorMessage = "";
  result.errorMessages = [];
  result.errorCode = "SCHEMA_VALIDATION_ERROR";
  result.error.details.forEach(({ message }) => {
    result.errorMessages.push(message);
  });
  result.errorMessage = result.errorMessages.join("\n");
  return result;
}

function modelCreateValidateAndSave({
  obj,
  Model,
  schema,
  res,
  callWhenUpdated = () => {},
}) {
  const err = formatSchemaErrResponse({ schema, obj });
  if (err) {
    return res.status(400).json(err);
  }
  const modelObj = new Model(obj);
  modelObj.save((err, doc) => {
    if (err) {
      console.error(JSON.stringify(err, 0, 5));
      return res.status(400).json(formatMongooseErrResponse(err));
    }
    callWhenUpdated(doc);
    res.json(doc);
  });
}
function modelQuery({
  req,
  res,
  Model,
  fieldHandlers = {},
  modifyItem = (item) => item,
}) {
  const query = {};
  let sortField = "";
  let order = 1;
  let page = 1;
  let itemsPerPage = 10;
  fieldHandlers = {
    ...fieldHandlers,
    _sort: (val) => {
      sortField = val;
    },
    _order: (val) => {
      order = val === "asc" ? 1 : -1;
    },
    _page: (val) => {
      val = Number(val) ? Number(val) : 1;
      page = val;
    },
    _itemsPerPage: (val) => {
      val = Number(val) ? Number(val) : 100;
      itemsPerPage = val < 100 && val > 0 ? val : 100;
    },
    $text: (val) => {
      if (val) {
        return { $search: val };
      }
    },
  };

  for (let key in req.query) {
    let val = req.query[key];
    if (val === "true") {
      val = true;
    }
    if (val === "false") {
      val = false;
    }
    if (fieldHandlers[key]) {
      const newVal = fieldHandlers[key](val);
      if (newVal !== undefined) {
        query[key] = newVal;
      }
    } else if (key.endsWith("_like")) {
      query[key.replace("_like", "")] = new RegExp(val, "i");
    } else if (key.includes("_")) {
      parts = key.split("_");
      query[parts[0]] = { ["$" + parts[1]]: val };
    } else {
      query[key] = val;
    }
  }
  console.info({ query });

  const sort = sortField ? { [sortField]: order } : {};
  Model.find(query)
    .sort(sort)
    .skip(itemsPerPage * (page - 1))
    .limit(itemsPerPage)
    .exec((err, items) => {
      if (err) {
        console.error({ err });
      }
      items = (items ? items : []).map(modifyItem);
      return res.json({ items });
    });
}

function modelFindById({ Model, req, res }) {
  Model.findById(req.params.id, (err, item) => {
    if (!item) {
      return res
        .status(404)
        .json({ errorMessage: "Not found", errorCode: "NOT_FOUND" });
    }
    return res.json({ item });
  });
}

function modelDeleteById({ Model, req, res }) {
  Model.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.status(500).json({
        errorCode: "DELETE_FAILURE",
        doc,
        err,
        errorMessage: "Failed to delete",
      });
    } else {
      res.json({
        successCode: "DELETE_SUCCESSFUL",
        successMessage: "Record deleted",
      });
    }
  });
}

function modelUpdateById({
  Model,
  req,
  res,
  update,
  callWhenUpdated = () => {},
}) {
  Model.findByIdAndUpdate(req.params.id, update, (err, item) => {
    if (err) {
      return res.json(err);
    }
    if (!item) {
      return res
        .status(404)
        .json({ errorMessage: "Not found", errorCode: "NOT_FOUND" });
    }
    // get the updated object to return
    Model.findById(req.params.id, (err, item) => {
      if (!item) {
        return res
          .status(404)
          .json({ errorMessage: "Not found", errorCode: "NOT_FOUND" });
      }
      callWhenUpdated(item);
      return res.json({
        item,
        successCode: "UPDATED",
        successMessage: "Record updated",
      });
    });
  });
}

const roleRights = {
  all: [],
  admin: ["set-role", "update-review", "update-restaurant"],
  owner: [
    "review-reply",
    "create-restaurant",
    "update-review",
    "update-restaurant",
  ],
  regular: ["create-review", "update-review"],
};

function doesRoleHaveRight({ role, right }) {
  const rights = roleRights[role]
    ? [...roleRights[role], ...roleRights["all"]]
    : [...roleRights["all"]];
  return rights.includes(right);
}

function hasRight(right) {
  return function testRight(req, res, next) {
    const role = req.user.role;
    if (!doesRoleHaveRight({ role, right })) {
      return res.status(403).json({
        errorMessage: `Your role ${role} does not have right ${right}`,
        errorCode: "DOESNT_HAVE_RIGHT",
      });
    }
    if (right === "update-review") {
      if (role === "owner" && (req.body.rating || req.body.comment)) {
        return res.status(403).json({
          errorMessage: `Your role ${role} does not have right to update ratings or comments`,
          errorCode: "DOESNT_HAVE_RIGHT_TO_UPDATE_VALUE",
        });
      }
      if (role === "regular" && req.body.reply) {
        return res.status(403).json({
          errorMessage: `Your role ${role} does not have right to reply to a review`,
          errorCode: "DOESNT_HAVE_RIGHT_TO_UPDATE_VALUE",
        });
      }
    }
    return next();
  };
}

module.exports = {
  hasRight,
  formatMongooseErrResponse,
  formatSchemaErrResponse,
  modelCreateValidateAndSave,
  modelQuery,
  modelFindById,
  modelUpdateById,
  modelDeleteById,
  createAddRouter,
};
