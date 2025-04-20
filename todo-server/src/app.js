import express from 'express';
import cors from 'cors';
import todoRouter from './routers/todos.js';

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());
app.use('/api/todos', todoRouter);

function start() {
  app.listen(PORT, (req, res) => {
    console.log('Server is running on http://localhost:3500');
  });
}

export default start;
