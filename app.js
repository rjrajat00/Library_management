const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const db = require("./server/models/db");

const cors = require("cors");

const bookRouter = require("./server/routes/routes");
const returnBook = require("./server/routes/routes2");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/books", bookRouter);
app.use("/api/return", returnBook);

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const port = process.env.PORT || 4000;

db.authenticate()
  .then(() => {
    console.log("connected to DAtabase Successfully");

    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => console.log("failed to cnnect to Db", err));
