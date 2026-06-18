let todos = [];

const url = "http://localhost:3000/";

const todoTable = document.querySelector("#todo tbody");
const taskInput = document.querySelector("#taskItem");

// =====================================
// RENDER TODOS
// =====================================

function renderTodos(data) {
  todoTable.innerHTML = "";

  data.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <input type="checkbox" ${
          item.isCompleted ? "checked" : ""
        }>
      </td>

      <td>${item.task}</td>

      <td>
        <span class="badge work">
          ● ${item.list}
        </span>
      </td>

      <td class="danger">
        <i class="fa-regular fa-calendar"></i>
        ${item.dueDate}
      </td>

      <td>${item.created}</td>

      <td>
        ${
          item.starred
            ? "⭐"
            : '<i class="fa-regular fa-star"></i>'
        }
      </td>

      <td>
        <button
          class="deleteBtn"
          onclick="deleteItems(${item.id})"
        >
          delete
        </button>

        <button
          class="editBtn"
          onclick="editItems(${item.id})"
        >
          edit
        </button>
      </td>
    `;

    todoTable.appendChild(tr);
  });
}

// =====================================
// LOAD ALL TODOS
// =====================================

async function loadItems() {
  try {
    const request = await fetch(url);

    todos = await request.json();

    renderTodos(todos);
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// CREATE TODO
// =====================================

async function createItems() {
  const task = taskInput.value.trim();

  if (!task) return;

  const payload = {
    task,
    list: "work",
    dueDate: new Date().toLocaleDateString(),
    created: new Date().toLocaleDateString(),
    isCompleted: true,
    isActive: true,
    starred: false,
  };

  try {
    const request = await fetch(url + "todo", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    });

    const response = await request.json();

    console.log(response);

    taskInput.value = "";

    loadItems();
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// DELETE
// =====================================

async function deleteItems(id) {
  try {
    const request = await fetch(
      `${url}todo/${id}`,
      {
        method: "DELETE",
      }
    );

    const response = await request.json();

    console.log(response);

    loadItems();
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// EDIT TASK
// =====================================

async function editItems(id) {
  const todo = todos.find(
    item => item.id == id
  );

  if (!todo) return;

  const updatedTask = prompt(
    "Edit task",
    todo.task
  );

  if (
    !updatedTask ||
    updatedTask.trim() === ""
  ) {
    return;
  }

  try {
    const request = await fetch(
      `${url}todo/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          task: updatedTask.trim(),
        }),
      }
    );

    const response =
      await request.json();

    console.log(response);

    loadItems();
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// SEARCH
// =====================================

async function searchTask() {
  const search =
    document
      .getElementById("search")
      .value
      .trim();

  try {
    const request = await fetch(
      `${url}todo?task=${search}`
    );

    const response =
      await request.json();

    renderTodos(response);
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// COMPLETED TASKS
// =====================================

async function completedTask() {
  try {
    const request = await fetch(
      `${url}todo?completed=1`
    );

    const response =
      await request.json();

    renderTodos(response);
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// ACTIVE TASKS
// =====================================

async function activeTask() {
  try {
    const request = await fetch(
      `${url}todo?active=1`
    );

    const response =
      await request.json();

    renderTodos(response);
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// SORT ASCENDING
// =====================================

async function sortAsc() {
  try {
    const request = await fetch(
      `${url}todo?sort=asc`
    );

    const response =
      await request.json();

    renderTodos(response);
  } catch (error) {
    console.log(error);
  }
}

// =====================================
// SORT DESCENDING
// =====================================

async function sortDesc() {
  try {
    const request = await fetch(
      `${url}todo?sort=desc`
    );

    const response =
      await request.json();

    renderTodos(response);
  } catch (error) {
    console.log(error);
  }
}


loadItems();