const express = require("express");
const router = express.Router();
const booksController = require("../controllers/bookController");

console.log("Reached /api/books route");

router.post("/", booksController.addBooks);

router.get("/", booksController.getAllBooks);

module.exports = router;
