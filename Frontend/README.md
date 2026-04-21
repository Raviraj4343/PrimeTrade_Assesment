# PrimeTrade Frontend

React frontend built with Vite. It provides a clean authentication flow, protected dashboard access, and full CRUD interaction with the backend task API.

## Folder Structure

```text
Frontend/
  src/
    components/
      auth/
      common/
      layout/
      tasks/
    constants/
    context/
    pages/
    routes/
    services/
    styles/
    App.jsx
    main.jsx
  .env.example
  index.html
  package.json
  vite.config.js
```

## Features

- React Router based pages: Landing, Login, Register, Dashboard
- Protected dashboard route with JWT check
- Authentication state managed with React context and hooks
- Axios client with token attachment and `401` handling
- Task CRUD with loading, success, and error states
- Responsive, minimal UI with reusable components

## Setup

1. Start the backend:

```bash
cd Backend
npm install
npm run dev
```

2. Start the frontend:

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev
```

3. Open the Vite app shown in the terminal, usually:

`http://localhost:5173`

4. Update backend CORS if needed:

```env
CLIENT_URL=http://localhost:5173
```

## API Integration

- Base URL is read from `VITE_API_BASE_URL`
- JWT token is stored in `localStorage`
- Axios automatically attaches the token to outgoing requests
- If the backend returns `401 Unauthorized`, the token is cleared and the user is redirected to `/login`

## Authentication Flow

1. User registers or logs in from the React pages
2. Backend returns user data plus JWT
3. Frontend stores the token and updates auth context
4. Protected routes render only when a valid session exists
5. On refresh, the app calls `/auth/me` to restore the session if the token is still valid

## Notes

- This implementation keeps the frontend minimal but aligned with real-world structure
- For stronger browser security in production, prefer secure HTTP-only cookies over localStorage when the backend/session model supports it
