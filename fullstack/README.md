# Fullstack App

MPA/SSR project built with Express, NodeJS, and TypeScript, developed
step by step as Tutorial 01 and Tutorial 02 of the Web Application
Software Engineering course.

---

## Technologies

- NodeJS 26
- Express 5
- TypeScript 7
- EJS + express-ejs-layouts
- Tailwind CSS 4

---

## Project structure

```text
fullstack/
├── src/
│   ├── assets/css/input.css       # Tailwind entry file
│   ├── controllers/
│   │   └── HomeController.ts      # controller for home/about/contact/books views
│   ├── data/
│   │   └── Books.ts               # in-memory books data
│   ├── models/
│   │   └── Book.ts                # Book class, with findById
│   ├── public/css/style.css       # Tailwind compiled CSS
│   ├── routes/
│   │   └── Routes.ts              # route definitions
│   ├── views/
│   │   ├── home/
│   │   │   ├── index.ejs
│   │   │   ├── about.ejs
│   │   │   ├── contact.ejs
│   │   │   ├── books.ejs          # books list
│   │   │   └── show.ejs           # single book detail
│   │   └── layouts/
│   │       └── app.ejs            # base layout (sidebar + header)
│   └── Index.ts                   # server entry point
├── package.json
├── tsconfig.json
├── README.md
└── W2_H.md                        # Tutorial 02 task: bug detection and fixes
```

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/about` | "About" page |
| `/contact` | "Contact" page |
| `/books` | Books list |
| `/books/:id` | Single book detail |

---

## Getting started

Install dependencies:

```bash
npm install
```

Run the server (in one terminal):

```bash
npm run dev
```

Compile and watch Tailwind CSS (in another terminal):

```bash
npm run dev:css
```

Open in the browser:

```text
http://localhost:3000
```

---

## Production build

```bash
npm run build
npm start
```