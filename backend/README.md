# Backend

REST API built with Nest.js for the books catalog. Created in Tutorial 06.

## Stack

- Node.js 26
- Nest.js 12 (ESM modules)
- TypeScript 6
- TypeORM + better-sqlite3
- Prettier, Oxlint

## Setup

```bash
cd backend
npm install
```

If `better-sqlite3` fails to load, approve and rebuild its native binary:

```bash
npm approve-scripts better-sqlite3
npm rebuild better-sqlite3
```

## Run

```bash
npm run start:dev
```

The server starts at http://localhost:3000. Every route is prefixed with
`api` (set in `src/main.ts`).

Other commands:

- `npm run start` — run without watch mode
- `npm run build` — compile to `dist/`
- `npm run format` — format with Prettier
- `npm run lint` — check with Oxlint

## Database

SQLite, stored in `backend/database.sqlite`. The file is generated on the
first run and is not versioned. TypeORM creates the schema automatically
(`synchronize: true`), so no migrations are needed.

The database starts empty. To load sample data, send three POST requests
to `/api/books` with the body format described below.

## Routes

| Method | Route            | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api`           | API status message |
| GET    | `/api/books`     | List all books     |
| GET    | `/api/books/:id` | Get one book by id |
| POST   | `/api/books`     | Create a book      |

POST body format:

```json
{
  "title": "The Great Gatsby",
  "category": "Fiction",
  "price": 12.99,
  "stock": 3
}
```

`GET /api/books/:id` returns an empty body when the book does not exist.

## Structure

```
src/
  main.ts                          entry point, sets the "api" prefix
  app.module.ts                    root module, database connection
  home/
    home.module.ts
    home.controller.ts             GET /api
  books/
    books.module.ts
    books.controller.ts            routes for /api/books
    books.service.ts               data access logic
    entities/book.entity.ts        book table definition
    dto/create-book.dto.ts         input shape for creating a book
```

## Notes

`price` is declared as `@Column('real')` instead of a plain `@Column()`.
TypeORM maps a plain number column to an integer in SQLite, which truncates
decimal prices (12.99 becomes 12).