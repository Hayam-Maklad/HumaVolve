# User Management API

A REST API built with Express.js and MongoDB.

## Features

- User Registration
- User Login
- JWT Authentication
- Role-based Authorization
- User CRUD Operations
- Pagination
- Search User by Email

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

## Installation

```bash
npm install
```

## Run Project

```bash
npm start
```

## Environment Variables

Create a `.env` file and add:

```env
PORT=
DB_URL=
JWT_SECRET=
```

## API Endpoints

### Authentication

- POST `/auth/register`
- POST `/auth/login`

### Users

- GET `/users`
- GET `/users/:id`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`
- GET `/users/search?email=test@gmail.com`