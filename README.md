# Authentication & Authorization System

A full-stack Authentication & Authorization System built using **React**, **Node.js**, **Express**, and **TypeScript**. This project demonstrates production-style architecture with JWT authentication, role-based authorization, refresh token handling, reusable frontend components, and secure backend APIs.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token Implementation
- Logout
- View and update own profile
- Change Password
- Password Hashing using bcrypt

### Authorization

Two user roles are supported:

#### Admin
- View all users
- View user by ID
- Create users
- Update users
- Delete users
- Activate/Deactivate users
- View own profile

#### User
- View own profile
- Update own profile (first name, last name, email)
- Change password- Change Password (separate API)

---

## Frontend Features

- Login Page
- Register Page
- Dashboard
- Profile Page (self profile editing)
- Change Password
- User Management (Admin Only): Create, Edit, Delete, Search, Activate/Deactivate
- Empty state UI on the Users table
- 404 Not Found page
- Guard preventing a logged-in user from opening `/login` or `/register`
- Protected Routes
- Automatic Access Token Refresh (Axios interceptor with retry)
- Form Validation with React Hook Form + Zod, used consistently across Login, Register, Profile, Add User, and Edit User
- Loading Indicators
- Toast Notifications
- Responsive UI, including a collapsible mobile navigation menu
- Reusable Components

---

## Backend Features

- REST APIs
- JWT Authentication
- Refresh Token Management
- bcrypt Password Hashing
- Role-Based Authorization
- Validation using Zod
- Authentication Middleware
- Authorization Middleware
- Error Handling Middleware
- Request Logging Middleware
- JSON File Storage
- Modular Folder Structure

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- React Hook Form
- Zod
- Tailwind CSS
- Context API

### Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt
- Zod
- UUID
- fs (JSON File Storage)

---

# Project Structure

```
Authentication_System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── validators
│   │   └── data
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   │
│   └── package.json
│
└── README.md
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | User login |
| POST | `/auth/refresh-token` | Generate a new access token |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/profile` | Get logged-in user's profile |
| PUT | `/auth/change-password` | Change password |

---

## User Management

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

---

# Authentication Flow

1. User registers using Register API.
2. User logs in with email and password.
3. Backend generates:
   - Access Token
   - Refresh Token
4. Access Token is used for protected APIs.
5. When the Access Token expires, a new Access Token is generated using the Refresh Token.
6. Logout removes the Refresh Token from storage.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/vid123ver/authentication-system
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```
http://localhost:5002
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5002

ACCESS_TOKEN_SECRET=replace_with_your_access_token_secret

REFRESH_TOKEN_SECRET=replace_with_your_refresh_token_secret

ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_EXPIRES_IN=7d
```

---

# Validation

The project validates:

- Required Fields
- Email Format
- Password Length
- Duplicate Email
- Invalid Requests

Meaningful error messages and appropriate HTTP status codes are returned.

---

# Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Refresh Token Support
- Role-Based Authorization (Admin-only routes enforced via middleware)
- Self-or-Admin authorization on profile updates (`authorizeSelfOrAdmin`)
- Protected Routes
- Request Validation (Zod, server-side)
- Centralized Error Handling with correct HTTP status codes
- Inactive users are blocked at login
- Refresh tokens are revoked on logout and after password change

**Known limitations:**
- Access tokens are not blacklisted and remain valid until they expire (default: 15 minutes). To reduce the security impact, the application uses short-lived access tokens, refresh token revocation on logout, and revokes all refresh tokens after a password change.

---

## Postman Collection

A Postman collection containing all API endpoints is included in this repository.

**Collection:**

- [Authentication & Authorization System.postman_collection.json](./Postman/Authentication%20%26%20Authorization%20System.postman_collection.json)

Import this collection into Postman to test all authentication and user management APIs.
---

# Future Improvements

- Refresh Token Rotation
- Pagination
- Docker Support
- Swagger Documentation
- Rate Limiting
- Account Lock After Multiple Failed Login Attempts

---

** Developed by Vidhan Verma **

---

## Thank You

Thank you for reviewing this project.
