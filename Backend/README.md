# PrimeTrade Backend API

Production-ready REST API built with Node.js, Express, MongoDB, and Mongoose. It includes JWT authentication, secure cookie support, role-based access control, task CRUD, request validation, Swagger docs, and a scalable folder structure aligned with industry-style service layering.

## Features

- ES module-based Node.js + Express backend
- MongoDB with Mongoose schema models
- JWT authentication with bcrypt password hashing
- HTTP-only auth cookie support with Bearer token fallback
- Role-based access control for `user` and `admin`
- Task CRUD with owner-only access for users and full visibility for admins
- Task list filtering, searching, sorting, and pagination
- Query-aware MongoDB indexing and selective Mongoose virtuals
- Joi request validation
- Security middleware with `cors`, `helmet`, `hpp`, `cookie-parser`, and `express-rate-limit`
- Centralized constants and error handling
- Swagger UI documentation
- Environment-based configuration with `dotenv`
- Frontend-friendly API responses for easier integration

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
CLIENT_URL=http://localhost:5173
COOKIE_NAME=prime_trade_token
COOKIE_EXPIRES_IN_DAYS=1
BCRYPT_SALT_ROUNDS=10
```

4. Run the app:

```bash
npm run dev
```

## Health and Docs

- Health: `GET /health`
- API root: `GET /api/v1`
- Swagger UI: `GET /api-docs`

## API Base URL

`/api/v1`

## Main Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/admin-only`

### Tasks

- `GET /api/v1/tasks?page=1&limit=10&status=todo&search=ship&sort=latest`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Access Rules

- `user` can create and manage only their own tasks
- `admin` can view, update, and delete all tasks
- public registration creates `user` accounts only
- bootstrap admin users through a protected seed/admin flow or directly in MongoDB

## Response Shape

Successful responses follow a predictable structure:

```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": {}
}
```

## Mongoose Design Notes

- `User.email` is uniquely indexed for reliable authentication lookups
- `Task` uses compound indexes that match the main access patterns: owner-based listing, status filtering, and recent-first sorting
- `User.taskCount` is implemented as a virtual populate for lightweight dashboard/profile metadata
- `Task.isCompleted` is exposed as a computed virtual instead of storing redundant state

Validation and error responses are centralized and return:

```json
{
  "success": false,
  "message": "Validation failed",
  "details": []
}
```

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

## Frontend Integration

The repository includes a React client in `Frontend/` that can:

- register and login users
- fetch the current session via `/auth/me`
- create, update, delete, and filter tasks
- protect the dashboard route behind JWT authentication

Set `CLIENT_URL` in the backend `.env` to the origin where the frontend is served.

## Security Notes

- Store a strong `JWT_SECRET` outside version control
- Use managed MongoDB, structured logging, and secret management in production
- Tighten `CLIENT_URL` to known frontend origins in production
- Prefer secure cookies over local token storage in production browser apps
- Add refresh token rotation, audit logs, and CI-based automated tests for further hardening

## Scalability Ideas

- Split auth and task domains into microservices when boundaries grow
- Add Redis caching for frequent reads or session/token metadata
- Place the API behind a load balancer with horizontal scaling
- Introduce queues for background work such as notifications or analytics
