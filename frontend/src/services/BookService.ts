import type { BookInterface } from '@/interfaces/BookInterface';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';
import axios from 'axios';

// Service layer that gets book data from the backend API
export class BookService {
  // Base URL of the books endpoint, built from VITE_API_BASE_URL in .env
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/books`;

  // Request the full list of books
  public static async getBooks(): Promise<BookInterface[]> {
    const { data } = await axios.get(this.API_URL);
    return data;
  }

  // Request a single book by its id
  public static async getBookById(id: number): Promise<BookInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`);
    return data;
  }

  // Send a new book to the backend and return the created book
  public static async createBook(book: CreateBookDTO): Promise<BookInterface> {
    const { data } = await axios.post(this.API_URL, book);
    return data;
  }
}
