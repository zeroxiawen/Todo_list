import db from '../index.js';

export async function findAllTodos() {
  const sql = 'SELECT * FROM todos';
  const [res] = await db.execute(sql);
  return res;
}

export async function findTodoById(id) {
  const sql = `SELECT * FROM todos WHERE id = ?`;
  const [res] = await db.execute(sql, [id]);
  return res;
}

export async function addTodo(title) {
  const sql = `INSERT INTO todos(title) VALUES("${title}")`;
  await db.execute(sql);
  const idSql = `SELECT LAST_INSERT_ID() AS id`;
  const [res] = await db.execute(idSql);
  return {
    id: res[0].id,
    title: title,
    isCompleted: false,
  };
}

export async function deleteTodoById(id) {
  const sql = 'DELETE FROM todos WHERE id = ?';
  const [res] = await db.execute(sql, [id]);
  return 'Delete succeed';
}

export async function updateCompleteById(id, Complete) {
  const sql = `UPDATE todos SET completed = ? WHERE id = ?`;
  await db.execute(sql, [Complete, id]);
  const [res] = await findTodoById(id);
  return res;
}
