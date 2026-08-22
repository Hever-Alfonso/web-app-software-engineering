# Frontend App

SPA/CSR project built with Vue.js, Vite, and TypeScript, developed step
by step as Tutorials 03, 04, and 05 of the Web Application Software
Engineering course.

---

## Technologies

- Vue.js 3
- Vite 8
- TypeScript
- Vue Router
- Pinia
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
│   │   ├── BookService.ts         # service layer for book data access
│   │   ├── CategoryService.ts     # unique book categories, used by the filter
│   │   └── ReviewService.ts       # service layer for review data access
│   ├── stores/
│   │   ├── bookstore.ts           # Pinia store holding the books state
│   │   ├── bookseeder.ts          # initial book data used on first load
│   │   ├── reviewstore.ts         # Pinia store holding the reviews state
│   │   └── reviewseeder.ts        # initial review data used on first load
│   ├── utils/
│   │   └── formatCurrency.ts      # formats a price as Colombian pesos
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── ContactView.vue
│   │   ├── BooksIndexView.vue     # books list, create/delete last book, category filter
│   │   ├── BooksShowView.vue      # single book detail, with its reviews
│   │   └── BooksCreateView.vue    # book creation form
│   ├── App.vue                    # root component (sidebar + header layout)
│   ├── main.ts                    # app entry point
│   └── PiniaConfig.ts             # sets up Pinia and syncs it with LocalStorage
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
| `/books` | Books list, with buttons to add or delete the last book, and a category filter |
| `/books/create` | Book creation form |
| `/books/:id` | Single book detail, with formatted price and reviews |

---

## Features

- **Formatted price**: prices are shown in Colombian pesos, with no
  decimals, using the `formatToCOP` function in
  `utils/formatCurrency.ts`.
- **Category filter**: on the books list, a dropdown lets the user
  filter books by category, using `CategoryService`.
- **Reviews**: each book has its own reviews section (view and add),
  with a star rating, comment, and optional author, handled by the
  `BookReviews.vue` component and `ReviewService`.

---

## Data persistence

Book and review data live in Pinia stores (`stores/bookstore.ts` and
`stores/reviewstore.ts`) synced with the browser's LocalStorage, under
the key `piniaState`. On first load the stores are filled with
`bookseeder.ts` and `reviewseeder.ts`; after that, any change (create
or delete a book, add a review) is saved automatically and persists
across page reloads. This is local to each browser, there is no
backend involved.

If something breaks after changing the data shape, manually delete the
`piniaState` key in the browser's LocalStorage and restart the dev
server.

---

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open in the browser:

```text
http://localhost:5173
```

---

## Formatting

Run Prettier:

```bash
npm run format
```