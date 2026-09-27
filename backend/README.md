# Backend

REST API built with Nest.js for the books catalog and its reviews.
Created in Tutorial 06, connected to the Vue frontend in Tutorial 07, and
packaged with Docker for deployment in Tutorial 08.

## Stack

- Node.js 26 (local), Node.js 22 (Docker image)
- Nest.js 12 (ESM modules)
- TypeScript 6
- TypeORM + better-sqlite3
- Prettier, Oxlint
- Docker

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

CORS allows the origins listed in the `CORS_ORIGIN` environment variable.
When it is not set (local development), it allows `http://localhost:5173`,
`http://localhost` and `http://127.0.0.1` (also set in `src/main.ts`).

Other commands:

- `npm run start` — run without watch mode
- `npm run build` — compile to `dist/`
- `npm run format` — format with Prettier
- `npm run lint` — check with Oxlint

## Environment variables

| Variable      | Default           | Description                          |
| ------------- | ----------------- | ------------------------------------ |
| `PORT`        | `3000`            | HTTP port                            |
| `SQLITE_PATH` | `database.sqlite` | Path of the SQLite file              |
| `CORS_ORIGIN` | not set           | Allowed origins, separated by commas |

None of them is needed for local development. In the deployment they are
set in `docker-compose.yml` (repository root).

## Database

SQLite, stored in `backend/database.sqlite` (or in the path set in
`SQLITE_PATH`). The file is generated on the first run and is not
versioned. TypeORM creates the schema automatically (`synchronize: true`),
so no migrations are needed. It has two tables: `book` and `review`.

The database starts empty. To load sample data, send POST requests to
`/api/books` with the body format described below, or create books from
the frontend at http://localhost:5173/books/create.

In the Docker deployment the file is `/data/database.sqlite`, inside the
`backend-data` volume, so the data survives container restarts. That
database also starts empty.

## Routes

| Method | Route                       | Description                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | `/api`                      | API status message           |
| GET    | `/api/books`                | List all books               |
| GET    | `/api/books/:id`            | Get one book by id           |
| POST   | `/api/books`                | Create a book                |
| GET    | `/api/reviews`              | List all reviews             |
| GET    | `/api/reviews/book/:bookId` | List the reviews of one book |
| POST   | `/api/reviews`              | Create a review              |

Book POST body format:

```json
{
  "title": "The Great Gatsby",
  "category": "Fiction",
  "price": 12.99,
  "stock": 3
}
```

Review POST body format (`author` is optional):

```json
{
  "bookId": 1,
  "rating": 5,
  "comment": "Good",
  "author": "Name"
}
```

`GET /api/books/:id` returns an empty body when the book does not exist.

## Docker

- `Dockerfile`: Node 22 image that installs only the production
  dependencies and runs `node dist/main.js` on port 3000.
- `.dockerignore`: keeps `node_modules`, tests, docs and `.env` files out
  of the image.
- `dist/` is versioned (it is no longer in `.gitignore`), because the image
  copies the pre-built output instead of compiling it. After changing
  `src/`, run `npm run build` and commit `dist/` before deploying.

The backend runs together with the frontend through `docker-compose.yml`
in the repository root. The deployment steps are in
`../frontend/README.md`.

## Structure

```
Dockerfile                         production image
.dockerignore                      files left out of the image
dist/                              compiled output, versioned for Docker
src/
  main.ts                          entry point, CORS and "api" prefix
  app.module.ts                    root module, database connection
  home/
    home.module.ts
    home.controller.ts             GET /api
  books/
    books.module.ts                registers books and reviews
    books.controller.ts            routes for /api/books
    books.service.ts               book data access logic
    reviews.controller.ts          routes for /api/reviews
    reviews.service.ts             review data access logic
    entities/book.entity.ts        book table, has many reviews
    entities/review.entity.ts      review table, belongs to a book
    dto/create-book.dto.ts         input shape for creating a book
    dto/create-review.dto.ts       input shape for creating a review
```

## Notes

`price` is declared as `@Column('real')` instead of a plain `@Column()`.
TypeORM maps a plain number column to an integer in SQLite, which truncates
decimal prices (12.99 becomes 12).

Reviews are linked to books with a `ManyToOne` / `OneToMany` relation.
Deleting a book also deletes its reviews (`onDelete: 'CASCADE'`).
