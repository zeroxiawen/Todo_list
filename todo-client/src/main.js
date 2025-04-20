import './style.css';
import { LoadingAnimation } from './loading/loading';
import {
  getAllTodos,
  updateCompleteById,
  addNewItem,
  deleteTodoById,
} from './networkReq/fetch';

// document.querySelector('#panel').innerHTML = "";
const weekNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const dateTitle = document.getElementById('date');
const list = document.getElementById('list');
const d = new Date();
const day = d.getDay(); // 0 - 6
const week = weekNames[day];
const date = d.getDate();
const month = monthNames[d.getMonth()]; // 0 - 11
const year = d.getFullYear();
const form = document.getElementById('add-form');

dateTitle.textContent = `${week}, ${date} ${month} ${year}`;

getAllTodos()
  .then((todos) => {
    list.innerHTML = '';
    todos.forEach((todo) => {
      renderItem(todo, list);
    });
  })
  .catch((err) => {
    console.error(err);
  });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputEl = document.getElementById('item');
  const titleText = inputEl.value;
  if (!titleText) {
    alert('Please enter valid text.');
    return;
  }

  addNewItem(titleText)
    .then((todo) => {
      renderItem(todo, list);
      inputEl.value = '';
    })
    .catch((err) => {
      console.error(err);
    });
});

// Initialize todoElement
function renderItem(todo, list) {
  const todoContainerEl = document.createElement('div');
  todoContainerEl.className = 'item-container';
  list.appendChild(todoContainerEl);
  const todoEl = document.createElement('li');
  todoEl.className = 'item';
  todoEl.textContent = todo.title;
  todoEl.setAttribute('id', todo.id);
  todoContainerEl.appendChild(todoEl);
  if (todo.completed) {
    todoEl.classList.add('complete');
  }
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete';
  deleteBtn.textContent = 'X';
  todoContainerEl.appendChild(deleteBtn);
  deleteItem(deleteBtn);
}

// add event listener for toggling completion
list.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const id = e.target.id;
  const isComplete = e.target.classList.contains('complete');
  updateCompleteById(id, !isComplete)
    .then(() => {
      e.target.classList.toggle('complete');
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete todo
function deleteItem(element) {
  element.addEventListener('click', (e) => {
    const todoId = e.currentTarget.previousElementSibling.id;
    deleteTodoById(todoId)
      .then((res) => {
        console.log(res);
        element.parentElement.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
