class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // Add a book tr/td elements to the book table element within the DOM
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href=#><i class="far fa-times-circle delete"></i></a></td>`;

    list.appendChild(row);
  }

  // Render timed error messages and success messages within the DOM
  // in between the book list and the main form
  displayAlert(alertMsg, alertClass) {
    const bookTable = document.getElementById('book-table-wrapper');
    const alertDiv = document.createElement('div');
    const container = document.querySelector('.container');

    alertDiv.appendChild(document.createTextNode(alertMsg));
    alertDiv.className = `alert ${alertClass}`;
    container.insertBefore(alertDiv, bookTable);

    setTimeout(function (){
      document.querySelector(`.${alertClass}`).remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  // Identify the table row to be removed and remove it from the DOM.
  // Also identify the node list of TD elements within the row that is to be deleted
  // so the book can be identified within and removed from local storage.
  deleteBook(target) {
    if (target.classList.contains('delete')) {
      const rowElement = target.parentElement.parentElement.parentElement;
      const bookToDelete = rowElement.querySelectorAll('td');
      rowElement.remove();
      Store.removeBook(bookToDelete);
      this.displayAlert('Book removed', 'success');
    }
  }
}

// Maintain the list of books within local storage as well as the DOM so that
// the list persists after page refresh or after the browser is closed/re-opened
class Store {
  // Retrieve the list of books from local storage - this is referenced
  // by various other functions
  static getBooks() {
    let storedBooks;
    if (localStorage.getItem('storedBooks') === null) {
      storedBooks = [];
    } else {
      storedBooks = JSON.parse(localStorage.getItem('storedBooks'));
    }
    return this.sortStoredBooks(storedBooks);
  }

  // Maintain the book list in ascending title order
  static sortStoredBooks(books) {
    return books.sort(
      function(obj1, obj2) {
        if (obj1.title < obj2.title)
            return -1
        if (obj1.title > obj2.title)
            return 1
        return 0
      });
  }

  // Refresh the DOM book list by displaying every book within local storage.
  // Used upon page load and when new books are added so that book order is maintained.
  static displayBooks() {
    document.getElementById('book-list').innerHTML = '';

    Store.getBooks().forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(newBook) {
    let storedBooks = this.getBooks();
    storedBooks.push(newBook);
    storedBooks = this.sortStoredBooks(storedBooks);
    localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
  }

  static removeBook(delBook) {
    let storedBooks = this.getBooks();

    // Convert the book parameter identified for removal which is a node list of TDs
    // in to a book object
    const remBook  = {title: delBook[0].textContent,
                      author: delBook[1].textContent,
                      isbn: delBook[2].textContent};

    storedBooks.forEach(function(book, index) {
      if (book.title === remBook.title &&
          book.author === remBook.author &&
          book.isbn === remBook.isbn) {
        storedBooks.splice(index,1);
      }
    });

    localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
  }
}

// Refresh the list of books on page load by rendering local storage content
// to the book list in the DOM
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Submit button event listener - add the book to the list and perform validation if necessary
document.getElementById('book-form').addEventListener('submit',
  function(e){
    const title = document.getElementById('title').value.trim(),
          author = document.getElementById('author').value.trim(),
          isbn = document.getElementById('isbn').value.trim();

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title !== '' && author !== '' && isbn !== '') {
      Store.addBook(book);
      Store.displayBooks();
      ui.displayAlert('Your book has been added to the list', 'success');
      ui.clearFields();
    } else {
      ui.displayAlert(`Title "${title}", author "${author}" and ISBN "${isbn}" must not be left blank. Please fill in all three items.`, 'error');
    }

    e.preventDefault();
  });

// Click event listener within the book list element. This is used for book deletion
// so that we can traverse up and down the DOM to remove the parent row.
document.getElementById('book-list').addEventListener('click',
  function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    e.preventDefault();
  });
