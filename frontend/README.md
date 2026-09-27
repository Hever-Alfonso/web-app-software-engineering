# Frontend App

SPA/CSR project built with Vue.js, Vite, and TypeScript, developed step
by step as Tutorials 03, 04, 05, 07, and 08 of the Web Application
Software Engineering course. Since Tutorial 07 it gets its data from the
Nest.js backend (`../backend`), and since Tutorial 08 it is deployed with
Docker and nginx on a Google Cloud virtual machine.

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
- Docker + nginx (deployment)

---

## Project structure

```text
frontend/
├── dist/                          # production build, versioned for Docker
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
├── .env                           # backend URL (VITE_API_BASE_URL), not versioned
├── .dockerignore                  # files left out of the Docker image
├── Dockerfile                     # nginx image that serves dist/
├── nginx.conf                     # nginx config with the SPA fallback
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
  REST API, using `BookService` and `ReviewService` (Axios). The backend
  URL comes from `VITE_API_BASE_URL` in `.env`.
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

Create `.env` in `frontend/` with the backend URL. The file is not
versioned, so it is missing after cloning:

```text
VITE_API_BASE_URL=http://localhost:3000
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

The backend must be running at the URL set in `VITE_API_BASE_URL`,
otherwise the books and reviews will not load. Vite reads `.env` when the
dev server starts or when the project is built, so restart it after
changing that file.

---

## Deployment (Tutorial 08)

The frontend and the backend run on a Google Cloud VM (Debian 13, with
Docker and Docker Compose) through `docker-compose.yml` in the repository
root: nginx serves the frontend on port 80 and the backend listens on
port 3000.

1. Set the VM external IP in `.env`:

   ```text
   VITE_API_BASE_URL=http://<VM_EXTERNAL_IP>:3000
   ```

2. Build both projects. The Docker images copy these pre-built `dist/`
   folders, so both are versioned:

   ```bash
   npm run build
   cd ../backend
   npm run build
   ```

3. In `docker-compose.yml`, `CORS_ORIGIN` must include
   `http://<VM_EXTERNAL_IP>`.
4. Commit and push the changes, including both `dist/` folders.
5. In the VM firewall, allow TCP port 3000 (rule `allow-3000`, from
   `0.0.0.0/0`). Port 80 is already open with "Allow HTTP traffic".
6. On the VM, clone the repository and start the containers:

   ```bash
   git clone https://github.com/Hever-Alfonso/web-app-software-engineering.git
   cd web-app-software-engineering
   sudo docker compose up -d
   ```

7. Open `http://<VM_EXTERNAL_IP>` in the browser (HTTP, not HTTPS).

At the end of Tutorial 08 the app was deployed on the VM `fullstack`, at
http://34.172.175.226.

---

## Formatting

Run Prettier:

```bash
npm run format
```
