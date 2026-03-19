## Teme Website

This repository now has two parts:

- Frontend: Next.js app in the repository root.
- Backend: Express + Supabase API in [backend](backend).

The public gallery is currently static in frontend, while admin management is powered by backend APIs.

## Frontend setup

Create a frontend env file (for admin page auth + backend URL):

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_BACKEND_URL

Run frontend:

```bash
pnpm install
pnpm dev
```

Frontend URL: http://localhost:3000

Admin UI page: /admin/gallery

## Backend setup

See [backend/README.md](backend/README.md) for full setup.

Run backend:

```bash
pnpm --dir backend install
pnpm --dir backend dev
```

Backend URL: http://localhost:4000
