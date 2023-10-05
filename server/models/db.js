const Sequelize = require("sequelize");

const sequelize = new Sequelize("library", "root", "Icando00@#", {
  dialect: "mysql",
  host: "localhost",
});

async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connected To DataBase Successfully");

    await sequelize.sync();
    console.log("synchronized with DB successfully");
  } catch (error) {
    console.log("Failed to connect to DB", error);
  }
}

connectToDb();

module.exports = sequelize;
