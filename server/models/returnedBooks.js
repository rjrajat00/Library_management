const db = require("./db");

const Sequelize = require("sequelize");

const ReturnedBooks = db.define("returned_2", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  issuedDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnedDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnedOn: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = ReturnedBooks;
