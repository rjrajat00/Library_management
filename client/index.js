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
      getAllBooks();

      form.reset();
    } catch (error) {
      console.error("Unable to send Book", error);
    }
  });

  async function getAllBooks() {
    try {
      const response = await axios("/api/books");

      response.data.forEach((booksData) => {
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

        //         p1.innerText=`${booksData._id}`;
        //         p1.innerText=`${booksData}`

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
        //
        //         li.classList.add("list-group-item");
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

        //        returnButton.setAttribute('data-toggle','modal');
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

        returnButton.addEventListener("click", () => {
          if (fine > 0) {
            returnButton.style.display = "none"; // Hide the Return Book button
            payFine.style.display = "block"; // Show the Pay Fine button
          } else {
            returnButton.style.display = "none";

            const returnedTime = formatDateTime(new Date());

            const bookReturned = document.createElement("p");
            bookReturned.innerText = `Book Returned On: ${returnedTime}`;
            cardBody.appendChild(bookReturned);

            returnedBooksList.appendChild(card);
          }
        });

        payFine.addEventListener("click", () => {
          console.log("fine button is clicked");
          payFine.style.display = "none";
          const returnedTime = formatDateTime(new Date());

          const bookReturned = document.createElement("p");
          bookReturned.innerText = `Book Returned On: ${returnedTime}`;
          cardBody.appendChild(bookReturned);
          li4.innerHTML = `<b > Fine Paid:</b> <span style=" color: blue;"> ₹ ${fine}</span>`;

          returnedBooksList.appendChild(card);
        });

        container.appendChild(card);
      });
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

  getAllBooks();
});
