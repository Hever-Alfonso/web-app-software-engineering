import { Module } from '@nestjs/common';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity.js';

// Feature module: groups the controller, service and entity for books
@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}