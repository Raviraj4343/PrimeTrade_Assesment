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

Serve this folder with any static server. Examples:

- VS Code Live Server
- `npx serve Frontend`
- any simple local static server

Recommended backend API base URL:

`http://localhost:5000/api/v1`

## Notes

- The UI stores the token in `localStorage` for demo convenience.
- The backend also supports secure auth cookies, which is the preferred production browser pattern.
