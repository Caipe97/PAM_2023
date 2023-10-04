module.exports = (sequelize, Sequelize) => {
  const Nota = sequelize.define("nota", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Nota;
};
