// DTO describing the data required to create a book
export class CreateBookDto {
  title: string;
  category: string;
  price: number;
  stock: number;
}