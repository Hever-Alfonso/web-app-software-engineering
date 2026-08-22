# Tutorial 05 - Tarea

Enunciado: ordenar el codigo del tutorial, ya que el enunciado avisa que
se implementaron varias malas practicas de programacion a proposito.

Se encontraron 4 problemas. Cada uno se corrigio y se probo en el
navegador.

## 1. Funcion formatToCOP duplicada

La funcion que formatea el precio a pesos colombianos estaba escrita
completa, dos veces, una en BooksIndexView.vue y otra en
BooksShowView.vue. Es el mismo codigo copiado y pegado. Se saco a un
archivo nuevo, src/utils/formatCurrency.ts, y ambas vistas ahora la
importan de ahi.

Antes (en BooksIndexView.vue y tambien en BooksShowView.vue):

```typescript
function formatToCOP(price: number): string {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price).replace(/^\s*\$\s?/, '');
}
```

Despues (nuevo archivo src/utils/formatCurrency.ts):

```typescript
// Formats a price as Colombian pesos (no decimals, no currency symbol)
export function formatToCOP(price: number): string {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price).replace(/^\s*\$\s?/, '');
}
```

Y en las dos vistas, en vez de la funcion completa, queda solo el
import:

```typescript
import { formatToCOP } from '@/utils/formatCurrency.js';
```

## 2. Nombre de clase que no dice nada: OtherService

El servicio se llamaba OtherService, literal "otro servicio", un
nombre que no explica que hace. Lo unico que hace es sacar las
categorias unicas de los libros, asi que se renombro a CategoryService.

Antes (src/services/OtherService.ts):

```typescript
export default class OtherService {
  public static getUniqueBookCategories(): string[] {
    ...
  }
}
```

Despues (renombrado a src/services/CategoryService.ts):

```typescript
export default class CategoryService {
  public static getUniqueBookCategories(): string[] {
    ...
  }
}
```

Se actualizo tambien el import y el uso en BooksIndexView.vue:

Antes:
```typescript
import OtherService from '@/services/OtherService.js';
...
const selectorCategories = OtherService.getUniqueBookCategories();
```

Despues:
```typescript
import CategoryService from '@/services/CategoryService.js';
...
const selectorCategories = CategoryService.getUniqueBookCategories();
```

## 3. Metodo que nunca se usa: ReviewService.getReviews()

ReviewService tenia un metodo getReviews() que devuelve todas las
reseñas sin filtrar, pero en ningun archivo del proyecto se llega a
llamar. Solo se usan getReviewsByBookId() y createReview(). Es codigo
que no hace nada, asi que se elimino.

Antes:
```typescript
export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.bookId === bookId);
  }

  static createReview(review: Omit<ReviewInterface, 'id'>): void {
    ...
  }
}
```

Despues:
```typescript
export class ReviewService {
  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.bookId === bookId);
  }

  static createReview(review: Omit<ReviewInterface, 'id'>): void {
    ...
  }
}
```

## 4. Numero 5 repetido sin explicacion en BookReviews.vue

El numero 5 (la calificacion maxima) aparecia suelto tres veces en el
archivo: en el select de estrellas, en el limite del Math.min, y al
calcular las estrellas vacias. No tenia ningun nombre que dijera que
significaba ese 5. Se cambio por dos constantes, MAX_RATING y
MIN_RATING.

Antes:
```typescript
const form = ref({
  rating: 5,
  comment: '',
  author: '',
});

function submitReview() {
  ...
  ReviewService.createReview({
    bookId: props.bookId,
    rating: Math.min(5, Math.max(1, form.value.rating)),
    ...
  });
  form.value = { rating: 5, comment: '', author: '' };
  ...
}
```
```html
<option v-for="n in 5" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
```
```html
{{ '☆'.repeat(5 - review.rating) }}
```

Despues:
```typescript
const MAX_RATING = 5;
const MIN_RATING = 1;

const form = ref({
  rating: MAX_RATING,
  comment: '',
  author: '',
});

function submitReview() {
  ...
  ReviewService.createReview({
    bookId: props.bookId,
    rating: Math.min(MAX_RATING, Math.max(MIN_RATING, form.value.rating)),
    ...
  });
  form.value = { rating: MAX_RATING, comment: '', author: '' };
  ...
}
```
```html
<option v-for="n in MAX_RATING" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
```
```html
{{ '☆'.repeat(MAX_RATING - review.rating) }}
```

## Verificacion final

Se probo en el navegador despues de aplicar los 4 cambios:

- /books : precios formateados igual que antes, filtro por categoria
  funcionando (All Categories, Fiction, Programming, History)
- /books/1 (y otros libros) : precio formateado igual, seccion de
  reseñas visible, reseñas del seeder (Jane Doe, John Smith) se siguen
  mostrando
- Formulario de reseña: se probo crear una reseña nueva, aparece en la
  lista con su calificacion en estrellas y la fecha correcta
- No quedo ningun error en la consola del navegador ni en la terminal
  de Vite

El proyecto sigue funcionando exactamente igual que antes de la
correccion. No se agrego ninguna libreria externa, solo se reorganizo
el codigo que ya existia.