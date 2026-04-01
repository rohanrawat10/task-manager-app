# 📋 TaskFlow — Team Task Manager

A full-stack **MERN** task management platform built for teams. Features role-based access, real-time collaboration, priority tracking, and a clean admin panel — all wrapped in a fully mobile-responsive UI.

🔗 **Live Demo:** _Coming Soon_  
📁 **GitHub:** [github.com/rohanrawat10](https://github.com/rohanrawat10)

---

## ✨ Features

### 👤 Authentication & Roles
- Secure login with JWT-based authentication
- Role-based access control — **Admin** and **User** roles
- Protected routes on both frontend and backend

### 🗂️ Task Management (Full CRUD)
- Create tasks with **title, description, due date, and priority** (Low / Medium / High)
- Edit and delete tasks with live UI updates
- Automated status updates based on **checklist completion**

### 👥 Team Collaboration
- Assign tasks to **multiple team members**
- Track each member's completion in real-time
- Team-wide progress visibility

### 📊 Dashboard & Progress Tracking
- Personalized **User Dashboard** with assigned task overview
- Visual progress indicators per task
- Task insights and completion stats

### 🛡️ Admin Panel
- Full control over all users and tasks
- Manage team members across the platform
- Centralized overview of task statuses

### 📎 Extras
- **Task Report Downloads** — export task data for offline analysis
- **Attachments Support** — link Google Drive, Figma, PDFs to tasks
- **Fully Mobile Responsive** — seamless on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Redux, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |
| **State Management** | Redux Toolkit |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/rohanrawat10/task-manager-app
cd task-manager
```

```bash
# Install backend dependencies
cd server
npm install
```

```bash
# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `/server` directory:

### Run the App

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start
```

App will run on `http://localhost:3000`

---

## 📁 Project Structure

```
task-manager/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── redux/          # State management (slices, store)
│   │   └── utils/          # Helper functions
├── backend/                 # Node.js backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── middleware/         # Auth & error middleware
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/tasks` | Get all tasks | Auth |
| POST | `/api/tasks` | Create task | Admin |
| PUT | `/api/tasks/:id` | Update task | Auth |
| DELETE | `/api/tasks/:id` | Delete task | Admin |
| GET | `/api/users` | Get all users | Admin |

---

## 🙋‍♂️ Author

**Rohan Rawat**  
Full-Stack Developer | MERN Stack  
📍 Delhi, India
LinkedIn:https://www.linkedin.com/in/rohan-rawat-a16399257

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
