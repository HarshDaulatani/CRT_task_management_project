# 🚀 TaskFlow

> A modern role-based task management system built using React, Spring Boot, JWT, and MySQL.

---

## 📌 Overview

TaskFlow is a full-stack web application designed to simplify task assignment and management inside an organization.

Managers can create, assign, update, and delete tasks, while Employees can securely log in and view tasks assigned to them.

The project uses JWT Authentication for secure login and role-based access control.

---

# ✨ Core Features

## 👨‍💼 Manager Dashboard
- Secure Login Authentication
- Create New Tasks
- Update Existing Tasks
- Delete Tasks
- Assign Tasks to Employees
- View All Tasks
- Priority-Based Task Management

---

## 👨‍💻 Employee Dashboard
- Secure Login
- View Assigned Tasks
- View Task Priority & Status

---

# 🔐 Authentication & Security

- JWT (JSON Web Token) Authentication
- Role-Based Authorization
- Spring Security Integration
- Protected Dashboard Access

---

# 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|----------|----------|
| React | Spring Boot | MySQL |
| Bootstrap | Spring Security | JPA/Hibernate |
| Axios | JWT | |

---

# ⚙️ System Architecture

```text
React Frontend
       ↓
Axios API Calls
       ↓
Spring Boot REST APIs
       ↓
Service Layer
       ↓
Repository Layer
       ↓
MySQL Database
