import express from 'express';
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.url}`);
  next();
});

  const todos = [
    {
        id: 1,
        task: "run",
        list: "personal",
        dueDate: "2026",
        created: "2026",
        starred: false
    },
    {
        id: 2,
        task: "go to class",
        list: "work",
        dueDate: "2026",
        created: "2026",
        starred: false
    },
    {
        id: 3,
        task: "read a book",
        list: "study",
        dueDate: "2026",
        created: "2026",
        starred: false
    }
  ]

app.get('/', (_req, res) => {
  res.json(todos);
});

app.get('/todo', (_req, res) => {
  const todo = todos.find(item => item.task === _req.query.task)
  res.json(todo)

});

app.post('/todo', (_req, res) => {
  const todo = _req.body 
  console.log(todo);
  todos.push(todo);
  return res.json({"message": "created"})
});

app.patch('/todo/:id', (_req, res) => {
  const id = _req.params.id
  const todo = todos.find(item => item.id == id)
  todo.task = _req.body.task
  return res.json({"message": "updated"}) 
});

app.delete('/todo/:id', (_req, res) => {
  const id = _req.params.id
  const todo = todos.splice(res, 1);
 console.log(todo);
  return res.json({"message": "deleted"}) 
});


app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});