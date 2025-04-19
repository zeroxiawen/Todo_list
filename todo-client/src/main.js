import './style.css';
import {
  getAllTodos,
  updateCompleteById,
  addNewItem,
} from './networkReq/index';

// document.querySelector('#panel').innerHTML = ;
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

getAllTodos().then((todos) => {
  list.innerHTML = '';
  todos.forEach((todo) => {
    generateItem(todo, list);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputEl = document.getElementById('item');
  const titleText = inputEl.value;
  addNewItem(titleText)
    .then((todo) => {
      generateItem(todo, list);
      inputEl.value = '';
    })
    .catch((err) => {
      console.log(err);
    });
});

// Initialize todoElement
function generateItem(todo, list) {
  const todoEl = document.createElement('li');
  todoEl.className = 'item';
  todoEl.textContent = todo.title;
  todoEl.setAttribute('id', todo.id);
  list.appendChild(todoEl);
  if (todo.completed) {
    todoEl.classList.add('complete');
  }
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
