import type { BookInterface } from '@/interfaces/BookInterface';
import { useBookStore } from '@/stores/bookstore.js';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';

// Service layer that centralizes access to book data
export class BookService {
  // Return the full list of books
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  // Find a single book by its id, or undefined if not found
  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  // Add a new book to the store, assigning the next id
  static createBook(book: CreateBookDTO): void {
    const id = useBookStore().books.length + 1;
    useBookStore().books.push({ id, ...book });
  }

  // Remove the last book in the store, if any
  static deleteLastBook(): void {
    useBookStore().books.pop();
  }
}