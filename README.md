# PrimeTrade Assessment

PrimeTrade is a full-stack assessment project with a production-style Node.js/Express backend and a lightweight frontend client that demonstrates authentication and task CRUD integration.

## Repository Structure

```text
PrimeTrade/
  Backend/   REST API with MongoDB, JWT auth, RBAC, validation, Swagger
  Frontend/  Minimal UI for login, session view, and task management
```

## What’s Included

- RESTful backend with versioned routes under `/api/v1`
- MongoDB + Mongoose schema design for `User` and `Task`
- JWT authentication with bcrypt password hashing
- Role-based access control for `user` and `admin`
- Security middleware: `cors`, `helmet`, `hpp`, `cookie-parser`, `express-rate-limit`
- Swagger documentation for API exploration
- Basic frontend UI connected to the live APIs
- README documentation and scalability notes

## Quick Start

### Backend

```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

Serve the `Frontend` directory with any static server and point it to:

`http://localhost:5000/api/v1`

If you use VS Code Live Server, set the backend `CLIENT_URL` accordingly, for example:

```env
CLIENT_URL=http://127.0.0.1:5500
```

## Main Deliverables

- Authentication APIs: register, login, logout, current user
- Task CRUD APIs with RBAC and ownership enforcement
- Swagger docs at `/api-docs`
- Frontend integration for end-to-end verification
- Scalability notes covering microservices, caching, and load balancing

## Documentation

- Backend setup and API details: [Backend/README.md](Backend/README.md)
- Frontend usage notes: [Frontend/README.md](Frontend/README.md)
