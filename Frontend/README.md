# PrimeTrade Frontend

Supportive frontend built with modular Vanilla JS. It is intentionally lightweight, but the folder structure follows a more production-style separation of concerns so the project can scale beyond a single page script.

## Structure

```text
Frontend/
  src/
    app/        bootstrap and page orchestration
    config/     constants and environment-like defaults
    features/   domain-specific services for auth and tasks
    services/   shared API client
    store/      application state
    styles/     global stylesheet
    ui/         DOM bindings and render helpers
    utils/      storage utilities
    main.js     frontend entry point
  index.html
```

## Supported Flows

- Register users
- Log in users
- Access a protected dashboard via JWT-authenticated requests
- Perform task CRUD operations
- Show success and error feedback from API responses
- Inspect the current authenticated user

## Run

1. Start the backend first:

```bash
cd Backend
npm install
npm run dev
```

2. Serve the frontend with any static server. Examples:

- VS Code Live Server
- `npx serve Frontend`
- `python -m http.server 5500` from the `Frontend` directory

3. Open the frontend in the browser and keep the API base URL as:

`http://localhost:5000/api/v1`

4. If you use Live Server or another custom port, make sure the backend `CLIENT_URL` in `Backend/.env` matches that frontend origin. Example:

```env
CLIENT_URL=http://127.0.0.1:5500
```

## Notes

- The UI stores the token in `localStorage` for demo convenience.
- The backend also supports secure auth cookies, which is the preferred production browser pattern.
