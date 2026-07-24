import { Router } from 'express';
import { HomeController } from '../controllers/HomeController.js';

export default class Routes {
  static initializeRoutes(): Router {
    const router = Router(); // create a new Express router

    router.get('/', HomeController.index); // map "/" to the home controller
    router.get('/about', HomeController.about); // map "/about" to the about page
    router.get('/contact', HomeController.contact); // map "/contact" to the contact page

    return router;
  }
}