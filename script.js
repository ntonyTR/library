const library = [];


document.addEventListener("DOMContentLoaded", () => { 

const addBookButton = document.getElementById("add-book-button");
const booksSection = document.getElementById("books-section");
const formModal = document.getElementById("form-modal");
const addBookForm = document.getElementById("add-book-form");
const cancelButton = document.getElementById("cancel-button");

addBookForm.addEventListener("submit", (e) =>
  bookSubmitHandler(e, addBookForm, booksSection)
);

addBookButton.addEventListener("click", () => toggleClass(formModal, "hidden"));

cancelButton.addEventListener("click", () => toggleClass(formModal, "hidden"));
})

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function bookSubmitHandler(e, form, section) {
  e.preventDefault();
  addBookToLibrary();
  showBookCard(library[library.length - 1], section);
  form.reset();
}

function createBook(title, author, pages, read) {
  const newBook = Object.create(Book.prototype);
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.read = read;
  return newBook;
}

function addBookToLibrary() {
  const newBook = createBook(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );
  library.push(newBook);
}

function showBookCard(obj, section) {
  const book = generateBookCard(obj);
  section.appendChild(book);
}

function toggleClass(element, className) {
  element.classList.toggle(className);
}

function generateBookCard(obj) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  const title = createBookCardElement("h1", obj.title);
  const author = createBookCardElement("h3", `By ${obj.author}`);
  const pages = createBookCardElement("p", `${obj.pages} pages`);
  const deleteButton = createBookCardElement("button", "Remove");
  const readButton = createBookCardElement("button", "Read");

  deleteButton.addEventListener("click", () => deleteBookCard(bookCard, obj));

  if (!obj.read) {
    toggleClass(readButton, "not-read");
  }

  readButton.addEventListener("click", () => {
    toggleClass(readButton, "not-read");
    obj.read = !obj.read;
  });

  const elements = [title, author, pages, readButton, deleteButton];

  elements.forEach((element) => {
    bookCard.appendChild(element);
  });

  return bookCard;
}

function createBookCardElement(tag, content) {
  const element = document.createElement(tag);
  element.textContent = content;
  return element;
}

function deleteBookCard(bookCard, book) {
  bookCard.remove();
  const i = library.indexOf(book);
  if (i !== -1) {
    library.splice(i, 1);
  }
}