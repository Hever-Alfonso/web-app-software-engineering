# Frontend App

SPA/CSR project built with Vue.js, Vite, and TypeScript, developed step
by step as Tutorials 03, 04, 05, and 07 of the Web Application Software
Engineering course. Since Tutorial 07 it gets its data from the Nest.js
backend (`../backend`).

---

## Technologies

- Vue.js 3
- Vite 8
- TypeScript
- Vue Router
- Pinia
- Axios
- Tailwind CSS 4
- Prettier
- ESLint + oxlint

---

## Project structure

```text
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/css/input.css       # Tailwind entry file
│   ├── components/
│   │   └── BookReviews.vue        # shows and lets the user add reviews for a book
│   ├── dtos/
│   │   └── CreateBookDTO.ts       # shape of the data needed to create a book
│   ├── interfaces/
│   │   ├── BookInterface.ts       # shape of a book object
│   │   └── ReviewInterface.ts     # shape of a review object
│   ├── router/
│   │   └── index.ts               # route definitions
│   ├── services/
│   │   ├── BookService.ts         # calls the backend /api/books routes with Axios
│   │   └── ReviewService.ts       # calls the backend /api/reviews routes with Axios
│   ├── utils/
│   │   └── formatCurrency.ts      # formats a price as Colombian pesos
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── ContactView.vue
│   │   ├── BooksIndexView.vue     # books list loaded from the backend
│   │   ├── BooksShowView.vue      # single book detail, with its reviews
│   │   └── BooksCreateView.vue    # book creation form, saves to the backend
│   ├── App.vue                    # root component (sidebar + header layout)
│   ├── main.ts                    # app entry point
│   └── PiniaConfig.ts             # creates Pinia (LocalStorage sync disabled)
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/about` | "About" page |
| `/contact` | "Contact" page |
| `/books` | Books list, with a button to add a book |
| `/books/create` | Book creation form |
| `/books/:id` | Single book detail, with formatted price and reviews |

---

## Features

- **Backend data**: books and reviews are read and created through the
  REST API, using `BookService` and `ReviewService` (Axios).
- **Formatted price**: on the book detail page, prices are shown in
  Colombian pesos, with no decimals, using the `formatToCOP` function
  in `utils/formatCurrency.ts`. The books list shows the price as it
  comes from the backend.
- **Reviews**: each book has its own reviews section (view and add),
  with a star rating, comment, and optional author, handled by the
  `BookReviews.vue` component.

---

## Data persistence

All data is stored in the backend's SQLite database. The frontend no
longer uses Pinia stores or LocalStorage for books and reviews: in
Tutorial 07 the stores, seeders, and the category service were removed,
and the LocalStorage sync in `PiniaConfig.ts` was commented out.

The previous "Delete Last Book" button (Tutorial 04) and category filter
(Tutorial 05) were removed when the books list was replaced in
Tutorial 07.

---

## Getting started

Install dependencies:

```bash
npm install
```

Start the backend first (in another terminal):

```bash
cd ../backend
npm run start:dev
```

Run the dev server:

```bash
npm run dev
```

Open in the browser:

```text
http://localhost:5173
```

The backend must be running at http://localhost:3000, otherwise the
books and reviews will not load.

---

## Formatting

Run Prettier:

```bash
npm run format
```
