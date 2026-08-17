import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ContactView from '@/views/ContactView.vue';
// Views for the books list and single book detail
import BooksIndexView from '@/views/BooksIndexView.vue';
import BooksShowView from '@/views/BooksShowView.vue';
import BooksCreateView from '@/views/BooksCreateView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } },
    // Books list page
    { path: '/books', name: 'books', component: BooksIndexView, meta: { title: 'Books' } },
    // Book creation form
    { path: '/books/create', name: 'books.create', component: BooksCreateView, meta: { title: 'Create Book' } },
    // Single book detail page, :id is read from the URL
    { path: '/books/:id', name: 'book', component: BooksShowView, meta: { title: 'Book' } },
  ],
});

export default router;