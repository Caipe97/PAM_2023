module.exports = app => {
  const examples = require("../controllers/example.controller.js");

  var router = require("express").Router();

  // Retrieve all Examples
  router.get("/", examples.findAll);

  app.use("/api/examples", router);
};
