import { Router } from 'express'; // Express's Router type, used to define route handlers
import { HomeController } from '../controllers/HomeController.js'; // controller holding the route handler methods

export default class Routes { // groups all route setup in one place
  static initializeRoutes(): Router { // builds and returns the configured router
    const router = Router(); // create a new Express router

    router.get('/', HomeController.index); // map "/" to the home controller
    router.get('/about', HomeController.about); // map "/about" to the about page
    router.get('/contact', HomeController.contact); // map "/contact" to the contact page
    router.get('/books', HomeController.mainPoint); // fixed: renamed from "/main-point" to match the resource it lists
    router.get('/books/:id', HomeController.show); // map "/books/:id" to a single book's detail, added in Tutorial 02

    return router; // hand the configured router back to Index.ts
  }
}