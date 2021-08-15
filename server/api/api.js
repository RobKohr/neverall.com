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
});

const swaggerUI = require("swagger-ui-express");
const swaggerJson = {
  openapi: "3.0.0",
  info: {
    title: "Neverall API",
    description: "Apis for all neverall services",
    version: "1.0.0",
  },
  paths,
};

router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
