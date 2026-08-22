<script setup lang="ts">
// Get books from the service layer instead of importing the raw data
import { BookService } from '@/services/BookService.js';
import CategoryService from '@/services/CategoryService.js';
import { ref, watch } from 'vue';
// Shared price formatting function, now used by both book views
import { formatToCOP } from '@/utils/formatCurrency.js';

const books = BookService.getBooks();
const filteredBooks = ref(books);

// selectors
const selectorCategories = CategoryService.getUniqueBookCategories();
const selectedCategory = ref('');

// Remove the last book using the service layer
function deleteLastBook() {
  BookService.deleteLastBook();
}

// watchers
// Re-filter the books list whenever the selected category changes
watch(selectedCategory, (newCategory) => {
  if (newCategory) {
    filteredBooks.value = books.filter((book) => book.category === newCategory);
  } else {
    filteredBooks.value = books;
  }
});
</script>

<template>
  <section>
    <div class="max-w-7xl mx-auto">
      <!-- Links to create a book and delete the last one -->
      <div class="flex justify-end gap-4 mb-6">
        <button
          @click="deleteLastBook"
          class="inline-block bg-red-600 text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Last Book
        </button>
        <RouterLink
          to="/books/create"
          class="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
          >+ Add Book</RouterLink
        >
      </div>
      <!-- Category filter dropdown -->
      <div class="flex justify-end mb-6">
        <select v-model="selectedCategory" class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300">
          <option value="">All Categories</option>
          <option v-for="category in selectorCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Loop through each filtered book and render a card -->
        <div v-for="book in filteredBooks" :key="book.id">
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200"
          >
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ book.title }}
              </h3>
              <!-- Show stock badge depending on availability -->
              <span
                v-if="book.stock > 0"
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2"
              >
                {{ book.stock }} available
              </span>
              <span v-else class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-2">
                Not available
              </span>
            </div>
            <div class="flex justify-center mb-4">
              <img
                src="https://picsum.photos/seed/picsum/536/354"
                alt="Book Cover"
                class="object-cover rounded shadow-sm w-full h-auto"
              />
            </div>
            <p class="text-gray-500 text-sm mb-3">
              <i class="fas fa-tag mr-2"></i>
              {{ book.category }}
            </p>
            <div class="bg-gray-50 rounded-lg p-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Price:</span>
                <span class="font-semibold">${{ formatToCOP(book.price) }} COP</span>
              </div>
            </div>
            <div class="flex justify-center">
              <!-- Link to the detail view for this book -->
              <RouterLink
                :to="`/books/${book.id}`"
                class="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-3 rounded transition duration-300"
              >
                More info <i class="fas fa-info-circle"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>