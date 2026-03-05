# Autoflex - Full-Stack Inventory and Production Management System

Autoflex is a comprehensive full-stack application designed to manage a manufacturing company's inventory of raw materials and its product production capabilities. It features a robust backend API and a responsive frontend user interface.

This project was developed to fulfill all functional and non-functional requirements of the proposed challenge, demonstrating a complete and modern development cycle.

---

## 🚀 Tech Stack

| Area | Technology |
| :--- | :--- |
| **Backend** | Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL, Maven |
| **Frontend** | React 18, TypeScript, React Router, Axios, Styled Components |
| **Common** | Git, REST API, Monorepo Architecture |

---

## 🏛️ Project Structure

This project is structured as a monorepo, with the backend and frontend codebases cleanly separated into their own directories.

```
/
├── backend/      # Spring Boot REST API (see backend/README.md for details)
└── frontend/     # React + TypeScript UI (see frontend/README.md for details)
```

---

## ⚙️ Getting Started

To run the full application, you need to run both the backend and frontend servers simultaneously.

### 1. Backend Setup

First, set up and run the backend server. This will handle the business logic and database connection.

> **For detailed instructions, please refer to the [backend/README.md](./backend/README.md) file.**

### 2. Frontend Setup

Once the backend is running, set up and run the frontend client.

> **For detailed instructions, please refer to the [frontend/README.md](./frontend/README.md) file.**

### 3. Accessing the Application

After starting both servers, the application will be available at `http://localhost:3000`.

---

## ✨ Core Features

- **Full CRUD Operations** for both Products and Raw Materials.
- **Dynamic Product Composition**: Easily associate raw materials with products.
- **Intelligent Production Suggestion**: An endpoint that calculates which products can be manufactured based on current inventory, prioritized by the highest value.
- **Robust API**: Includes custom exception handling (404, 409, 400) and DTO validation.
- **Responsive Frontend**: A user-friendly interface that works on both desktop and mobile devices.
- **Clean Architecture**: Both backend and frontend follow a layered and scalable structure.


Autor: [mauricioRodriguesDev](https://github.com/mauricioRodriguesDev)