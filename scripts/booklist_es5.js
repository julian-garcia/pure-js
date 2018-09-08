// Create Book/UI Constructors

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href=#><i class="far fa-times-circle delete"></i></a></td>`;

  list.appendChild(row);
}

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.displayAlert = function(alertMsg, alertClass) {
  const bookTable = document.getElementById('book-table');
  const alertDiv = document.createElement('div');
  const container = document.querySelector('.container');

  alertDiv.appendChild(document.createTextNode(alertMsg));
  alertDiv.className = `alert ${alertClass}`;
  container.insertBefore(alertDiv, bookTable);

  setTimeout(function (){
    document.querySelector(`.${alertClass}`).remove();
  }, 3000);
}

// Submit button event listener - add the book to the list and perform validation if necessary
document.getElementById('book-form').addEventListener('submit',
  function(e){
    const title = document.getElementById('title').value.trim(),
          author = document.getElementById('author').value.trim(),
          isbn = document.getElementById('isbn').value.trim();

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title !== '' && author !== '' && isbn !== '') {
      ui.addBookToList(book);
      ui.displayAlert('Your book has been added to the list', 'success');
      ui.clearFields();
    } else {
      ui.displayAlert(`Title "${title}", author "${author}" and ISBN "${isbn}" must not be left blank. Please fill in all three items.`, 'error');
    }

    e.preventDefault();
  });

document.getElementById('book-list').addEventListener('click',
  function(e){
    const ui = new UI();
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.parentElement.parentElement.remove();
      ui.displayAlert('Book removed', 'success');
    }
    e.preventDefault();
  });
