# PrimeTrade

PrimeTrade is a full-stack task management platform with secure authentication, role-based access control, and a production-style React + Node.js architecture.

![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Build](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Framework](https://img.shields.io/badge/Framework-Express-000000?style=flat-square&logo=express&logoColor=white)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-JWT-111111?style=flat-square&logo=jsonwebtokens&logoColor=white)
![ODM](https://img.shields.io/badge/ODM-Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![Validation](https://img.shields.io/badge/Validation-Joi-0B5FFF?style=flat-square)
![Security](https://img.shields.io/badge/Security-Helmet%20%7C%20RateLimit%20%7C%20HPP-1A7F37?style=flat-square)
![Docs](https://img.shields.io/badge/API-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=111)
![Frontend Hosting](https://img.shields.io/badge/Frontend%20Hosting-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Backend Hosting](https://img.shields.io/badge/Backend%20Hosting-Render-46E3B7?style=flat-square&logo=render&logoColor=111)

## Live URLs

- Frontend: https://ptaitask-nine.vercel.app
- Backend: https://ptai-xlvm.onrender.com
- API Docs: https://ptai-xlvm.onrender.com/api-docs

## Highlights

- Secure auth flow: register, login, logout, current user
- Task CRUD with filtering, search, sorting, and pagination
- RBAC support: user and admin roles
- Admin capabilities: platform-wide task visibility and management
- Protected frontend routes with auth context and Axios interceptors
- Swagger docs for fast API exploration
- Structured backend architecture (controller/service/middleware split)

## Repository Structure

```text
PrimeTrade/
  Backend/
    src/
      config/
      constants/
      controllers/
      middleware/
      models/
      routes/
      scripts/
      services/
      utils/
      validations/
  Frontend/
    src/
      components/
      constants/
      context/
      pages/
      routes/
      services/
      styles/
```

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Axios

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Joi
- Helmet, HPP, CORS, cookie-parser, express-rate-limit
- Swagger (swagger-jsdoc + swagger-ui-express)

## Environment Variables

### Frontend (.env)

```env
VITE_API_BASE_URL=https://ptai-xlvm.onrender.com/api/v1
```

### Backend (.env)

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret
JWT_EXPIRES_IN=1d
SWAGGER_SERVER_URL=https://ptai-xlvm.onrender.com
CLIENT_URL=https://ptaitask-nine.vercel.app,http://localhost:5173
COOKIE_NAME=prime_trade_token
COOKIE_EXPIRES_IN_DAYS=1
BCRYPT_SALT_ROUNDS=10
```

## Local Setup

### 1) Backend

```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on http://localhost:5173 by default.

## Available Scripts

### Backend

```bash
npm run dev
npm start
npm run make-admin -- user@example.com
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## API Snapshot

Base URL:

```text
/api/v1
```

Auth routes:

- POST /auth/register
- POST /auth/login
- GET /auth/me
- POST /auth/logout
- GET /auth/admin-only

Task routes:

- GET /tasks
- POST /tasks
- GET /tasks/:id
- PATCH /tasks/:id
- DELETE /tasks/:id

## Role Access Rules

- user: create and manage own tasks only
- admin: view, edit, and delete tasks across the platform
- public registration creates user role by default

## Deployment Notes

- Frontend (Vercel): set root directory to Frontend
- Add SPA rewrite file at Frontend/vercel.json
- Set frontend env VITE_API_BASE_URL to Render API URL
- Backend (Render): set CLIENT_URL to deployed frontend domain(s)
- Redeploy both services after environment variable changes

## Project Docs

- Backend details: Backend/README.md
- Frontend details: Frontend/README.md

## License

MIT

## Assignment Submission for PrimetradeAI Backend Developer Internship
