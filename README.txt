# Team Task Manager (Full Stack)

A full-stack team task management web application built using the MERN stack with secure JWT authentication and role-based access control.

## 🚀 Live Demo

Frontend: https://team-task-manager-six-liard.vercel.app

Backend API: https://team-task-manager-production-2f1f.up.railway.app/

---

## ✨ Features

* User Authentication (Register/Login)
* JWT Authorization
* Role-Based Access Control (Admin/Member)
* Protected Routes
* Project Management
* Task Creation & Assignment
* Task Status Tracking
* Dashboard Analytics
* Due Date Tracking
* Overdue Task Detection
* Secure API Integration
* Fully Responsive UI
* Live Deployment

---

## 👨‍💻 Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### Deployment

* Vercel (Frontend)
* Railway (Backend)

---

## 🔐 Role Based Access

### Admin

* Create Tasks
* Assign Tasks
* View All Tasks
* Update Task Status

### Member

* View Only Assigned Tasks
* Update Own Task Status

---

## 📂 Project Structure

team-task-manager/
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── components/
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── middleware/

---

## ⚙️ Environment Variables

Create `.env` file inside server:

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

PORT=5000

Create `.env` file inside client:

VITE_API_URL=your_backend_url

---

## 🛠 Installation

### Clone Repository

git clone https://github.com/gauravkori/team-task-manager.git

### Backend Setup

cd server

npm install

npm run dev

### Frontend Setup

cd client

npm install

npm run dev

---

## 📌 Future Improvements

* Admin User Management
* Email Notifications
* File Attachments
* Team Collaboration Chat
* Dark Mode
* Advanced Analytics

---

## 👨‍💻 Author

Gaurav Kori
