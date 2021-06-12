const router = (module.exports = require("express").Router());
const paths = (module.exports.paths = {});
const basePath = "/api/users";
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("./users.utils");
const { UserModel } = require("./User.model");
const { authenticateToken } = require("./users.utils");
const {
  formatMongooseErrResponse,
  modelCreateValidateAndSave,
  modelQuery,
  modelFindById,
  modelUpdateById,
  modelDeleteById,
  createAddRouter,
} = require("../../utils/router.utils");
const {
  schema,
  register: registerSchema,
} = require("../../../src/schemas/users.schema");
const addRoute = createAddRouter({ basePath: "/api/users", router, paths });

addRoute(
  {
    path: "/",
    method: "get",
  },
  authenticateToken,
  function (req, res) {
    modelQuery({
      req,
      res,
      Model: UserModel,
      fieldHandlers: {},
      modifyItem: (item) => {
        item.password = undefined;
        return item;
      },
    });
  }
);

addRoute(
  {
    path: "/:id",
    method: "get",
  },
  function (req, res) {
    modelFindById({ Model: UserModel, req, res });
  }
);

// addRoute({
//   path: "/:id",
//   method: "delete",
//   funcs: [
//     function (req, res) {
//       modelDeleteById({ Model: UserModel, req, res });
//     },
//   ],
// });

// addRoute({
//   path: "/:id",
//   method: "put",
//   funcs: [
//     function (req, res) {
//       modelUpdateById({
//         Model: UserModel,
//         req,
//         res,
//         update: req.body,
//       });
//     },
//   ],
// });

addRoute(
  {
    path: "/register",
    method: "post",
    schema: registerSchema,
  },

  function (req, res) {
    const body = { ...req.body };
    const validation = schema.validate(body);
    if (validation.error) {
      const validationErrorMessage =
        validation.error &&
        validation.error.details &&
        validation.error.details[0] &&
        validation.error.details[0].message;
      let errorMessage = validationErrorMessage
        ? validationErrorMessage
        : "Error validating user"; // generic in case drilling down doesn't work

      return res
        .status(400)
        .json({ errorMessage, errorCode: "VALIDATION_ERROR" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(body.password, salt, function (err, hash) {
        const user = new UserModel({
          username: body.username.toLowerCase(),
          email: body.email.toLowerCase(),
          password: hash,
          role: ["owner", "regular"].includes(body.role)
            ? body.role
            : "regular",
        });
        user.save((err, b) => {
          if (err) {
            return res.status(400).json(formatMongooseErrResponse(err));
          } else {
            return res.json({
              successMessage: `User ${user.username} created, please log in.`,
              item: user,
              successCode: "USER_REGISTERED",
            });
          }
        });
      });
    });
  }
);

addRoute({ path: "/login", method: "post" }, function (req, res) {
  const body = req.body;
  for (var key in body) {
    if (body[key].trim) {
      body[key] = body[key].trim();
    }
  }
  UserModel.findOne(
    {
      $or: [
        { username: body.username.toLowerCase() },
        { email: body.username.toLowerCase() },
      ],
    },
    function (err, user) {
      if (err) {
        return res.status(401).json({ errorMessage: err.errmsg });
      }
      if (!user) {
        return res.status(401).json({
          errorMessage: `User ${body.username} not found`,
          errorCode: "USER_NOT_FOUND",
        });
      }
      bcrypt.compare(body.password, user.password).then((result) => {
        if (!result) {
          return res
            .status(401)
            .json({ errorMessage: "Login failure: bad password" });
        }
        delete user.password;
        const token = generateAccessToken(user.toObject());
        return res.json({
          successMessage: "User logged in",
          successCode: "USER_LOGGED_IN",
          token,
          user,
        });
      });
    }
  );
});
