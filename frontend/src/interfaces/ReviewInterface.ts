// Defines the shape of a review object used across the app
export interface ReviewInterface {
    id: number;
    bookId: number;
    rating: number;
    comment: string;
    author?: string;
    createdAt?: string;
  }