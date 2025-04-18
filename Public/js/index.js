// const express = require('')   <= This is common js, mainly used for node.js
// module js <= mainly used for browser
// module js <= This is for browsers

const weekNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const dateTitle = document.getElementById('date')
const list = document.getElementById('list');
const d = new Date()
const day = d.getDay()   // 0 - 6
const week = weekNames[day]
const date = d.getDate()
const month = monthNames[d.getMonth()]  // 0 - 11
const year = d.getFullYear()
const URL = 'http://localhost:3000/items/'
const form = document.getElementById('add-form')


dateTitle.textContent = `${week}, ${date} ${month} ${year}`;

await axios.get(URL).then(res => {
    const data = res.data;
    list.innerHTML = '';
    data.forEach((item) => {
        const todoItem = generateItem(item,list)
        completeTask(todoItem)
    })
})


form.addEventListener('submit', e => {
    e.preventDefault();
    const inputTodoEl = document.getElementById('item')
    const itemText = inputTodoEl.value
    if (!itemText) {
        alert('Please input some todo');
    }
    const obj = {
        id: generateUUID(),
        title: itemText,
        isComplete: false
    }
    axios.post(URL, obj).then(res => {
        const todoItem = generateItem(obj, list)
        inputTodoEl.value = ''
        completeTask(todoItem)
    })
})

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// render list
function generateItem(itemData, list){
    const todoItem = document.createElement('li')
    todoItem.className = 'item'
    todoItem.textContent = itemData.title
    todoItem.setAttribute('id',itemData.id)
    list.appendChild(todoItem)
    if (itemData.isComplete) {
        todoItem.classList.add('complete')
    }
    return todoItem
}

// add toggle
function completeTask(todoItem){
    todoItem.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        const isComplete = e.currentTarget.classList.contains('complete')
        axios.patch(`${URL}${todoItem.id}`, {isComplete: !isComplete}).then(() => {
            const toggle = document.getElementById(todoItem.id)
            toggle.classList.toggle('complete')
        }).catch((err) => {
            console.log(err)
        })
    })
}
