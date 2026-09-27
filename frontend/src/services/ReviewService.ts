import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import axios from 'axios';

// Service layer that gets review data from the backend API
export class ReviewService {
  // Base URL of the reviews endpoint, built from VITE_API_BASE_URL in .env
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/reviews`;

  // Request the full list of reviews
  static async getReviews(): Promise<ReviewInterface[]> {
    const { data } = await axios.get(this.API_URL);
    return data;
  }

  // Request only the reviews that belong to a specific book
  static async getReviewsByBookId(bookId: number): Promise<ReviewInterface[]> {
    const { data } = await axios.get(`${this.API_URL}/book/${bookId}`);
    return data;
  }

  // Send a new review to the backend and return the created review
  static async createReview(review: Omit<ReviewInterface, 'id'>): Promise<ReviewInterface> {
    const { data } = await axios.post(this.API_URL, review);
    return data;
  }
}
