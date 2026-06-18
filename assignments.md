Todo Application - Backend Enhancement Task
Overview
In this assignment, you will extend the functionality of the Todo application by adding task status management, filtering capabilities, and a starring system. These features are commonly found in real-world task management applications and will help you practice working with data models, API endpoints, and backend business logic.
Part 1: Add Task Status Properties
1. Add a completed Property
Update the Todo object by adding a completed property.
Requirements:
The property must be a boolean (true or false).
A value of true indicates that the task has been completed.
A value of false indicates that the task is still incomplete.
New tasks should default to false.
Example:
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false
}
2. Add an active Property
Update the Todo object by adding an active property.
Requirements:
The property must be a boolean (true or false).
A value of true indicates that the task is currently active.
A value of false indicates that the task is inactive or archived.
New tasks should default to true.
Example:
{
  "id": 1,
  "title": "Buy groceries",
  "active": true
}


Part 2: Implement Task Filtering
Your application currently displays all tasks. You will now add filtering functionality to the backend API.
Requirements
Implement API support for the following filters:
All Tasks
Returns every task stored in the system.
Active Tasks
Returns only tasks where:
active === true
Completed Tasks
Returns only tasks where:
completed === true
Expected Outcome
When a user selects a filter on the frontend, the frontend should send a request to the backend and receive only the tasks that match the selected filter.
Part 3: Implement the Starred Feature
Users should be able to mark important tasks as starred.
1. Add a starred Property
Update the Todo object by adding a new boolean property called starred.
Requirements:
true indicates that the task has been starred.
false indicates that the task is not starred.
New tasks should default to false.
Example:
{
  "id": 1,
  "title": "Prepare project presentation",
  "starred": true
}
2. Create Backend Logic
Implement backend functionality that allows users to:
Star a task.
Remove a star from a task.
Save the updated starred status.
Retrieve the starred status when tasks are requested.
3. Return Starred Status to the Frontend
Ensure that all API responses include the starred property so the frontend can display the correct star icon state for each task.
Submission Checklist
Before submitting, verify that:
 Every Todo item contains a completed boolean field.
 Every Todo item contains an active boolean field.
 Every Todo item contains a starred boolean field.
 The backend supports filtering by All, Active, and Completed tasks.
 The API returns filtered results correctly.
 Users can star and unstar tasks.
 The starred status is persisted and returned in API responses.
 The frontend displays the correct task list and star state based on the API response.