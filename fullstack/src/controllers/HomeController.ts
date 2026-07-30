import type { Request, Response } from 'express';
import { books } from '../data/Books.js'; // fixed: was '../data/books.js' (lowercase), file is "Books.ts" (capital B)
import { Book } from '../models/Book.js'; // Book class, needed for Book.findById, added in Tutorial 02

export class HomeController {
  static index(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {}; // data passed to the view/layout
    viewData["title"] = "Home"; // title shown in the layout's header

    res.render('home/index', { viewData: viewData }); // render "home" view with its data
  }

  static about(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {}; // data passed to the view/layout
    viewData["title"] = "About"; // title shown in the layout's header

    res.render('home/about', { viewData: viewData }); // render "about" view with its data
  }

  static contact(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {}; // data passed to the view/layout
    viewData["title"] = "Contact"; // title shown in the layout's header

    res.render('home/contact', { viewData: viewData }); // render "contact" view with its data
  }

  // fixed: renamed from Main_Point to mainPoint (camelCase, consistent with index/about/contact)
  // fixed: typed req/res properly instead of "any", same as the other methods
  static mainPoint(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {}; // data passed to the view/layout, consistent with index/about/contact
    viewData["books"] = books; // attach the full books array

    res.render('home/books', { viewData: viewData }); // fixed: now wrapped in { viewData: viewData }, consistent with the other methods
  }

  // fixed: typed req/res properly instead of "any"
  static show(req: Request, res: Response): void {
    const id = parseInt(String(req.params.id), 10); // convert the ":id" URL param to a number

    if (isNaN(id)) {
      // fixed: reject non-numeric ids explicitly instead of letting Book.findById fail unpredictably
      res.status(400).send('Invalid book id');
      return;
    }

    try {
      const book = Book.findById(books, id); // look up the book by the id coming from the URL
      res.render('home/show', { book: book }); // render "show" view, passing that single book
    } catch {
      // fixed: Book.findById throws for unknown ids; without this, an unknown id crashed the server
      res.status(404).send('Book not found');
    }
  }
}