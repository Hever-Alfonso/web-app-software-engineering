import { BookService } from './BookService.js';

// Provides category-related utility data derived from the books list
export default class CategoryService {
  // Return the list of unique book categories, used to populate the filter dropdown
  public static getUniqueBookCategories(): string[] {
    const books = BookService.getBooks();
    const categories = books.map((book) => book.category);
    const uniqueCategories = new Set(categories);
    return Array.from(uniqueCategories);
  }
}