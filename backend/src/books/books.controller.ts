import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

// Controller for the /api/books routes
@Controller('books')
export class BooksController {
  // The service is injected by Nest through the constructor
  constructor(private readonly booksService: BooksService) {}

  // Handles GET /api/books and returns every book
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  // Handles GET /api/books/:id and returns a single book, or null
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.findOne(Number(id));
  }

  // Handles POST /api/books and creates a book from the request body
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }
}