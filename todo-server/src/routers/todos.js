import express from 'express';
import {
  findAllTodos,
  findTodoById,
  addTodo,
  deleteTodoById,
  updateCompleteById,
} from '../db/repositories/todos.js';

const todoRouter = express.Router();

todoRouter.get('/test', (req, res) => {
  res.send('successful');
});

todoRouter.get('/', (req, res) => {
  findAllTodos().then((todos) => {
    res.json(todos);
  });
});

todoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  findTodoById(id).then((todo) => {
    res.json(todo);
  });
});

todoRouter.post('/', (req, res) => {
  const { title } = req.body;
  addTodo(title).then((todo) => {
    res.json(todo);
  });
});

todoRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteTodoById(id).then((msg) => {
    res.send(msg);
  });
});

todoRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  updateCompleteById(id, completed).then((todo) => {
    res.json(todo);
  });
});
export default todoRouter;
