# Task Manager - Full Stack Application

A modern, full-stack task management application built with .NET Core and React.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Future Enhancements](#future-enhancements)

## ✨ Features

- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, due date, priority (Low/Medium/High), status (To Do/In Progress/Done), and category
- **Filtering**: Filter tasks by status
- **Status Toggle**: Quick checkbox to mark tasks as complete
- **Soft Delete**: Tasks are marked as deleted rather than permanently removed
- **Real-time Stats**: Dashboard showing task counts by status
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Client and server-side validation
- **Error Handling**: User-friendly error messages
- **Optimistic Updates**: Instant UI feedback

## 🛠 Tech Stack

### Backend
- **.NET 8.0** - Web API framework
- **SQLite** - Database
- **C#** - Programming language

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

### Required
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download)

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check .NET version
dotnet --version
```

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/jennyEckstein/todo-task-management.git
cd todo-task-management
```

### 2. Backend Setup

```bash
# Navigate to the API folder
cd TaskManager.Api

# Restore NuGet packages
dotnet restore

# Build the project
dotnet build
```

The database will be automatically created when you first run the application.

### 3. Frontend Setup

```bash
# Navigate to the client folder
cd task-manager-client

# Install dependencies
npm install
```

## ▶️ Running the Application

You need to run **both** the backend and frontend simultaneously.

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd TaskManager.Api
dotnet run
```

You should see:
```
Now listening on: https://localhost:xxxx
Now listening on: http://localhost:xxxx
```

**Terminal 2 - Frontend:**
```bash
cd task-manager-client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:xxxx/
```

### Option 2: Using VS Code / Rider

**Backend:**
1. Open `TaskManager.Api` folder in your IDE
2. Press F5 or click Run

**Frontend:**
1. Open terminal in VS Code
2. Navigate to `task-manager-client`
3. Run `npm run dev`

### 📱 Access the Application

1. **Frontend**: Open browser to [http://localhost:5173](http://localhost:5173)
2. **Backend API**: [http://localhost:5241/api/tasks](http://localhost:5241/api/tasks)
3. **Swagger UI**: [https://localhost:7241/swagger](https://localhost:7241/swagger)

## 📚 API Documentation

### Base URL
```
http://localhost:xxxx/api
```

### Endpoints

#### Get All Tasks
```http
GET /api/tasks
```

**Query Parameters:**
- `status` (optional): Filter by status (Todo, InProgress, Done)
- `priority` (optional): Filter by priority (Low, Medium, High)
- `category` (optional): Filter by category
- `sortBy` (optional): Sort by (dueDate, priority, createdAt, title)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Design database schema",
    "description": "Create ERD for the task management system",
    "dueDate": "2024-12-08T00:00:00Z",
    "priority": "High",
    "status": "InProgress",
    "category": "Backend",
    "createdAt": "2024-12-01T10:00:00Z",
    "updatedAt": "2024-12-05T14:30:00Z"
  }
]
```

#### Get Task by ID
```http
GET /api/tasks/{id}
```

**Response:** `200 OK` or `404 Not Found`

#### Create Task
```http
POST /api/tasks
```

**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description",
  "dueDate": "2024-12-10T00:00:00Z",
  "priority": "Medium",
  "status": "Todo",
  "category": "Frontend"
}
```

**Response:** `201 Created`

#### Update Task
```http
PUT /api/tasks/{id}
```

**Request Body:** Same as Create Task

**Response:** `200 OK` or `404 Not Found`

#### Update Task Status
```http
PATCH /api/tasks/{id}/status
```

**Request Body:**
```json
{
  "status": "Done"
}
```

**Response:** `200 OK` or `404 Not Found`

#### Delete Task
```http
DELETE /api/tasks/{id}
```

**Response:** `204 No Content` or `404 Not Found`

**Note:** This is a soft delete - tasks are marked as deleted but not removed from the database.

## 🏗 Architecture

### Backend Architecture

**Clean Architecture Principles:**
- **Controllers**: Handle HTTP requests/responses
- **DTOs**: Data transfer objects for API contracts
- **Models**: Domain entities
- **Data**: Database context and configuration

**Key Design Decisions:**
- **Soft Delete**: Uses `IsDeleted` flag instead of hard deletes
- **DTOs**: Separate input/output models from entities
- **Validation**: Server-side validation with data annotations
- **Error Handling**: Global error handling with try/catch

### Frontend Architecture

**Component-Based Architecture:**
- **Container Components**: Manage state and logic (App.jsx)
- **Presentation Components**: Pure UI components
- **Service Layer**: Abstracted API calls
- **Custom Hooks**: useCallback for performance

**Key Design Decisions:**
- **Optimistic Updates**: Instant UI feedback on status changes
- **Component Separation**: Single responsibility principle
- **Error Boundaries**: Graceful error handling


## 🧪 Testing

### Test the API

**Using Swagger:**
1. Navigate to https://localhost:xxxx/swagger
2. Try out the endpoints interactively

**Using curl:**
```bash
# Get all tasks
curl http://localhost:xxxx/api/tasks

# Create a task
curl -X POST http://localhost:xxxx/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "priority": "High",
    "status": "Todo"
  }'
```

### Test the Frontend

1. Create a new task
2. Edit an existing task
3. Toggle task status using checkbox
4. Delete a task
5. Filter by status
6. Verify all operations work correctly

## 🚀 Future Enhancements

### Planned Features
- **Authentication**: User accounts with JWT tokens
- **Multi-user**: Task ownership and sharing
- **Subtasks**: Hierarchical task relationships
- **File Attachments**: Upload files to tasks
- **Reminders**: Email/push notifications
- **Search**: Full-text search functionality
- **Tags**: Multiple tags per task
- **Activity Log**: Audit trail of changes
- **Export**: Export tasks to CSV/PDF
- **Dark Mode**: Theme toggle
- **Drag & Drop**: Reorder tasks
- **Recurring Tasks**: Automated task creation
- **Time Tracking**: Log time spent on tasks
- **Comments**: Task discussions
- **Analytics**: Productivity metrics and charts

### Technical Improvements
- Unit tests (xUnit for backend, Jest for frontend)
- Integration tests
- CI/CD pipeline
- Docker containerization
- PostgreSQL/SQL Server for production
- TypeScript migration

## 📄 License

MIT License

## 👤 Author

Jenny Eckstein