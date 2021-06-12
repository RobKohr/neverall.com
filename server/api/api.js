const express = require("express");
const router = (module.exports = express.Router());

const routes = [{ name: "users" }];
const paths = {};
routes.forEach((route) => {
  const name = route.name;
  const module = require(`./${name}/${name}.router`);
  for (key in module.paths) {
    paths[key] = module.paths[key];
  }
  router.use(`/${name}`, module);
  // console.log(JSON.stringify(paths, 0, 5));
});

//router.use("/users", require("./users/users.router"));
// router.use("/restaurants", require("./restaurants/restaurants.router"));
// router.use("/reviews", require("./reviews/reviews.router"));

const swaggerUI = require("swagger-ui-express");
const swaggerJson = {
  openapi: "3.0.0",
  info: {
    title: "Neverall API",
    description: "Apis for all neverall services",
    version: "1.0.0",
  },
  // servers: [
  //   {
  //     url: "http://api.example.com/v1",
  //     description: "Optional server description, e.g. Main (production) server",
  //   },
  //   {
  //     url: "http://staging-api.example.com",
  //     description:
  //       "Optional server description, e.g. Internal staging server for testing",
  //   },
  // ],
  paths,
};

router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
