<script>
    import { onMount } from 'svelte';
    import { images } from './store.js';
  
    let randomImage = {};
  
    onMount(() => {
      images.subscribe(items => {
        if (items.length > 0) {
          randomImage = items[Math.floor(Math.random() * items.length)];
        }
      });
    });
  </script>
  
  <div class="hero min-h-screen" style="background-image: url({randomImage.url});">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="text-center hero-content text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">
          Astronomy Picture of the Day
        </h1>
        <p class="mb-5">
          Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer. Explore the beauty of the universe with new images every day.
        </p>
      </div>
    </div>
  </div>
  
  <style>
    /* Additional styles if needed */
  </style>
  