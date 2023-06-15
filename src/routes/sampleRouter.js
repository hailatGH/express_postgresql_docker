const express = require("express");
const { sampleController } = require("../controllers");

const router = express.Router();

const routes = (app) => {
  router.post("/create", sampleController.create);
  router.get("/list", sampleController.list);
  router.get("/get/:id", sampleController.get);
  router.delete("/delete/:id", sampleController.destroy);
  router.patch("/update/:id", sampleController.update);

  app.use(router);
};

module.exports = routes;