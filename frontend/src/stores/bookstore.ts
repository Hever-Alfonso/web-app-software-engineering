import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { BookInterface } from '@/interfaces/BookInterface.js';

// Pinia store that holds the books state
export const useBookStore = defineStore('book', () => {
  const books = ref<BookInterface[]>([]);
  return { books };
});