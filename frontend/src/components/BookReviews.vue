<script setup lang="ts">
import { computed, ref } from 'vue';
import { ReviewService } from '@/services/ReviewService.js';

// Highest and lowest rating a review can have
const MAX_RATING = 5;
const MIN_RATING = 1;

// This component receives the id of the book whose reviews it should show
const props = defineProps<{
  bookId: number;
}>();

// Recalculates automatically whenever bookId changes
const reviews = computed(() => ReviewService.getReviewsByBookId(props.bookId));

// Holds the values of the "add review" form
const form = ref({
  rating: MAX_RATING,
  comment: '',
  author: '',
});

// Tracks whether a review is currently being submitted
const isSubmitting = ref(false);

// Validates and sends the new review to the service, then resets the form
function submitReview() {
  if (!form.value.comment.trim()) return;
  isSubmitting.value = true;
  ReviewService.createReview({
    bookId: props.bookId,
    rating: Math.min(MAX_RATING, Math.max(MIN_RATING, form.value.rating)),
    comment: form.value.comment.trim(),
    author: form.value.author.trim() || undefined,
  });
  form.value = { rating: MAX_RATING, comment: '', author: '' };
  isSubmitting.value = false;
}

// Formats an ISO date string into a short readable date
function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold text-gray-800">Reviews</h3>

    <!-- Create review form -->
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Add a review</h4>
      <form @submit.prevent="submitReview" class="space-y-3">
        <div>
          <label for="rating" class="block text-sm text-gray-600 mb-1">Rating</label>
          <select
            id="rating"
            v-model.number="form.rating"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option v-for="n in MAX_RATING" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>
        <div>
          <label for="comment" class="block text-sm text-gray-600 mb-1">Comment</label>
          <textarea
            id="comment"
            v-model="form.comment"
            rows="3"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Write your review..."
            required
          />
        </div>
        <div>
          <label for="author" class="block text-sm text-gray-600 mb-1">Your name (optional)</label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Name"
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting || !form.comment.trim()"
          class="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Post review
        </button>
      </form>
    </div>

    <!-- Review list -->
    <ul class="space-y-4">
      <li
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-medium text-gray-800">{{ review.author || 'Anonymous' }}</span>
          <!-- Filled stars for the rating, empty stars for the rest, out of MAX_RATING -->
          <span class="text-amber-500 text-sm" :title="`${review.rating} stars`">
            {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(MAX_RATING - review.rating) }}
          </span>
        </div>
        <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ review.comment }}</p>
        <p v-if="review.createdAt" class="text-gray-400 text-xs mt-2">
          {{ formatDate(review.createdAt) }}
        </p>
      </li>
      <!-- Empty state when the book has no reviews yet -->
      <li v-if="reviews.length === 0" class="text-gray-500 text-sm py-4">
        No reviews yet. Be the first to review!
      </li>
    </ul>
  </div>
</template>