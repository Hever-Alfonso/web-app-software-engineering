import type { BookInterface } from '@/interfaces/BookInterface.js';

// Shape of the data needed to create a book (no id, it's assigned by the service)
export type CreateBookDTO = Omit<BookInterface, 'id'>;