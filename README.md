# Smart Operations System

A production-quality MERN stack application designed for managing tasks, improving accountability, and tracking team operations.

## Features
- **Role-Based Access Control (RBAC):** Admin, Manager, and User roles with strictly scoped permissions.
- **Task Management:** Create, assign, update, and filter tasks.
- **Activity Logging (Smart Feature):** Automated accountability tracking capturing key system events (e.g., task creations, status updates).
- **Premium UI:** A dynamic, modern interface built with vanilla CSS featuring a glassmorphism design system.
- **Clean Architecture:** Layered backend architecture (`Routes -> Controllers -> Services -> Models`).

## Tech Stack
- **MongoDB & Mongoose:** Database and ODM.
- **Express & Node.js:** Backend API framework and runtime.
- **React (Vite) & React Router:** Frontend UI library and routing.
- **Axios:** API client.
- **JWT & bcryptjs:** Authentication and password hashing.
- **Lucide React:** Iconography.

## Project Structure
- `backend/`: Express application, RESTful APIs, and MongoDB schema.
- `frontend/`: React Vite application and vanilla CSS design system.

## Setup & Running

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on port 27017, or update `MONGO_URI` in `.env`)

### Backend Setup
1. `cd backend`
2. `npm install`
3. The `.env` file is already created with defaults:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/smart-ops
   JWT_SECRET=supersecretjwtkey_smartops_2026
   ```
4. `npm run dev` (Starts server on port 5000 via nodemon)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Starts Vite dev server)

Open your browser to the URL provided by Vite (typically `http://localhost:5173`).
