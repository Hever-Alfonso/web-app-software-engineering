import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

// Service holding the data access logic for books
@Injectable()
export class BooksService {
  // The repository for the Book entity is injected by TypeORM
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // Returns every book stored in the database
  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  // Returns the book matching the given id, or null if there is none
  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOneBy({ id });
  }

  // Builds a book from the DTO and saves it in the database
  create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }
}