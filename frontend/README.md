# Frontend App

SPA/CSR project built with Vue.js, Vite, and TypeScript, developed step
by step as Tutorial 03 of the Web Application Software Engineering
course.

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
│   ├── router/
│   │   └── index.ts               # route definitions
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   └── ContactView.vue
│   ├── App.vue                    # root component (sidebar + header layout)
│   └── main.ts                    # app entry point
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