import express from "express"; // package
import cors from "cors"; // cross origin resource sharing
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.url}`
  );
  next();
});

// =====================================
// GET ALL TODOS
// =====================================
// app.get("/", async (_req, res) => {
//   try {
//     const todos = await db("todos");

//     return res.json(todos);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Failed to fetch todos",
//     });
//   }
// });

// =====================================
// GET TODOS WITH FILTERS
// =====================================
app.get("/", async (_req, res) => {
  try {
    const query = _req.query;

    let filteredTodos = db("todos");

    // Filter completed
    if (query.completed == 1) {
      filteredTodos = filteredTodos.where({
        isCompleted: true,
      });
    }

    // Filter active
    if (query.active == 1) {
      filteredTodos = filteredTodos.where({
        isActive: true,
      });
    }

    // Filter starred
    if (query.starred == 1) {
      filteredTodos = filteredTodos.where({
        starred: true,
      });
    }

    // Search by task
  

    // Sort by task
    if (query.sort === "asc") {
      filteredTodos = filteredTodos.orderBy(
        "task",
        "asc"
      );
    }

    if (query.sort === "desc") {
      filteredTodos = filteredTodos.orderBy(
        "task",
        "desc"
      );
    }

    const todos = await filteredTodos;

    return res.json(todos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
});

// =====================================
// CREATE TODO
// =====================================
app.post("/todo", async (_req, res) => {
  try {
    const todo = _req.body;

    await db("todos").insert({
      task: todo.task,
      list: todo.list,
      dueDate: todo.dueDate,
      created: todo.created,
      isCompleted: todo.isCompleted ?? false,
      isActive: todo.isActive ?? true,
      starred: todo.starred ?? false,
    });

    return res.status(201).json({
      message: "Todo created",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create todo",
    });
  }
});

// =====================================
// UPDATE TODO
// =====================================
app.patch("/todo/:id", async (_req, res) => {
  try {
    const { id } = _req.params;
    const body = _req.body;

    const updated = await db("todos")
      .where({ id })
      .update({
        ...(body.task !== undefined && {
          task: body.task,
        }),

        ...(body.list !== undefined && {
          list: body.list,
        }),

        ...(body.dueDate !== undefined && {
          dueDate: body.dueDate,
        }),

        ...(body.isCompleted !== undefined && {
          isCompleted: body.isCompleted,
        }),

        ...(body.isActive !== undefined && {
          isActive: body.isActive,
        }),

        ...(body.starred !== undefined && {
          starred: body.starred,
        }),
      });

    if (!updated) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    const todo = await db("todos")
      .where({ id })
      .first();

    return res.json({
      message: "Todo updated",
      todo,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update todo",
    });
  }
});

// =====================================
// DELETE TODO
// =====================================
app.delete("/todo/:id", async (_req, res) => {
  try {
    const { id } = _req.params;

    const deleted = await db("todos")
      .where({ id })
      .del();

    if (!deleted) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.json({
      message: "Todo deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete todo",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:${PORT}`
  );
});