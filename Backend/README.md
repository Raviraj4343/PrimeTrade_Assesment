# PrimeTrade Backend API

Production-ready REST API built with Node.js, Express, MongoDB, and Mongoose. It includes JWT authentication, role-based access control, task CRUD, request validation, Swagger docs, and a scalable folder structure.

## Features

- ES module-based Node.js + Express backend
- MongoDB with Mongoose schema models
- JWT authentication with bcrypt password hashing
- Role-based access control for `user` and `admin`
- Task CRUD with owner-only access for users
- Joi request validation
- Security middleware with `cors`, `helmet`, `hpp`, `cookie-parser`, and `express-rate-limit`
- Centralized constants and error handling
- Swagger UI documentation
- Environment-based configuration with `dotenv`

## Folder Structure

```text
Backend/
  src/
    config/
    constants/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    validations/
    app.js
    server.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/prime-trade
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=1d
SWAGGER_SERVER_URL=http://localhost:5000
```

4. Run the app:

```bash
npm run dev
```

## API Base URL

`/api/v1`

## Swagger Documentation

Visit:

`/api-docs`

## Main Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/admin-only`

### Tasks

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Access Rules

- `user` can create and manage only their own tasks
- `admin` can view, update, and delete all tasks
- public registration creates `user` accounts only
- bootstrap admin users through a protected seed/admin flow or directly in MongoDB

## Sample Register Payload

```json
{
  "name": "Ravi Raj",
  "email": "raj@example.com",
  "password": "secret123"
}
```

## Sample Task Payload

```json
{
  "title": "Ship backend",
  "description": "Complete PrimeTrade assessment backend",
  "status": "todo"
}
```

## Production Notes

- Store a strong `JWT_SECRET` outside version control
- Use managed MongoDB, structured logging, and secret management in production
- Tighten CORS origins in production instead of using dynamic origin reflection
- Add rate limiting, refresh token strategy, and CI-based test coverage for hardening

## Scalability Ideas

- Split auth and task domains into microservices when boundaries grow
- Add Redis caching for frequent reads or session/token metadata
- Place the API behind a load balancer with horizontal scaling
- Introduce queues for background work such as notifications or analytics
