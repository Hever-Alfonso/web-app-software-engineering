import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity.js';

// Entity mapped to the "book" table in the database
@Entity()
export class Book {
  // Primary key, generated automatically by the database
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  // Correction: the guía uses a plain @Column() here, which TypeORM maps
  // to an integer in SQLite and truncates decimal prices (12.99 -> 12).
  // Declared as a real column so decimals are stored correctly.
  // https://typeorm.io/entities#column-types-for-sqlite-and-better-sqlite3
  @Column('real')
  price: number;

  @Column()
  stock: number;

  // One book has many reviews (inverse side of Review.book)
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
