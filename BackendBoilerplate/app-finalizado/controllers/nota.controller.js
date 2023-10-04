const db = require("../models");
const Nota = db.Notas;
const Op = db.Sequelize.Op;

// Create and Save a new Nota
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Nota
  const Nota = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Nota in the database
  Nota.create(Nota)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Nota."
      });
    });
};

// Retrieve all Notas from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Nota.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Notas."
      });
    });
};

// Find a single Nota with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Nota.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Nota with id=" + id
      });
    });
};

// Update a Nota by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Nota.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Nota was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Nota with id=${id}. Maybe Nota was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Nota with id=" + id
      });
    });
};

// Delete a Nota with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Nota.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Nota was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Nota with id=${id}. Maybe Nota was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Nota with id=" + id
      });
    });
};

// Delete all Notas from the database.
exports.deleteAll = (req, res) => {
  Nota.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Notas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Notas."
      });
    });
};
