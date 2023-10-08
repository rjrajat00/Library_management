document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const returnedBooksList = document.getElementById("returnedBooks");
  returnedBooksList.innerHTML = `<b style="margin-bottom: 15px;">Returned Books List:</b>`;
  returnedBooksList.style.marginTop = "25px";
  returnedBooksList.style.marginBottom = "25px";
  returnedBooksList.style.marginLeft = "15px";
  returnedBooksList.classList.add("row");
  returnedBooksList.style.backgroundColor = "lavender";

  const container = document.getElementById("cardContainer");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const book = document.getElementById("bookName").value;

    const data = {
      book: book,
    };

    try {
      const response = await axios.post("/api/books", data);

      container.innerHTML = "";

      console.log("Book Added", response.data);
      await getAllBooks();

      form.reset();
    } catch (error) {
      console.error("Unable to send Book", error);
    }
  });

  async function getAllBooks() {
    try {
      const response = await axios.get("/api/books");

      for (const booksData of response.data) {
        const card = document.createElement("div");
        card.classList.add("card", "row");
        card.style.width = "18rem";
        card.style.height = "35rem";
        card.style.marginBottom = "15px";
        card.style.marginLeft = "15px";
        card.style.backgroundColor = "lightcoral";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.textContent = "Book Details";

        cardBody.appendChild(h5);

        const ul = document.createElement("ul");
        ul.classList.add("list-group", "list-group-flush");

        const li1 = document.createElement("li");
        li1.classList.add("list-group-item");
        li1.innerHTML = `<b >Book Name:</b> <span style=" color: blue;"> ${booksData.name}</span>`;

        const li2 = document.createElement("li");
        li2.classList.add("list-group-item");
        li2.innerHTML = `<b >Issue Date:</b> <span style=" color: blue;"> ${formatDateTime(
          booksData.issueDate
        )}</span>`;

        const li3 = document.createElement("li");
        li3.classList.add("list-group-item");
        li3.innerHTML = `<b >Return Date:</b> <span style=" color: blue;"> ${formatDateTime(
          booksData.returnDate
        )}</span>`;

        const currentTime = new Date();
        const timeDifference = currentTime - new Date(booksData.returnDate);
        // Calculate the fine based on the difference
        const fine = Math.max(
          Math.ceil(timeDifference / (60 * 60 * 1000)) * 10,
          0
        );

        const li4 = document.createElement("li");
        li4.classList.add("list-group-item");
        li4.innerHTML = `<b >Total Fine:</b> <span style=" color: blue;"> ₹ ${fine}</span>`;

        ul.style.marginBottom = "25px";
        ul.style.marginLeft = "7px";
        ul.style.backgroundColor = "mistyrose";

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);

        const img = document.createElement("img");
        img.src = "./library.png";
        img.classList.add("card-img-top");
        img.alt = "Card Image";
        img.style.marginTop = "25px";

        const returnButton = document.createElement("button");
        returnButton.classList.add("btn", "btn-dark", "btn-sm");
        returnButton.style.width = "50px";
        returnButton.style.width = "80px";
        returnButton.style.height = "30px";
        returnButton.style.marginLeft = "30px";
        returnButton.style.marginBottom = "15px";

        returnButton.setAttribute("id", "returnButton");
        returnButton.textContent = `Return`;

        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(ul);
        card.appendChild(returnButton);

        const payFine = document.createElement("button");
        payFine.classList.add("btn", "btn-success", "btn-sm");
        payFine.id = "payFine";
        payFine.innerHTML = `Pay Fine Rs. ${fine}`;
        payFine.style.width = "150px";
        payFine.style.height = "30px";
        payFine.style.marginLeft = "30px";
        payFine.style.marginBottom = "15px";
        payFine.style.display = "none";

        card.appendChild(payFine);

        returnButton.addEventListener("click", async () => {
          await handleReturnButtonClick(booksData, returnButton, payFine);
        });

        payFine.addEventListener("click", async () => {
          await handlePayFineClick(booksData, returnButton, payFine);
        });

        container.appendChild(card);
      }
    } catch (error) {
      console.error("Error in fetching Data", error);
    }
  }

  function formatDateTime(dateTimeStr) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = new Date(dateTimeStr).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  async function removeBook(bookId) {
    try {
      const delBook = await axios.delete(`/api/books/${bookId}`);

      console.log(delBook);
    } catch (error) {
      console.error("Error removing book from DB1", error);
    }
  }

  async function getReturnBooks() {
    try {
      const response3 = await axios.get("/api/return/returnedBooks");

      returnedBooksList.innerHTML = "";

      console.log(response3);

      response3.data.forEach((retBook) => {
        const card = document.createElement("div");
        card.classList.add("card", "row");
        card.style.width = "15rem";
        card.style.height = "25rem";
        card.style.marginBottom = "15px";
        card.style.marginLeft = "15px";
        card.style.backgroundColor = "aqua";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.style.width = "90vw"; // 90% of viewport width
        cardBody.style.height = "70vh";
        cardBody.style.overflow = "auto";

        const ul = document.createElement("ul");
        ul.classList.add("list-group", "list-group-flush");

        const li1 = document.createElement("li");
        li1.classList.add("list-group-item");
        li1.innerHTML = `<b >Book Name:</b> <span style=" color: teal;"> <b>${retBook.name}</b></span>`;

        const li2 = document.createElement("li");
        li2.classList.add("list-group-item");
        li2.innerHTML = `<b >Issue Date:</b> <span style=" color:olive;"> ${formatDateTime(
          retBook.issuedDate
        )}</span>`;

        const li3 = document.createElement("li");
        li3.classList.add("list-group-item");
        li3.innerHTML = `<b >Return Date:</b> <span style=" color: olive;"> ${formatDateTime(
          retBook.returnedDate
        )} </span>`;

        const currentTime = new Date();
        const timeDifference = currentTime - new Date(retBook.returnedDate);
        // Calculate the fine based on the difference

        const fine = Math.max(
          Math.ceil(timeDifference / (60 * 60 * 1000)) * 10,
          0
        );

        const li4 = document.createElement("li");
        li4.classList.add("list-group-item");
        li4.innerHTML = `<b >Fine Paid:</b> <span style=" color: red;"> <b>₹ ${fine} </b></span>`;

        ul.style.marginBottom = "25px";
        ul.style.marginLeft = "7px";
        ul.style.backgroundColor = "mistyrose";

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);

        cardBody.appendChild(ul);

        const returnOn = document.createElement("span");
        returnOn.innerHTML = `<b style="color:tomato;">Book Returned On: </b>${formatDateTime(
          retBook.returnedOn
        )} `;
        cardBody.appendChild(returnOn);

        card.appendChild(cardBody);

        returnedBooksList.appendChild(card);
      });
    } catch (error) {
      console.error("failed to send get req from the client side", error);
    }
  }

  async function handleReturnButtonClick(booksData, returnButton, payFine) {
    try {
      const currentTime = new Date();
      const timeDifference = currentTime - new Date(booksData.returnDate);
      const fine = Math.max(
        Math.ceil(timeDifference / (60 * 60 * 1000)) * 10,
        0
      );

      if (fine > 0) {
        returnButton.style.display = "none";
        payFine.style.display = "block";
      } else {
        returnButton.style.display = "none";

        const returnBookData = {
          book: booksData.name,
          issuedDate: booksData.issueDate,
          returnedDate: booksData.returnDate,
        };

        const response = await axios.post("/api/return", returnBookData);
        console.log("Book Returned", response.data);
        removeBook(booksData.id);
        getReturnBooks();
        const cardToRemove = returnButton.parentElement;
        container.removeChild(cardToRemove);
      }
    } catch (error) {
      console.error("Failed to handle return button click", error);
    }
  }

  async function handlePayFineClick(booksData, returnButton, payFine) {
    try {
      console.log("Fine button is clicked");

      const returnBookData = {
        book: booksData.name,
        issuedDate: booksData.issueDate,
        returnedDate: booksData.returnDate,
      };

      const response = await axios.post("/api/return", returnBookData);
      console.log("Book Returned", response.data);
      removeBook(booksData.id);
      getReturnBooks();
      const cardToRemove = returnButton.parentElement;
      container.removeChild(cardToRemove);
    } catch (error) {
      console.error("Error in paying fine", error);
    }
  }

  getAllBooks();
  getReturnBooks();
});
