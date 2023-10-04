module.exports = app => {
  const notas = require("../controllers/nota.controller.js");

  var router = require("express").Router();

  // Create a new Nota
  router.post("/", notas.create);

  // Retrieve all Notas
  router.get("/", notas.findAll);


  // Retrieve a single Nota with id
  router.get("/:id", notas.findOne);

  // Update a Nota with id
  router.put("/:id", notas.update);

  // Delete a Nota with id
  router.delete("/:id", notas.delete);

  // Delete all Notas
  router.delete("/", notas.deleteAll);

  app.use("/api/notas", router);
};
