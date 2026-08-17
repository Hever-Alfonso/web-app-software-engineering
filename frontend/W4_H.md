# Tutorial 04 - Tarea

Se pidio agregar un boton en BooksIndexView.vue que borre el ultimo
libro que aparezca en la base de datos (el store de Pinia).

## Cambio 1: metodo en BookService.ts

Se agrego un metodo para borrar el ultimo libro del store.

Antes:

static createBook(book: CreateBookDTO): void {
  const id = useBookStore().books.length + 1;
  useBookStore().books.push({ id, ...book });
}

Despues:

static createBook(book: CreateBookDTO): void {
  const id = useBookStore().books.length + 1;
  useBookStore().books.push({ id, ...book });
}

static deleteLastBook(): void {
  useBookStore().books.pop();
}

## Cambio 2: boton en BooksIndexView.vue

Se agrego una funcion que llama al servicio, y un boton que la ejecuta.

Antes:

<script setup lang="ts">
import { BookService } from '@/services/BookService.js';
const books = BookService.getBooks();
</script>

Despues:

<script setup lang="ts">
import { BookService } from '@/services/BookService.js';
const books = BookService.getBooks();

function deleteLastBook() {
  BookService.deleteLastBook();
}
</script>

En el template se agrego el boton junto al link de "+ Add Book":

<button @click="deleteLastBook" class="...">
  Delete Last Book
</button>

## Verificacion

Se probo en el navegador: al hacer click en "Delete Last Book" se borra
la ultima tarjeta de la lista, y el LocalStorage (clave piniaState) se
actualiza automaticamente reflejando el libro borrado.