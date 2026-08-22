import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore.js';

// Service layer that centralizes access to review data
export class ReviewService {
  // Return only the reviews that belong to a specific book
  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.bookId === bookId);
  }

  // Add a new review to the store, assigning the next id and a timestamp
  static createReview(review: Omit<ReviewInterface, 'id'>): void {
    const store = useReviewStore();
    const nextId =
      store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id), 0) + 1 : 1;
    store.reviews.push({
      id: nextId,
      ...review,
      createdAt: new Date().toISOString(),
    });
  }
}