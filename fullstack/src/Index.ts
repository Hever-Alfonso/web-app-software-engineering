import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // enables layout support for EJS views
import path from 'path'; // built-in module to resolve file paths
import type { Application } from 'express';
import Routes from './routes/Routes.js';

class Index {
  static startServer(): void {
    const app: Application = express(); // create the Express app instance
    const PORT = process.env.PORT || 3000; // use env port or default to 3000

    app.set('view engine', 'ejs'); // use EJS as the templating engine
    app.set('views', path.join(process.cwd(), 'src/views')); // set the views folder
    app.use(express.static('src/public')); // serve static files (e.g. compiled CSS)
    app.use(expressLayouts); // enable EJS layouts middleware
    app.set('layout', 'layouts/app'); // set the default layout template

    app.use(Routes.initializeRoutes()); // mount the app's routes

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

Index.startServer(); // bootstrap the app