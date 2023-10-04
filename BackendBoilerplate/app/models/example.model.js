module.exports = (sequelize, Sequelize) => {
  const Example = sequelize.define("nota", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Example;
};
