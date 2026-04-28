# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/api/auth`)

### `POST /signup`
Register a new user.
- **Body:** `{ "name": "...", "email": "...", "password": "...", "role": "admin|manager|user" }`
- **Response:** `201 Created` with User object and JWT token.

### `POST /login`
Authenticate a user.
- **Body:** `{ "email": "...", "password": "..." }`
- **Response:** `200 OK` with User object and JWT token.

---

## Tasks (`/api/tasks`)

### `POST /`
Create a new task.
- **Access:** Private (Admin, Manager)
- **Body:** `{ "title": "...", "description": "...", "priority": "low|medium|high", "assignedTo": "<user_id>", "dueDate": "YYYY-MM-DD" }`
- **Response:** `201 Created`

### `GET /`
Get all tasks.
- **Access:** Private (Admins/Managers see all, Users see only assigned tasks)
- **Response:** `200 OK` with Array of Task objects.

### `PUT /:id`
Update a task's status (or details if Manager/Admin).
- **Access:** Private
- **Body:** `{ "status": "todo|in-progress|done" }`
- **Response:** `200 OK`

### `DELETE /:id`
Delete a task.
- **Access:** Private (Admin, Manager)
- **Response:** `200 OK`

---

## Activity Logs (`/api/logs`)

### `GET /`
Fetch the system activity accountability logs.
- **Access:** Private (Admin only)
- **Response:** `200 OK` with Array of Log objects containing action, user, and metadata.
