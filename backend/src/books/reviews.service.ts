import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity.js';
import { CreateReviewDto } from './dto/create-review.dto.js';

// Service holding the data access logic for reviews
@Injectable()
export class ReviewsService {
  // The repository for the Review entity is injected by TypeORM
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  // Returns every review stored in the database
  findAll(): Promise<Review[]> {
    return this.reviewsRepository.find();
  }

  // Returns only the reviews linked to the given book id
  findByBookId(bookId: number): Promise<Review[]> {
    return this.reviewsRepository.find({ where: { book: { id: bookId } } });
  }

  // Links the review to its book by id and saves it in the database
  create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { bookId, ...rest } = createReviewDto;
    const review = this.reviewsRepository.create({
      ...rest,
      book: { id: bookId },
    });
    return this.reviewsRepository.save(review);
  }
}
