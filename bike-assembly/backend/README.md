# Bike Point Backend

This project provides the backend for a bike assembly management system. It enables administrators and employees to manage and monitor the assembly process efficiently. The backend is built using **Node.js**, **Express**, and **MongoDB**, leveraging **JWT** for authentication and **Mongoose** as the ODM.

---

## Table of Contents

1. [Features](#features)
2. [Installation and Setup](#installation-and-setup)
   - [Prerequisites](#prerequisites)
   - [Steps to Set Up](#steps-to-set-up)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
   - [Bike Management](#bike-management)
5. [Authentication Middleware](#authentication-middleware)
6. [Database Models](#database-models)
   - [Employee Model](#employee-model)
   - [Bike Model](#bike-model)
7. [Seeding](#seeding)
8. [Sample Admin and Employee Logins](#sample-admin-and-employee-logins)


---

## Features

1. **Authentication:**
   - Login functionality with role-based access control (`admin` and `employee`).
   - Secure password hashing using **bcrypt.js**.
   - JWT-based authentication and authorization.

2. **Bike Management:**
   - Assign bikes to employees for assembly.
   - Mark bikes as completed after assembly.
   - Fetch unassembled bikes.
   - Retrieve stats on assembly, including:
     - Daily bike production statistics.
     - Production stats of employees for specific days.

3. **Admin Dashboard:**
   - View production data between specific dates.
   - Fetch detailed statistics of bike assemblies for reporting.

4. **Seeding:**
   - Pre-populated employees and bikes for testing and development purposes.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14 or above)
- MongoDB (locally or in the cloud)

### Steps to Set Up

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd bike-assembly-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root of the project with the following contents:
   ```env
   PORT=5000
   DB_URI=mongodb://localhost:27017/bike-assembly
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Run the database seeder:**
   To seed the database with test data (employees and bikes):
   ```bash
   node seed/seed.js
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

6. **Access the API:**
   The server will run on `http://localhost:5000`.

---

## Project Structure

```
bike-assembly-backend/
├── config/
│   └── dbConfig.js          # Database connection configuration
├── controllers/
│   ├── authController.js    # Handles authentication and token generation
│   ├── bikeController.js    # Manages bike-related operations
├── middlewares/
│   └── auth.js              # JWT-based authentication middleware
├── models/
│   ├── Bike.js              # Bike schema
│   └── Employee.js          # Employee schema
├── routes/
│   ├── authRoutes.js        # Routes for authentication endpoints
│   └── bikeRoutes.js        # Routes for bike management endpoints
├── seed/
│   └── seed.js              # Script for seeding the database
├── .env                     # Environment configuration file
├── app.js                   # Main entry point of the application
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## API Endpoints

### **Authentication**

| Method | Endpoint       | Description             | Payload Example                    |
|--------|----------------|-------------------------|-------------------------------------|
| POST   | `/auth/login`  | User login and token generation | `{ "email": "admin@bikeassembly.com", "password": "admin123" }` |

---

### **Bike Management**

| Method | Endpoint                    | Description                                   | Payload Example / Query Params                |
|--------|-----------------------------|-----------------------------------------------|-----------------------------------------------|
| GET    | `/bikes/unassembled`        | Fetch all unassembled bikes.                 | Requires Bearer Token.                        |
| POST   | `/bikes/assign`             | Assign a bike to the logged-in user.         | `{ "bikeId": "bike_id_here" }`                |
| POST   | `/bikes/complete`           | Mark a bike as complete.                     | `{ "bikeId": "bike_id_here", "assemblyTime": "1 hour" }` |
| GET    | `/bikes/assembly-stats`     | Fetch bike assembly stats for a date range.  | `?fromDate=2024-12-01&toDate=2024-12-02`      |
| GET    | `/bikes/employee-production`| Fetch employee production stats for a day.   | `?date=2024-12-01`                            |
| GET    | `/bikes/under-assembly`     | Fetch the bike under assembly by the user.   | Requires Bearer Token.                        |

---

## Authentication Middleware

The `auth.js` middleware validates the JWT token and attaches the authenticated user's information (`req.user`) for protected routes.

---

## Database Models

### **Employee Model**

| Field      | Type   | Description                              |
|------------|--------|------------------------------------------|
| `name`     | String | Name of the employee.                   |
| `role`     | String | Role of the user (`admin` or `employee`).|
| `email`    | String | Unique email of the employee.           |
| `password` | String | Hashed password for secure login.       |

### **Bike Model**

| Field          | Type                | Description                              |
|----------------|---------------------|------------------------------------------|
| `bikeType`     | String              | Type of bike.                            |
| `assemblyTime` | String              | Time taken to assemble the bike.         |
| `assembledBy`  | ObjectId (Employee) | Reference to the employee who assembled the bike. |
| `entryDate`    | Date                | Date when the bike entered the system.   |
| `assemblyDate` | Date                | Date when the bike was assembled.        |
| `underAssembly`| Boolean             | Status indicating if the bike is under assembly. |

---

## Seeding

Run the `seed.js` file to populate the database with:
- **6 employees** (1 admin and 5 regular employees).
- **12 assembled bikes** with historical data.
- **6 unassembled bikes** ready for assignment.

---

## Sample Admin and Employee Logins

| Role      | Email                     | Password    |
|-----------|---------------------------|-------------|
| Admin     | `admin@bikeassembly.com`  | `admin123`  |
| Employee  | `emp1@bikeassembly.com`   | `password123` |

---
