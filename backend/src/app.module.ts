import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module.js';

// Root module: registers the database connection and the feature modules
@Module({
  imports: [
    // Database connection: local SQLite file handled by TypeORM
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HomeModule,
    BooksModule,
  ],
})
export class AppModule {}