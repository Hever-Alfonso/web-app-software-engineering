# Tarea Tutorial 02 - Deteccion y correccion de errores

Enunciado: detectar los mas de 10 errores introducidos en el codigo del
Tutorial 02, y proponer una version mejorada simple (sin librerias ni
modulos externos, solo organizando mejor el codigo).

Se encontraron 11 errores. Cada uno se corrigio y se probo corriendo la
aplicacion.

## 1. Propiedad Category en mayuscula (Book.ts)

El modelo tenia la propiedad como "Category", con mayuscula. Las demas
propiedades (id, title, price, stock) estan en minuscula. Se corrigio
para que todas sigan el mismo formato.

Antes:
```typescript
public Category: string,
```

Despues:
```typescript
public category: string,
```

## 2. book.Category en show.ejs

La tabla de informacion del libro usaba "book.Category" (mayuscula), que
ya no coincide con el modelo. Mostraba "undefined" en pantalla.

Antes:
```html
<span class="font-medium"><%= book.Category %></span>
```

Despues:
```html
<span class="font-medium"><%= book.category %></span>
```

## 3. Import con la ruta mal escrita (HomeController.ts)

El archivo de datos se llama "Books.ts" (con B mayuscula), pero el
import decia "books.js" (minuscula). En Windows funciona porque el
sistema de archivos no distingue mayusculas de minusculas, pero en Mac
o Linux si distingue, y el servidor no arranca. Se probo en un sistema
que si distingue mayusculas y efectivamente fallaba.

Antes:
```typescript
import { books } from '../data/books.js';
```

Despues:
```typescript
import { books } from '../data/Books.js';
```

## 4. Nombre de metodo inconsistente: Main_Point

El metodo se llamaba "Main_Point", con mayuscula y guion bajo. Los
demas metodos (index, about, contact) usan camelCase.

Antes:
```typescript
static Main_Point(req: Request, res: any) {
```

Despues:
```typescript
static mainPoint(req: Request, res: Response): void {
```

## 5. Tipos "any" en vez de Request/Response

Los metodos "Main_Point" y "show" usaban "any" para req y res, en vez
de los tipos que usan los demas metodos.

Antes:
```typescript
static Main_Point(req: Request, res: any) { ... }
static show(req: any, res: any) { ... }
```

Despues:
```typescript
static mainPoint(req: Request, res: Response): void { ... }
static show(req: Request, res: Response): void { ... }
```

## 6. Referencia rota en Routes.ts

Al renombrar el metodo, la ruta seguia apuntando al nombre viejo. Esto
rompe la compilacion.

Antes:
```typescript
router.get('/main-point', HomeController.Main_Point);
```

Despues:
```typescript
router.get('/books', HomeController.mainPoint);
```

## 7. Nombre de ruta poco claro: /main-point

La ruta que lista los libros se llamaba "/main-point", un nombre que no
dice nada de lo que hace. La ruta de detalle, justo debajo, si usa el
nombre del recurso ("/books/:id"). Se cambio para que ambas usen
"books".

Antes:
```typescript
router.get('/main-point', HomeController.mainPoint);
```
```html
<a href="/main-point"> ... </a>
```

Despues:
```typescript
router.get('/books', HomeController.mainPoint);
```
```html
<a href="/books"> ... </a>
```

## 8. Sin manejo de libro no encontrado

Book.findById lanza un error si el id no existe, pero nada lo
capturaba. Una URL como /books/99 tumbaba el servidor.

Antes:
```typescript
static show(req: any, res: any) {
  const book = Book.findById(books, parseInt(req.params.id));
  res.render('home/show', { book: book })
}
```

Despues:
```typescript
static show(req: Request, res: Response): void {
  const id = parseInt(String(req.params.id), 10);

  if (isNaN(id)) {
    res.status(400).send('Invalid book id');
    return;
  }

  try {
    const book = Book.findById(books, id);
    res.render('home/show', { book: book });
  } catch {
    res.status(404).send('Book not found');
  }
}
```

## 9. Sin validacion de id no numerico

parseInt(req.params.id) no revisaba si el resultado era un numero. Con
una URL como /books/abc, parseInt devuelve NaN y el programa fallaba
igual que en el error anterior. La correccion esta en el mismo bloque
de codigo del error 8, con el if (isNaN(id)).

## 10. Contrato distinto entre metodos del controlador

index, about y contact envian sus datos envueltos en
{ viewData: viewData }. mainPoint los enviaba sin envolver, lo que
obligaba a la vista a leer los datos de otra forma distinta al resto de
paginas.

Antes:
```typescript
res.render('home/books', viewData);
```
```html
<% books.forEach(book => { %>
```

Despues:
```typescript
res.render('home/books', { viewData: viewData });
```
```html
<% viewData.books.forEach(book => { %>
```

## 11. Comentario desactualizado en books.ejs

El comentario del encabezado seguia mencionando
"HomeController.Main_Point" despues de que el metodo se renombro a
"mainPoint".

Antes:
```html
<!-- lists all books passed from HomeController.Main_Point -->
```

Despues:
```html
<!-- lists all books passed from HomeController.mainPoint -->
```

## Verificacion final

Se corrio la aplicacion despues de aplicar los 11 cambios:

- GET / : 200
- GET /about : 200
- GET /contact : 200
- GET /books : 200, categorias correctas
- GET /books/1 : 200, detalle correcto
- GET /books/99 (id que no existe) : 404, sin caerse
- GET /books/abc (id invalido) : 400, sin caerse
- GET /main-point (ruta vieja) : 404, ya no existe
- npx tsc --noEmit : sin errores

El proyecto sigue funcionando igual que antes de la correccion. No se
uso ninguna libreria ni modulo externo, solo se reorganizo y corrigio el
codigo que ya existia.