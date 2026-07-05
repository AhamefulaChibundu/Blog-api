# Blog API

A RESTful Blog API built with Node.js, Express.js, MongoDB, and Mongoose. The API enables clients to manage blog articles through CRUD operations, search and filter content, paginate results, and add comments to articles. It follows REST principles and demonstrates common backend development practices such as request validation, middleware, and centralized error handling.

## Live Demo

### Example Endpoints

- **Get all articles**  
  https://blog-api-jf07.onrender.com/api/articles

- **Search articles**  
  https://blog-api-jf07.onrender.com/api/articles?search=jimmy

- **Filter by category**  
  https://blog-api-jf07.onrender.com/api/articles?category=Technology

- **Pagination**  
  https://blog-api-jf07.onrender.com/api/articles?page=1&limit=5

- **Combined query**  
  https://blog-api-jf07.onrender.com/api/articles?category=Technology&search=jimmy&page=1&limit=5
  
## Features

- Create new blog articles
- Retrieve all articles
- Retrieve a single article by ID
- Update existing articles
- Delete articles
- Search articles by title or content
- Filter articles by category
- Paginate article results
- Add comments to articles
- Request logging middleware
- Request validation using Joi
- Global error handling
- MongoDB integration with Mongoose

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- dotenv
- CORS
- Nodemon

---

## Project Structure

```
Blog/
│
├── controllers/
│   └── article.controller.js
│
├── database/
│   └── db.js
│
├── middlewares/
│   ├── errorHandler.js
│   ├── logger.js
│   ├── schema.js
│   └── validator.js
│
├── models/
│   └── article.model.js
│
├── routes/
│   └── article.routes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## Installation

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

## API Endpoints

### Articles

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/articles` | Create a new article |
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get a single article |
| PUT | `/api/articles/:id` | Update an article |
| DELETE | `/api/articles/:id` | Delete an article |

---

### Comments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/articles/:id/comments` | Add a comment to an article |

---

## Query Parameters

### Search

```http
GET /api/articles?search=anyword
```

Searches article title and content.

### Filter by Category

```http
GET /api/articles?category=Technology
```

### Pagination

```http
GET /api/articles?page=1&limit=5
```

You can combine them.

Example:

```http
GET /api/articles?category=Technology&search=anyword&page=1&limit=5
```

---

## Example Request

```json
{
    "title": "Getting Started with Express",
    "content": "Express.js is a minimal and flexible Node.js framework for building web applications...",
    "author": "Ahamefula Chibundu",
    "category": "Programming"
}
```

---


## Future Improvements

- User authentication with JWT
- User registration and login
- Authorization
- Edit comments
- Delete comments
- Like articles
- Image uploads
- Tags
- Rich text editor support
- Swagger API documentation
- Unit and integration testing

---

## Author

**Ahamefula Chibundu**
