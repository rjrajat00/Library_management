const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController");

console.log("Reached /api/return route");

router.post("/", returnController.addReturnBooks);

router.get("/returnedBooks", returnController.getReturnBooks);

module.exports = router;
