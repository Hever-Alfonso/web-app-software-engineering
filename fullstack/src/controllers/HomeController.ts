import type { Request, Response } from 'express';

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
}