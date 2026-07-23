# Task Management System (Mini-ERP) — Backend

REST API for the Task Management System, built with Express and TypeORM, providing authentication, task CRUD, and analytics endpoints.

## Features

- User registration and login with cookie-based (HttpOnly) sessions
- JWT authentication with protected routes
- Task CRUD (create, list with filters, view, update, delete), scoped per user
- Analytics endpoint returning status distribution, priority breakdown, and summary counts (active tasks, completed today, overdue)
- Request validation via DTOs

## Tech Stack

| Tool | Why it was chosen |
|---|---|
| **Express** | Minimal, well-documented framework for building the REST API without unnecessary overhead. |
| **TypeORM** | Decorator-based entities (`@Entity`, `@Column`, `@ManyToOne`) map directly to relational tables, keeping the schema close to the code and making relationships (User → Task) explicit and type-safe. |
| **PostgreSQL** | Relational database well suited to the User–Task one-to-many relationship and filtering/aggregation queries used by the analytics endpoint. |
| **class-validator** | Declarative DTO validation on incoming requests, catching malformed payloads before they reach business logic. |
| **JWT (HttpOnly cookie)** | Keeps the auth token out of reach of client-side JavaScript (mitigates XSS token theft) compared to storing it in browser storage. |

## Prerequisites

- Node.js 18+
- PostgreSQL running locally (or an accessible connection string)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <backend-repo-url>
   cd task_managment-BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=task_management
   JWT_SECRET=your_jwt_secret
   ```

   | Variable | Description |
   |---|---|
   | `PORT` | Port the API server runs on |
   | `DB_HOST` | PostgreSQL host |
   | `DB_PORT` | PostgreSQL port |
   | `DB_USERNAME` | PostgreSQL username |
   | `DB_PASSWORD` | PostgreSQL password |
   | `DB_NAME` | Database name |
   | `JWT_SECRET` | Secret used to sign auth tokens |

4. **Run migrations** (or let TypeORM `synchronize` create tables in development)
   ```bash
   npm run typeorm migration:run
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000/api`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the server in development mode |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled server |

## Database Schema

Two main tables: **User** and **Task**, in a one-to-many relationship (one user has many tasks, each task belongs to exactly one user).

```
┌───────────────────────┐          ┌────────────────────────────┐
│         User          │          │            Task            │
├───────────────────────┤          ├────────────────────────────┤
│ id           PK, int  │          │ id            PK, int      │
│ firstName    varchar  │          │ title         varchar      │
│ lastName     varchar  │          │ description   varchar      │
│ email        varchar  │          │ due_date      timestamp    │
│ password     varchar  │          │ priority      varchar      │
└───────────────────────┘          │ status        varchar      │
                                   │ createdAt timestamp, null  │
                                   │ user_id       FK → User.id │
                                   └────────────────────────────┘
```

**User**
| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key, auto-generated |
| `firstName` | varchar | |
| `lastName` | varchar | |
| `email` | varchar | |
| `password` | varchar | |

**Task**
| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key, auto-generated |
| `title` | varchar | |
| `description` | varchar | |
| `due_date` | timestamp | Not nullable |
| `priority` | varchar | Expected values: `Low`, `Medium`, `High` |
| `status` | varchar | Expected values: `To Do`, `In Progress`, `Completed` |
| `createdAt` | timestamp | Nullable |
| `user_id` | int | Foreign key → `User.id`, not nullable |

**Relationship:** `User (1) ──── (many) Task`, defined via `@OneToMany`/`@ManyToOne` with `onDelete: "CASCADE"` — deleting a user deletes their tasks. All task queries are scoped to the authenticated user's `id`.

## API Endpoints (summary)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in, sets auth cookie |
| POST | `/api/auth/logout` | Clear auth cookie |
| GET | `/api/users/me` | Get current user's profile |
| PATCH | `/api/users/me` | Update current user's profile |
| GET | `/api/tasks` | List tasks (supports `status` / `priority` filters) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/summery-card` | Get status distribution, priority breakdown, and summary counts |

## Notes

- All protected routes require a valid auth cookie; unauthenticated requests return `401`.
- Task queries are always scoped to `req.user.id` — users can only see and modify their own tasks.