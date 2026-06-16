

let todos = [];

const url = "http://localhost:3000/";
const todoTable = document.querySelector("#todo tbody");
const taskInput = document.querySelector("#taskItem");


// creating Todo items
async function createItems() {
  
    const task = taskInput.value.trim();

    if (!task) {
        return;
    }

    // Adding the text default input, into the the items array

    const payload = {
        id: Math.floor(Math.random()),
        task: task,
        list: "work",
        dueDate: "2026-04-03",
        created: new Date().toLocaleDateString(),
        starred: false
    };

    const request = await fetch(url + "todo", {
      method: "POST",
      body:JSON.stringify(payload),
      headers:{"Content-Type": "application/json"}
    });

    const response = await request.json()
    console.log(response)

    // clearing out the input element and wait for next
    taskInput.value = "";

    // rending the items in the array on the DOM
    loadItems();
}

// Loading Items
async function loadItems() {

    const request = await fetch(url);

    todos = await request.json();

    console.log(todos);

    todoTable.innerHTML = "";

    todos.forEach(function (items, id) {

        const tr = document.createElement("tr");

        tr.innerHTML = `
                    <td>
                    <input type="checkbox">
                    </td>

                    <td>${items.task}</td>

                    <td>
                        <span class="badge work">
                            ● ${items.list}
                        </span>
                    </td>

                    <td class="danger">
                        <i class="fa-regular fa-calendar"></i>
                        ${items.dueDate}
                    </td>

                    <td>${items.created}</td>

                    <td>
                        <i class="fa-regular fa-star"></i>

                    </td>

                    <td>
                        <button class="deleteBtn" onclick="deleteItems(${items.id})">delete</button> 
                         <button class="editBtn" onclick="editItems(${items.id})">edit</button> 
                    </td>
        `;

        todoTable.appendChild(tr);
    });
}

async function deleteItems(id) {
  const request = await fetch(url + "todo/:id", {
      method: "DELETE",
    });

    const response = await request.json()
    console.log(response)
  loadItems();
}


async function editItems(id) {

  const todo = todos.find(item => item.id == id);

  if (!todo) return;
  
    // opens prompt with current task value
  const updateTask = prompt(
        "Do you want to Edit task?", todo.task
    );

    if (updateTask.trim() === "") return;
    
    try {
      const request = await fetch(`${url}todo/${id}`,{
      method: "PATCH",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({
        task: updateTask.trim()
      })
});

  const response = await request.json();
  console.log(response);

     loadItems()
    } catch (error) {
      console.log(error)
    }

 
}

async function searchTask(item, index) {

  const search = document.getElementById("search").value.trim();

  if (!search) return;

  const request = await fetch(url + "todo?task=" + search);

  const response = await request.json();
  console.log(response);

  const tr = document.createElement("tr");

   todoTable.innerHTML = "";

        tr.innerHTML = `
                    <td>
                    <input type="checkbox">
                    </td>

                    <td>${response.task}</td>

                    <td>
                        <span class="badge work">
                            ● ${response.list}
                        </span>
                    </td>

                    <td class="danger">
                        <i class="fa-regular fa-calendar"></i>
                        ${response.dueDate}
                    </td>

                    <td>${response.created}</td>

                    <td>
                        <i class="fa-regular fa-star"></i>

                    </td>

                    <td>
                        <button class="deleteBtn" onclick="deleteItems(${index})">delete</button> 
                         <button class="editBtn" onclick="editItems(${index})">edit</button> 
                    </td>
        `;

        todoTable.appendChild(tr);
};
  

loadItems()
    