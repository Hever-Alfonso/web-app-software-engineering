import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import axios from 'axios';

// Service layer that gets review data from the backend API
export class ReviewService {
  // Base URL of the reviews endpoint in the backend
  private static readonly API_URL = 'http://localhost:3000/api/reviews';

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
