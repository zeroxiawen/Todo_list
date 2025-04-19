import mysql from 'mysql2/promise.js';

const db = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'longjiawen',
  database: 'todos',
});

export default db;
