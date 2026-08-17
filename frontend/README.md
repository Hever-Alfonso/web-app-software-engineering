# Frontend App

SPA/CSR project built with Vue.js, Vite, and TypeScript, developed step
by step as Tutorials 03 and 04 of the Web Application Software
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
│   ├── dtos/
│   │   └── CreateBookDTO.ts       # shape of the data needed to create a book
│   ├── interfaces/
│   │   └── BookInterface.ts       # shape of a book object
│   ├── router/
│   │   └── index.ts               # route definitions
│   ├── services/
│   │   └── BookService.ts         # service layer for book data access
│   ├── stores/
│   │   ├── bookstore.ts           # Pinia store holding the books state
│   │   └── bookseeder.ts          # initial book data used on first load
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── ContactView.vue
│   │   ├── BooksIndexView.vue     # books list, create and delete last book buttons
│   │   ├── BooksShowView.vue      # single book detail
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
| `/books` | Books list, with buttons to add or delete the last book |
| `/books/create` | Book creation form |
| `/books/:id` | Single book detail |

---

## Data persistence

Book data lives in a Pinia store (`stores/bookstore.ts`) synced with the
browser's LocalStorage, under the key `piniaState`. On first load the
store is filled with `stores/bookseeder.ts`; after that, any change
(create or delete a book) is saved automatically and persists across
page reloads. This is local to each browser, there is no backend
involved.

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