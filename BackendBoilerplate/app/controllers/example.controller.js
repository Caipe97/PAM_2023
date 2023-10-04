const db = require("../models");

exports.findAll = (req, res) => {
  res.send({"message": "Hola mundo!"})
};
