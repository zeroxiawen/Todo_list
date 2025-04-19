import axios from 'axios';

const BASE_URL = 'http://localhost:3500/api/todos';

export async function getAllTodos() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function addNewItem(title) {
  const titleJson = { title };
  const contentType = { headers: { 'Content-Type': 'application/json' } };
  const res = await axios.post(`${BASE_URL}`, titleJson, contentType);
  return res.data;
}

export async function updateCompleteById(id, completed) {
  const completedJson = { completed };
  const contentType = { headers: { 'Content-Type': 'application/json' } };
  await axios.patch(`${BASE_URL}/${id}`, completedJson, contentType);
}

export async function deleteTodoById(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}
