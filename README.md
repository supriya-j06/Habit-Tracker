# 🚀 Habit Tracker System

> A full-stack web application to track daily habits, maintain consistency, and visualize progress using streak logic.

---

## 📌 Overview

The Habit Tracker System is designed to help users build and maintain positive habits. It allows users to create habits, track daily completion, and monitor progress through streaks and charts.

This project demonstrates full-stack development by integrating frontend, backend, and database technologies.

---

## ✨ Features

* 🔐 User Registration & Login
* ➕ Add Habits
* ❌ Delete Habits
* ✅ Mark Habit as Completed
* 🔥 Streak Tracking System
* 📊 Chart Visualization (Chart.js)
* 🤖 Habit Suggestions
* 🚪 Logout Functionality

---

## 🧠 Working Logic

* User logs in and adds habits
* Click ✓ to mark habit completed
* Streak updates based on date logic:

  * Same day → no increase
  * Next day → streak +1
  * Missed day → reset to 1
* Chart updates dynamically

---

## 🏗️ System Architecture

Frontend (HTML, CSS, JS)
↓
Fetch API
↓
Backend (Node.js + Express)
↓
SQLite Database

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Visualization

* Chart.js

---

## 📁 Project Structure

habit-tracker/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   ├── users.js
│   │   └── habits.js
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── README.md

---

## ⚙️ Setup Instructions

1. Go to backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Run server:

```
npm run dev
```

4. Open frontend:

```
frontend/index.html
```

---

## 🎯 Outcome

This project successfully implements a full-stack habit tracking system that helps users improve productivity and maintain consistency. It demonstrates real-world concepts such as REST APIs, database integration, and client-server communication.

---

## 🔮 Future Enhancements

* Notifications & reminders
* Password encryption
* Mobile app version
* Cloud database
* AI-based suggestions

---
## 🎓 Academic Purpose

Developed as part of MCA curriculum under the subject **Java Programming**, demonstrating practical application of full-stack development concepts..

---

## 👩‍💻 Author

Supriya Jajala
