// Represents a single book entity in the catalog
export class Book {
  constructor(
    public id: number, // unique identifier for the book
    public title: string, // book title
    public category: string, // fixed: was "Category" (capital), now lowercase for consistency with the other properties
    public price: number, // book price
    public stock: number // units available in stock
  ) { }

  // Finds a book by id inside a given array of books; throws if not found
  public static findById(books: Book[], id: number): Book {
    const book = books.find(book => book.id === id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }
}