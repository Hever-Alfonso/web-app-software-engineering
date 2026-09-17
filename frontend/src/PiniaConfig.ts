import { createPinia } from 'pinia';
import { watch } from 'vue';

// Sets up Pinia and syncs its state with LocalStorage
export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();
    // LocalStorage sync disabled: data now comes from the backend API
    /*const savedState = localStorage.getItem('piniaState');

    if (savedState) {
      // Load the previously saved state
      pinia.state.value = JSON.parse(savedState);
    } else {
      // initialize the state with the seeders
      pinia.state.value = {
        book: {
          books: bookSeeder,
        },
        review: {
          reviews: reviewSeeder,
        },
      };
      // save the initial state to localStorage
      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    // watch for changes and save to localStorage
    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );*/

    return pinia;
  }
}
