import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { Review } from './entities/review.entity.js';

// Controller for the /api/reviews routes
@Controller('reviews')
export class ReviewsController {
  // The service is injected by Nest through the constructor
  constructor(private readonly reviewsService: ReviewsService) {}

  // Handles GET /api/reviews and returns every review
  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  // Handles GET /api/reviews/book/:bookId and returns the reviews of one book
  @Get('book/:bookId')
  findByBookId(@Param('bookId') bookId: string): Promise<Review[]> {
    return this.reviewsService.findByBookId(Number(bookId));
  }

  // Handles POST /api/reviews and creates a review from the request body
  @Post()
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }
}
