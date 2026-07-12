# Blog API

A production-ready RESTful Blog API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. The API enables authenticated users to create and manage blog articles, search and filter content, paginate results, and add comments. It demonstrates backend development best practices including JWT authentication, authorization, request validation, middleware, and centralized error handling.

---

# Live Demo

## Example Endpoints

### Sign Up

POST https://blog-api-jf07.onrender.com/api/user/auth/sign-up

### Login

POST https://blog-api-jf07.onrender.com/api/user/auth/login

### Get all articles

GET https://blog-api-jf07.onrender.com/api/articles

### Search articles

GET https://blog-api-jf07.onrender.com/api/articles?search=jimmy

### Filter by category

GET https://blog-api-jf07.onrender.com/api/articles?category=Technology

### Pagination

GET https://blog-api-jf07.onrender.com/api/articles?page=1&limit=5

### Combined query

GET https://blog-api-jf07.onrender.com/api/articles?category=Technology&search=node&page=1&limit=5

---

# Features

## Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected API routes

## Authorization

- Only authenticated users can create articles
- Only the owner of an article can update or delete it
- Only authenticated users can comment on articles

## Articles

- Create articles
- Retrieve all articles
- Retrieve a single article
- Update articles
- Delete articles
- Search by title or content
- Filter by category
- Pagination

## Comments

- Add comments to articles
- Comments are linked to authenticated users

## Other Features

- Populate article author information
- Populate comment author information
- Request validation using Joi
- Request logging middleware
- Centralized error handling
- MongoDB integration with Mongoose

---

# Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Joi
- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS
- Nodemon

---

# Project Structure

```text
Blog/
│
├── controllers/
│   ├── article.controller.js
│   └── user.controller.js
│
├── database/
│   └── db.js
│
├── middlewares/
│   ├── requireAuth.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── schema.js
│   └── validator.js
│
├── models/
│   ├── article.model.js
│   └── user.model.js
│
├── routes/
│   ├── article.routes.js
│   └── user.routes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/AhamefulaChibundu/blog-api.git
```

Navigate into the project

```bash
cd blog-api
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the development server

```bash
npm run dev
```

or

```bash
nodemon index.js
```

---

# Authentication

All protected routes require a Bearer Token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

You can obtain a token by logging in.

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/sign-up` | Register a new user |
| POST | `/api/login` | Login and receive a JWT |

---

## Articles

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/articles` | Create a new article *(Authenticated)* |
| GET | `/api/articles` | Get all articles *(Authenticated)* |
| GET | `/api/articles/:id` | Get a single article *(Authenticated)* |
| PUT | `/api/articles/:id` | Update an article *(Owner only)* |
| DELETE | `/api/articles/:id` | Delete an article *(Owner only)* |

---

## Comments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/articles/:id/comments` | Add a comment *(Authenticated)* |

---

# Query Parameters

## Search

```http
GET /api/articles?search=node
```

Searches article titles and content.

## Filter by Category

```http
GET /api/articles?category=Technology
```

## Pagination

```http
GET /api/articles?page=1&limit=5
```

You can combine query parameters.

Example:

```http
GET /api/articles?category=Technology&search=node&page=1&limit=5
```

---

# Example Requests

## Register User

```json
{
  "name": "David Mark",
  "email": "david@example.com",
  "password": "password123"
}
```

## Login User

```json
{
  "email": "david@example.com",
  "password": "password123"
}
```

## Create Article

```json
{
  "title": "Getting Started with Express",
  "content": "Express.js is a minimal and flexible Node.js framework for building web applications...",
  "category": "Programming"
}
```

> **Note:** The authenticated user is automatically assigned as the article author.

## Add Comment

```json
{
  "comment": "Great article! Thanks for sharing."
}
```

> **Note:** The authenticated user is automatically assigned as the comment author.

---

# HTTP Status Codes

| Status Code | Description |
|------------|-------------|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Bad request / Validation error |
| 401 | Unauthorized / Invalid or missing token |
| 403 | Forbidden / User not authorized |
| 404 | Resource not found |
| 500 | Internal server error |

---

# Future Improvements

- Edit comments
- Delete comments
- Like articles
- Upload article images
- Tags
- Rich text editor support
- Swagger/OpenAPI documentation
- Unit testing
- Integration testing
- User profile management
- Refresh tokens
- Role-based authorization (Admin/User)

---

# Author

**Ahamefula Chibundu**