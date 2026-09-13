# Blog API

A production-ready RESTful Blog API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

The API enables authenticated users to create and manage blog articles, upload and manage article images, manage profile pictures, search and filter content, paginate results, and add comments.

It follows the **MVC (Model-View-Controller)** architectural pattern and demonstrates backend development best practices including JWT authentication, authorization, request validation, middleware, centralized error handling, Cloudinary image management, and environment configuration validation.

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

* User registration
* User login
* JWT authentication
* Password hashing using bcrypt
* Protected API routes

## Authorization

* Only authenticated users can create articles
* Only the owner of an article can update it
* Only the owner of an article can delete it
* Only the owner of an article can add or delete its images
* Only authenticated users can comment on articles
* Only authenticated users can manage their profile picture

## Articles

* Create articles
* Retrieve all articles
* Retrieve a single article
* Update articles
* Delete articles
* Search by title or content
* Filter by category
* Pagination
* Category validation
* Author information automatically associated with articles

## Article Images

Article images are stored using **Cloudinary**, while image information is stored in MongoDB.

Each article image stores:

* Secure image URL
* Cloudinary public ID
Supported operations:
* Upload multiple article images when creating an article
* Add multiple new images to an existing article
* Delete selected article images
* Automatically remove associated Cloudinary images when an article image is deleted
* Automatically remove associated Cloudinary images when an article is deleted
* Prevent unauthorized users from modifying another user's article images

The Cloudinary upload functionality uses Multer's `memoryStorage`, allowing image buffers to be uploaded directly to Cloudinary without permanently storing uploaded files on the server.

Article image uploads support up to **10 images per request**, with a maximum file size of **2MB per image**.

## User Profile Pictures

Users can optionally add a profile picture from their profile page.

Profile pictures:

* Are not required during registration
* Are not part of the login process
* Are uploaded through a dedicated authenticated endpoint
* Are stored in Cloudinary
* Store the image URL and Cloudinary public ID in MongoDB
* Can be replaced without creating orphaned Cloudinary images

## Comments

* Add comments to articles
* Comments are linked to authenticated users
* Comment authors are automatically populated when retrieving articles
* Comment timestamps are automatically generated

## Other Features

* MVC architecture
* Environment variable validation at application startup
* Request validation using Joi
* Centralized error handling
* Request logging middleware
* MongoDB integration with Mongoose
* Cloudinary integration for image storage
* Reusable Cloudinary upload and deletion utilities
* Author information populated automatically
* Comment author information populated automatically
* Protected resource ownership checks

---

# Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Joi
* JSON Web Token (JWT)
* bcrypt
* Cloudinary
* Multer
* dotenv
* CORS
* Nodemon

---

# Project Structure

```text
Blog/

│
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   ├── connectDb.js
│   │   ├── env.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── article.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── requireAuth.js
│   │   ├── upload.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── article.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── article.routes.js
│   │   └── user.routes.js
│   │
│   ├── utils/
│   │   ├── bcrypt.js
│   │   ├── cloudinary.js
│   │   └── jwt.js
│   │
│   └── validators/
│       ├── article.validator.js
│       └── user.validator.js
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/AhamefulaChibundu/blog-api.git
```

Navigate into the project:

```bash
cd blog-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a template.

Configure the required environment variables, including MongoDB and Cloudinary credentials.

Start the development server:

```bash
npm run dev
```

or:

```bash
nodemon index.js
```

---

# Authentication

Protected routes require a Bearer Token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

You can obtain a token by logging in.

---

# API Endpoints

## Authentication

| Method | Endpoint                    | Description                                         |
| ------ | --------------------------- | --------------------------------------------------- |
| POST   | `/api/user/auth/sign-up`    | Register a new user                                 |
| POST   | `/api/user/auth/login`      | Login and receive a JWT                             |
| PUT    | `/api/user/profile-picture` | Upload or replace profile picture *(Authenticated)* |

---

## Articles

| Method | Endpoint                   | Description                                   |
| ------ | -------------------------- | --------------------------------------------- |
| POST   | `/api/articles`            | Create an article *(Authenticated)*           |
| GET    | `/api/articles`            | Retrieve all articles                         |
| GET    | `/api/articles/:id`        | Retrieve a single article                     |
| PUT    | `/api/articles/:id`        | Update article *(Owner only)*                 |
| DELETE | `/api/articles/:id`        | Delete article *(Owner only)*                 |
| PUT    | `/api/articles/:id`        | Add article images *(Owner only)*             |
| DELETE | `/api/articles/:id/images` | Delete selected article images *(Owner only)* |

---

## Comments

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| POST   | `/api/articles/:id/comments` | Add comment *(Authenticated)* |

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

> **Note:** A profile picture is optional and is not required during registration.

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

Articles can also be created with multiple images using `multipart/form-data`.

Form-data fields:

```text
title: Getting Started with Express
content: Express.js is a minimal and flexible Node.js framework for building web applications...
category: Programming
images: <image file>
images: <image file>
images: <image file>
```

Up to 10 images can be uploaded in a single request.

## Add Comment

```json
{
  "comment": "Great article! Thanks for sharing."
}
```

> **Note:** The authenticated user is automatically assigned as the comment author.

## Upload Profile Picture

The profile picture endpoint uses `multipart/form-data`.

```http
PUT /api/user/profile-picture
```

Header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Form-data:

```text
image: <image file>
```

The image is uploaded to Cloudinary and the resulting image URL and public ID are stored in the user's MongoDB document.

## Add Article Images

New images can be added to an existing article using:

```http
PUT /api/articles/:id
```

Header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Form-data:

```text
images: <image file>
images: <image file>
images: <image file>
```

Only the article owner can perform this operation.

Existing article images are retained when new images are uploaded.

## Delete Selected Article Images

```http
DELETE /api/articles/:id/images
```

Header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Request body:

```json
{
  "publicIds": [
    "uploads/image1",
    "uploads/image2"
  ]
}
```

Only the article owner can perform this operation.

Only the selected images belonging to the article are removed.

---

# Image Management

Images are uploaded to Cloudinary while their references are stored in MongoDB.

Each article can contain multiple images.

The application stores:

```json
{
  "images": [
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "uploads/example1"
    },
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "uploads/example2"
    }
  ]
}
```

The `publicId` is used to identify and delete the corresponding image from Cloudinary.

The application also handles image cleanup when:

* An article image is deleted

* An article containing images is deleted

* A profile picture is replaced

If multiple images are uploaded and a database operation fails after the Cloudinary uploads, the uploaded images are also cleaned up to prevent orphaned files.

This helps prevent unnecessary orphaned files in Cloudinary.

---

# HTTP Status Codes

| Status Code | Description                                         |
| ----------- | --------------------------------------------------- |
| 200         | Request successful                                  |
| 201         | Resource created successfully                       |
| 204         | Resource deleted successfully                       |
| 207         | Some image operations succeeded while others failed |
| 400         | Bad request / Validation error                      |
| 401         | Unauthorized / Invalid or missing token             |
| 403         | Forbidden / User not authorized                     |
| 404         | Resource not found                                  |
| 500         | Internal server error                               |

---

# Future Improvements

* Edit comments
* Delete comments
* Like articles
* Tags
* Rich text editor support
* Swagger/OpenAPI documentation
* Docker support
* API rate limiting
* Helmet security headers
* Unit testing
* Integration testing
* Refresh tokens
* Role-based authorization
* Advanced user profile management
* Image optimization and transformation
* Automated cleanup/reconciliation for orphaned Cloudinary images

---

# Author

**Ahamefula Chibundu**