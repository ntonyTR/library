const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (e) =>
  newBookSumbitHandler(e, addBookForm)
);

function newBookSumbitHandler(e, form) {
  e.preventDefault();
  addBookToLibrary();
  showBookCard(library[library.length - 1], booksSection);
  form.reset();
}

function addBookToLibrary() {
  const newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );
  library.push(newBook);
}

const addBookButton = document.getElementById("add-book-button");
addBookButton.addEventListener("click", () =>
  toggleVisibility(formModal, "hidden")
);
const formModal = document.getElementById("form-modal");

const cancelButton = document.getElementById("cancel-button")
cancelButton.addEventListener("click", () => toggleVisibility(formModal, "hidden"))

function toggleVisibility(element, className) {
  element.classList.toggle(className);
}

const booksSection = document.getElementById("books-container");

function showBookCard(obj, section) {
  const book = generateBookCard(obj);
  section.appendChild(book);
}

function generateBookCard(obj) {
  let book = document.createElement("div");
  book.classList.add("book");
  const title = createBookCardElement("h1", obj.title);
  const author = createBookCardElement("h3", `By ${obj.author}`);
  const pages = createBookCardElement("p", `${obj.pages} pages`);
  const deleteButton = createBookCardElement("button", "Remove");
  const readButton = createBookCardElement("button", "read");

  if (!obj.read){
    toggleVisibility(readButton, "not-read")
  }

  readButton.addEventListener("click", () => {
    toggleVisibility(readButton, "not-read");
    obj.read = !obj.read;
  });

  deleteButton.addEventListener("click", () => deleteBookCard(book, obj));
  book.appendChild(title);
  book.appendChild(author);
  book.appendChild(pages);
  book.appendChild(readButton);
  book.appendChild(deleteButton);
  return book;
}

function deleteBookCard(bookCard, book) {
  bookCard.remove();
  const i = library.indexOf(book);
  if (i !== -1) {
    library.splice(i, 1);
  }
}

function createBookCardElement(tag, content) {
  const element = document.createElement(tag);
  element.textContent = content;
  return element;
}

//TEST
function testFunction() {
  const book1 = new Book("Lord of the Rings", "J. R. R. Tolkien", 389, true);
  library.push(book1);
  showBookCard(library[library.length - 1], booksSection);
  const book2 = new Book("Game of Thrones", "George R. R. Martin", 495, true);
  library.push(book2);
  showBookCard(library[library.length - 1], booksSection);
  const book3 = new Book("Misery", "Stephen King", 484, false);
  library.push(book3);
  showBookCard(library[library.length - 1], booksSection);
  const book4 = new Book("The Hunger Games", "Suzanne Collins", 312, false);
  library.push(book4);
  showBookCard(library[library.length - 1], booksSection);
}

// testFunction();
