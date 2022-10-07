const Sequelize = require("sequelize");
const database = require("../db.js");

const Transaction = database.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  broker: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  assets: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  negociation_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  order: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Transaction;
