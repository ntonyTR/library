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
  addBookButton.addEventListener("click", () =>
    toggleClass(formModal, ["hidden", "modal"])
  );
  cancelButton.addEventListener("click", () =>
    toggleClass(formModal, ["hidden", "modal"])
  );

  addDefaultBooks(booksSection);
});

function addDefaultBooks(section) {
  const defaultBooks = [
    new Book("Game of Thrones", "George R.R. Martin", 694, true),
    new Book("The Lord of the Rings", "J.R.R. Tolkien", 1216, false),
    new Book("It", "Stephen King", 1168, true),
  ];

  defaultBooks.forEach((book) => {
    library.push(book);
    showBookCard(book, section);
  });
}

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
  const firstChild = section.firstChild;
  section.insertBefore(book, firstChild);
}

function toggleClass(element, classNames =[]) {
  classNames.forEach(className => {
    element.classList.toggle(className)
  });
}

function generateBookCard(obj) {
  const bookCard = createBookCardElement("div", "", [
    "book-card",
  ]);
  const title = createBookCardElement("h3", obj.title, []);
  const author = createBookCardElement("h6", `By ${obj.author}`, []);
  const pages = createBookCardElement("p", `${obj.pages} pages`, []);
  const bookCardButtons = createBookCardElement("div", "",["card-buttons",]);
  const deleteButton = createBookCardElement("button", "", ["remove-button",]);
  const readButton = createBookCardElement("button", "READ", ["read",]);

  const buttons = [readButton, deleteButton]
  buttons.forEach((button) => {
    bookCardButtons.appendChild(button)
  })

  deleteButton.addEventListener("click", () => deleteBookCard(bookCard, obj));
  
  readButton.addEventListener("click", () => {
    toggleClass(readButton, ["not-read"]);
    obj.read = !obj.read;
  });
  
  if (!obj.read) {
    toggleClass(readButton, ["not-read"]);
  }

  const elements = [title, author, pages, bookCardButtons];
  elements.forEach((element) => {
    bookCard.appendChild(element);
  });

  return bookCard;
}

function createBookCardElement(tag, content, classes = []) {
  const element = document.createElement(tag);
  element.textContent = content;
  classes.forEach((className) => element.classList.add(className));
  return element;
}

function deleteBookCard(bookCard, book) {
  let askUser = window.confirm("Remove book?");
  if(askUser){
    bookCard.remove();
    const i = library.indexOf(book);
    if (i !== -1) {
      library.splice(i, 1);
    }
  }
}
