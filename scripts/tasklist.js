// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load event listeners
loadEventListeners();

function loadEventListeners() {
  // On page load
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
  if (taskInput.value === ''){
    alert('Enter a task title');
  } else {
    let storedTasks;
    if (localStorage.getItem('tasks') === null) {
      storedTasks = [];
    } else {
      storedTasks = JSON.parse(localStorage.getItem('tasks')).sort();
    }

    if (storedTasks.indexOf(taskInput.value) == -1){
      // Generate new list item based on the task form input value
      // Class names are set according to the materializecss framework
      const listItem = document.createElement('li');
      listItem.className = 'collection-item';
      listItem.setAttribute('title', 'New Item');
      listItem.appendChild(document.createTextNode(taskInput.value));

      // Create link element within the list item to facilitate its removal
      const listItemLink = document.createElement('a');
      listItemLink.className = 'delete-item secondary-content';
      listItemLink.setAttribute('href', '#');
      listItemLink.innerHTML = '<i class="fas fa-times"></i>';
      listItem.appendChild(listItemLink);

      // Finally append the list element, complete with its link, to the list
      // so it is rendered by the browser. Also store the task in local storage
      taskList.appendChild(listItem);
      storeTaskLocalStorage(taskInput.value);
      // Refresh the list to mirror local storage contents as all duplicates are removed
      getTasks(e);
    } else {
      alert(`Task "${taskInput.value}" already exists`);
    }
}

  // Tidy up - clear out add task and filter inputs
  taskInput.value = '';
  filter.value = '';

  // Remove previously applied filtering to ensure that the whole
  // task list is visible so the user can see their task has been added
  Array.from(taskList.children).forEach(function (task){
    task.style.display = 'block';
  });
  
  e.preventDefault();
}

// Delete a specific task - i.e. the task whose remove button
function removeTask(e) {
  // Clicking on the delete button causes the removal of that list item
  if (e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
    removeLocalStorage(e.target.parentElement.parentElement.textContent);
    // Refresh the list to mirror local storage contents as all duplicates are removed
    getTasks(e);
  }
  e.preventDefault();
}

// Remove all tasks within the collection ul upon user confirmation. Leave the
// collection ul itself in place to revert the page to its originally rendered state
function clearTasks(e) {
  const tasks = Array.from(taskList.children);
  if (tasks.length > 0){
    if (confirm('Clear all tasks?')) {
      tasks.forEach(function (task){
        task.remove();
      });
    }
  }
  taskInput.value = '';
  filter.value = '';
  localStorage.removeItem('tasks');

  e.preventDefault();
}

// Filter down/up to tasks containing text entered by the user
function filterTasks(e) {
  const tasks = Array.from(taskList.children);

  // Only perform filtering if the task list is populated with 1+ task items
  if (tasks.length > 0) {
    if (e.target.value !== ''){
      // Loop through each task in the list, showing only those tasks with titles containing
      // the text entered by the user in the filter input field
      tasks.forEach(function (task){
        if (task.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      });
    } else {
      tasks.forEach(function (task){
        task.style.display = 'block';
      });
    }
  }
}

// Save the set of tasks as an array in local storage so that content persists on refresh
function storeTaskLocalStorage(newTask){
  let storedTasks;
  if (localStorage.getItem('tasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('tasks'));
  }
  storedTasks.push(newTask);
  storedTasks.sort();
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// When a task item is removed from the DOM, we also need to remove
// that item from the array in local storage. Any duplicates are removed.
function removeLocalStorage(removeTask){
  let storedTasks;
  if (localStorage.getItem('tasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('tasks')).sort();
  }

  storedTasks.forEach(function(task, index){
    if (task === removeTask){
      storedTasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// This is called on page load to populate the task list with items stored in local memory
function getTasks(e) {
  let storedTasks;
  if (localStorage.getItem('tasks') != null) {
    taskList.innerHTML = '';
    storedTasks = JSON.parse(localStorage.getItem('tasks')).sort();
    storedTasks.forEach(function(task){
      // Generate new list item based on the task form input value
      // Class names are set according to the materializecss framework
      const listItem = document.createElement('li');
      listItem.className = 'collection-item';
      listItem.setAttribute('title', 'New Item');
      listItem.appendChild(document.createTextNode(task));

      // Create link element within the list item to facilitate its removal
      const listItemLink = document.createElement('a');
      listItemLink.className = 'delete-item secondary-content';
      listItemLink.setAttribute('href', '#');
      listItemLink.innerHTML = '<i class="fas fa-times"></i>';
      listItem.appendChild(listItemLink);

      // Finally append the list element, complete with its link, to the list
      // so it is rendered by the browser. Also store the task in local storage
      taskList.appendChild(listItem);
    });
  }
}
