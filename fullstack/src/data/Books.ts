import { Book } from "../models/Book.js"; // import the Book class from the models folder

// In-memory "database": a fixed array of Book instances used as sample data
export const books: Book[] = [
  new Book(1, "The Great Gatsby", "Fiction", 12.99, 3),
  new Book(2, "Clean Code", "Programming", 45.00, 5),
  new Book(3, "Sapiens", "History", 18.50, 2),
];