const db = require("./db");

const Sequelize = require("sequelize");

const Books = db.define("books_2", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  issueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  returnDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  fine: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Books;
