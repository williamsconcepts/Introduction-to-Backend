# Todo App - Introduction to Backend Development

## Overview

This project is a simple Todo Application built to demonstrate the fundamentals of backend development and how a frontend application communicates with a server through APIs.

The application allows users to:

* Create new tasks
* View all tasks
* Search for tasks
* Edit existing tasks
* Delete tasks

The project introduces key backend concepts such as routing, handling HTTP requests, working with JSON data, and connecting a frontend application to a backend service.

---

## Learning Objectives

By building this project, I learned how to:

* Create a backend server using Express.js
* Define API endpoints
* Handle GET, POST, PATCH, and DELETE requests
* Send and receive JSON data
* Connect a frontend application to a backend API using Fetch API
* Perform CRUD operations (Create, Read, Update, Delete)
* Update the DOM with data received from a backend service

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Fetch API
* Font Awesome

### Backend

* Node.js
* Express.js

---

## Features

### Create Task

Users can add a new task through the input field. The task is sent to the backend and stored in the application's data source.

### View Tasks

When the application loads, all tasks are fetched from the backend and rendered dynamically into the table.

### Search Tasks

Users can search for specific tasks using the search functionality.

### Edit Task

Users can update an existing task. The frontend sends a PATCH request to the backend and refreshes the displayed data.

### Delete Task

Users can remove tasks from the list using the delete action.

---

## API Endpoints

### Get All Todos

GET /todo

Returns all todo items.

---

### Create Todo

POST /todo

Creates a new todo item.

Example Request:

```json
{
  "task": "Learn Express.js"
}
```

---

### Update Todo

PATCH /todo/:id

Updates an existing todo item.

Example Request:

```json
{
  "task": "Learn Express.js Routing"
}
```

---

### Delete Todo

DELETE /todo/:id

Deletes a todo item by ID.

---

## Project Structure

```text
project/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── index.js
│   └── routes/
│
├── package.json
└── README.md
```

---

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start the Backend Server

```bash
npm run dev
```


### Open the Frontend

Open the `index.html` file in your browser or serve it using a local development server.

---

## Example Workflow

1. User enters a task.
2. Frontend sends a request to the backend.
3. Backend processes the request.
4. Backend returns a response.
5. Frontend updates the DOM with the latest data.

```text
User
  │
  ▼
Frontend (HTML/CSS/JS)
  │
  ▼
Fetch API Request
  │
  ▼
Express Backend
  │
  ▼
JSON Response
  │
  ▼
DOM Update
```

---

## Key Concepts Practiced

* REST APIs
* CRUD Operations
* Express Routing
* Request Parameters
* Request Body
* JSON Responses
* Async/Await
* Fetch API
* DOM Manipulation
* Event Handling

---

## Future Improvements

* Local Database Integration (Knex/EchoAPI)
* User Authentication
* Task Categories
* Task Completion Tracking
* Due Date Management
* Pagination
* Error Handling and Validation
* Persistent Data Storage

---

## Author

Built as part of my backend development learning journey to understand how frontend applications interact with backend services using RESTful APIs and JavaScript.
