// DTO describing the data required to create a review
export class CreateReviewDto {
  bookId: number;
  rating: number;
  comment: string;
  author?: string;
}
