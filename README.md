# 📋 Task Management System

A full-stack web application built with the MERN stack that enables users to create, manage, and organize tasks with priority levels, role-based access control, and real-time updates.

---

## 📖 Introduction

The Task Management System is a comprehensive solution for organizing and tracking tasks in a team environment. It features secure authentication, role-based permissions, and an intuitive interface with color-coded priority management. Users can create, edit, delete, and assign tasks while admins have additional capabilities for managing team members.

### ✨ Key Features

- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- 👥 **Role-Based Access Control** - Admin and User roles with different permissions
- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete tasks
- 📊 **Priority Management** - Organize tasks by Low, Medium, and High priority
- 🎨 **Color-Coded Visual System** - Quick identification with green/yellow/red priority lists
- 📄 **Pagination** - Efficient task listing with Ajax-based pagination
- 🔄 **Real-Time Updates** - Dynamic status and priority changes without page refresh
- 👤 **User Management** - Admin can add/remove users and assign tasks
- ⚠️ **Confirmation Dialogs** - Prevent accidental deletions with user confirmations
- 📱 **Responsive Design** - Works seamlessly across devices

---

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and encryption
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Frontend

- **React** - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **Context API** - Global state management

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/devopriyanshu/MERN-task-manager.git
cd task-manager
```

#### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important:** Replace `MONGO_URI` with your MongoDB connection string and change `JWT_SECRET` to a strong, random string.

#### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

#### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS (using Homebrew)
brew services start mongodb-community

# On Windows
# MongoDB runs as a service automatically after installation

# On Linux
sudo systemctl start mongod
```

---

## 🎯 Running the Application

### Start Backend Server

In the `backend` directory:

```bash
node server.js
```

The backend server will start on `http://localhost:5000`

You should see:

```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Start Frontend Development Server

In the `frontend` directory (open a new terminal):

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 👤 User Roles & Access

### Admin User

- Create, read, update, and delete all tasks
- Assign tasks to any user
- View and manage all users
- Access user management page

### Regular User

- Create tasks (auto-assigned to self)
- View tasks assigned to them
- Update their assigned tasks
- Delete tasks they created
- Update task status and priority

---

## 🔑 API Endpoints

### Authentication

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (protected)
```

### Tasks

```
GET    /api/tasks            - Get all tasks (paginated, protected)
POST   /api/tasks            - Create new task (protected)
GET    /api/tasks/:id        - Get single task (protected)
PUT    /api/tasks/:id        - Update task (protected)
DELETE /api/tasks/:id        - Delete task (protected)
PATCH  /api/tasks/:id/status - Update task status (protected)
PATCH  /api/tasks/:id/priority - Update task priority (protected)
```

### Users (Admin Only)

```
GET    /api/users            - Get all users (admin only)
DELETE /api/users/:id        - Delete user (admin only)
```

---

## 📝 Usage Guide

### 1. Register an Account

- Navigate to the registration page
- Fill in your name, email, password
- Select role (Admin or User)
- Click "Register"

### 2. Login

- Enter your email and password
- Click "Login"
- You'll be redirected to the dashboard

### 3. Create a Task

- Click "Create New Task" button
- Fill in task details:
  - Title (required)
  - Description (required)
  - Due Date (required)
  - Priority (Low/Medium/High)
  - Assign To (admin only)
- Click "Create Task"

### 4. Manage Tasks

- **View Details**: Click "View Details" on any task card
- **Edit Task**: Click "Edit Task" on the details page
- **Delete Task**: Click "Delete" and confirm
- **Change Status**: Use the status dropdown (Pending/Completed)
- **Change Priority**: Use the priority dropdown to move between lists

### 5. View Modes

- **All Tasks**: Grid view with pagination
- **Priority View**: Three columns (Low/Medium/High) color-coded

### 6. User Management (Admin Only)

- Click "Manage Users" in the navbar
- View all registered users
- Remove users as needed

---

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication with 7-day expiry
- **Protected Routes**: Middleware verifies tokens on all protected endpoints
- **Role-Based Access**: Permissions checked on every operation
- **Input Validation**: Frontend and backend validation for data integrity
- **XSS Protection**: React's built-in XSS protection
- **CORS Configuration**: Controlled cross-origin access

---

## 🧪 Testing the Application

### Test Credentials

**Admin Account:**

- Register a new user and select "Admin" role during registration

**Regular User Account:**

- Register a new user and select "User" role during registration

### Test Scenarios

1. **Authentication Flow**

   - Register → Login → Access Dashboard → Logout

2. **Task CRUD Operations**

   - Create task → View task → Edit task → Delete task

3. **Priority Management**

   - Create tasks with different priorities → Switch to Priority View → Move tasks between priorities

4. **Pagination**

   - Create 10+ tasks → Navigate through pages

5. **Role-Based Access**
   - Login as admin → Access User Management
   - Login as regular user → Verify restricted access

---

### Database (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in backend `.env`

**Made with ❤️ using MERN Stack**
