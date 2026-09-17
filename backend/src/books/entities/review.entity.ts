import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  CreateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Book } from './book.entity.js';

// Entity mapped to the "review" table in the database
@Entity()
export class Review {
  // Primary key, generated automatically by the database
  @PrimaryGeneratedColumn()
  id: number;

  // Many reviews belong to one book; deleting the book deletes its reviews
  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Relation<Book>;

  // Exposes the related book id as a plain number
  @RelationId((review: Review) => review.book)
  bookId: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  // Optional author name, stored as null when not provided
  @Column({ type: 'varchar', nullable: true })
  author: string | null;

  // Filled automatically with the creation date
  @CreateDateColumn()
  createdAt: Date;
}
