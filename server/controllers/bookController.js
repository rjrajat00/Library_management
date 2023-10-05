const moment = require("moment-timezone");
const Books = require("../models/bookModels");

const getAllBooks = async (req, res) => {
  try {
    const newBook = await Books.findAll();

    res.status(201).send(newBook);
  } catch (error) {
    res.status(404).send("Error in fetching the books", error);
  }
};

const addBooks = async (req, res) => {
  try {
    const { book } = req.body;

    console.log("this is the book==>", book);

    // Set the time zone to IST (Indian Standard Time)
    const ISTTimeZone = "Asia/Kolkata";

    // Get the current time in IST
    const currentISTTime = new Date().toLocaleString("en-US", {
      timeZone: ISTTimeZone,
    });

    // Calculate return date (1 hour later) in IST
    const returnDate = new Date(Date.now() + 60 * 60 * 1000).toLocaleString(
      "en-US",
      { timeZone: ISTTimeZone }
    );

    let fine = 0;
    const timeDifference = new Date(returnDate) - new Date(currentISTTime);
    if (timeDifference > 60 * 60 * 1000) {
      const additionalHours = Math.ceil(timeDifference / (60 * 60 * 1000)) - 1;
      fine = additionalHours * 10;
    }

    const newBook = await Books.create({
      name: book,
      issueDate: currentISTTime, // Use the current IST time
      returnDate: returnDate,
      fine: fine,
    });

    console.log(newBook);

    res.status(201).send(newBook);
  } catch (error) {
    res.status(404).send("Unable to send the book");
  }
};

module.exports = { getAllBooks, addBooks };
