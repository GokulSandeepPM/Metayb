# Bike Point Frontend

This is the frontend codebase for the **Bike Point Application**, a platform that allows administrators to monitor bike assembly stats and employee performance, while employees manage bike assembly tasks. It is built using **React.js**, with **Chart.js** for visualizations, **React Router** for navigation, and **Axios** for API interactions.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Technical Details](#technical-details)
  - [Components](#components)
  - [Pages](#pages)
  - [Services](#services)
  - [Error Handling](#error-handling)
- [Styling](#styling)
- [Dependencies](#dependencies)

---

## Features

### For Administrators:
- View bike assembly statistics over a date range.
- Monitor employee performance and bikes assembled by each worker.
- Toggle between various chart types (Line, Bar, Pie).

### For Employees:
- View available bikes for assembly.
- Start and complete bike assembly tasks with time tracking.
- Notifications for actions using `react-toastify`.

### General:
- Protected routes based on user roles.
- Error handling via an `ErrorBoundary` component.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GokulSandeepPM/Metayb/tree/main/bike-assembly
   cd bike-assembly/frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

---

## Environment Variables

| Variable           | Description                 | Default Value         |
|--------------------|-----------------------------|-----------------------|
| `REACT_APP_API_URL` | API base URL for backend services | `http://localhost:5000` |

---

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── ProtectedRoute.js
│   └── ErrorBoundary.js
├── pages/
│   ├── AdminDashboard.js
│   ├── EmployeePanel.js
│   └── LoginPage.js
├── services/
│   └── api.js
├── styles/
│   ├── global.scss
│   ├── AdminDashboard.scss
│   ├── EmployeePanel.scss
│   ├── Header.scss
│   └── LoginPage.scss
├── App.js
└── index.js
```

### Key Directories
- **`components`**: Reusable components like `Header`, `ProtectedRoute`, and `ErrorBoundary`.
- **`pages`**: Different views of the application (Admin Dashboard, Employee Panel, Login Page).
- **`services`**: API-related functions encapsulated in one file for reusability.
- **`styles`**: SCSS files for styling components.

---

## Available Scripts

### `npm start`
Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.  

### `npm test`
Launches the test runner.

### `npm run eject`
Ejects the project setup. Use this only if necessary.

---

## Technical Details

### Components

#### 1. **`Header.js`**
- Displays a common header with the app logo, title, and logout functionality.
- Props: 
  - `role`: Indicates the current user role (admin or employee).

#### 2. **`ProtectedRoute.js`**
- Protects routes by verifying user authentication and role.
- Redirects unauthenticated users to the login page.

#### 3. **`ErrorBoundary.js`**
- Handles unexpected UI errors.
- Displays a fallback UI with an error message.

---

### Pages

#### 1. **`AdminDashboard.js`**
- Features:
  - View bike assembly stats.
  - View employee performance stats.
  - Toggle between Line, Bar, and Pie charts.
- APIs:
  - `fetchAssemblyStats(fromDate, toDate)`
  - `fetchEmployeeProductionStats(date)`

#### 2. **`EmployeePanel.js`**
- Features:
  - View and start assembly of unassembled bikes.
  - Mark assembly tasks as complete with time tracking.
  - Notifications using `react-toastify`.
- APIs:
  - `fetchUnassembledBikes()`
  - `assignBike(bikeId)`
  - `completeBike(bikeId, assemblyTime)`
  - `fetchUnderAssemblyBike()`

#### 3. **`LoginPage.js`**
- Handles user login.
- Stores authentication token and user role in `localStorage`.

---

### Services

#### `api.js`
- Centralized API service using `axios`.
- Configures:
  - Base URL from `.env`.
  - Request interceptor to attach the `Authorization` token.
  - Global error handling for API responses.

APIs:
- **Authentication**: `login(credentials)`
- **Employee Operations**:
  - `fetchUnassembledBikes()`
  - `assignBike(bikeId)`
  - `completeBike(bikeId, assemblyTime)`
  - `fetchUnderAssemblyBike()`
- **Admin Operations**:
  - `fetchAssemblyStats(fromDate, toDate)`
  - `fetchEmployeeProductionStats(date)`

---

### Error Handling

- The `ErrorBoundary` component ensures the app doesn't crash unexpectedly.  
- API errors are logged in the console and displayed to users via `react-toastify`.

---

## Styling

- Styles are written in SCSS, stored in the `styles/` directory.
- Each component/page has its own SCSS file for modular styling.
- A global SCSS file includes common styles like colors and fonts.

---

## Dependencies

| Dependency                   | Purpose                                       |
|------------------------------|-----------------------------------------------|
| `react`                      | Core library for building the app            |
| `react-router-dom`           | Routing and navigation                       |
| `axios`                      | HTTP requests to the backend                 |
| `chart.js` and `react-chartjs-2` | Data visualization                        |
| `react-toastify`             | Toast notifications                          |
| `sass`                       | SCSS preprocessing                          |
| `@fortawesome/fontawesome-svg-core`, `free-solid-svg-icons`, `react-fontawesome` | Icon support                          |

---