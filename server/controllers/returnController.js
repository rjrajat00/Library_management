const ReturnedBooks = require("../models/returnedBooks");

const addReturnBooks = async (req, res) => {
  try {
    const { book, issuedDate, returnedDate } = req.body;

    const ISTTimeZone = "Asia/Kolkata";

    // Get the current time in IST
    const returnedOn = new Date().toLocaleString("en-US", {
      timeZone: ISTTimeZone,
    });

    console.log(
      "returned Book=>",
      book,
      "issueD Date=>",
      issuedDate,
      "return date=>",
      returnedDate,
      "Book Returned on=> ",
      returnedOn
    );

    const newBook = await ReturnedBooks.create({
      name: book,
      issuedDate: issuedDate, // Use the current IST time
      returnedDate: returnedDate,
      returnedOn: returnedOn,
    });

    console.log(newBook);

    res.status(201).send(newBook);
  } catch (error) {
    res.status(404).send("Unable to insert the returned book in db book");
  }
};

const getReturnBooks = async (req, res) => {
  try {
    const newBook = await ReturnedBooks.findAll();

    res.status(201).send(newBook);
  } catch (error) {
    res.status(404).send(`Unable to fetch return books data, ${error}`);
  }
};

module.exports = { addReturnBooks, getReturnBooks };
