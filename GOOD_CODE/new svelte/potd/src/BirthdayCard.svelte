<script>
  import { writable } from 'svelte/store';
  import { images } from './store.js';

  let selectedDate = '';
  let imageToShow = writable(null);

  // Set the minimum and maximum dates to cover the entire range from 2022 to 2024
  let minDate = '2022-06-20'; 
  let maxDate = new Date().toISOString().split('T')[0]; // Present day

  function fetchImageForDate() {
    images.subscribe(allImages => {
      const foundImage = allImages.find(img => img.date === selectedDate);
      imageToShow.set(foundImage);
    });
  }

  // Function to determine the appropriate media type from the URL
  function getMediaType(url) {
    const urlWithoutParams = url.split("?")[0];
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"];
    const isImageUrl = imageExtensions.some((extension) =>
      urlWithoutParams.endsWith(extension),
    );
    const isYouTubeUrl =
      url.includes("youtube.com") || url.includes("youtu.be");

    if (isImageUrl) {
      return { type: "image", src: url };
    } else if (isYouTubeUrl) {
      let embedUrl = url;
      if (url.includes("watch?v=")) {
        embedUrl = `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`;
      } else if (url.includes("youtu.be")) {
        embedUrl = `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
      }
      return { type: "video", src: embedUrl };
    } else {
      return { type: "image", src: "src/assets/svelte.png" }; // default fallback image
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4">
  <h1 class="text-2xl font-bold mb-4">Select a Date</h1>
  <p class="text-lg font-semibold text-gray-700 mb-2">Tap the field and choose the desired time to see the pictures</p>
  <input type="date" bind:value={selectedDate} class="input input-bordered w-full max-w-lg text-xl p-3" min={minDate} max={maxDate} />
  <button class="btn btn-primary mt-4" on:click={fetchImageForDate}>
    Show Picture
  </button>

  {#if $imageToShow}
    <div class="hero min-h-screen bg-base-200 mt-8">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <!-- Adjust the max-width and width for larger display -->
        {#if getMediaType($imageToShow.url).type === "image"}
          <img src={getMediaType($imageToShow.url).src} alt="APOD Image" class="media-box rounded-lg shadow-2xl" />
        {:else if getMediaType($imageToShow.url).type === "video"}
          <iframe src={getMediaType($imageToShow.url).src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="media-box h-[600px] rounded-lg shadow-2xl"></iframe>
        {/if}
        <div>
          <h1 class="text-5xl font-semibold" style="color: #6366f1;">{$imageToShow.title}</h1>

          <p class="py-8">{$imageToShow.explanation}</p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .media-box {
    max-width: 800px;
    width: 100%;
    height: 600px; /* Ensure a consistent height for both image and video */
  }

  .btn-primary {
    background-color: #818cf8;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.3s;
  }

  .btn-primary:hover {
    background-color: #6366f1;
    transform: scale(1.05);
  }

  .btn-primary:active {
    background-color: #4f46e5;
    transform: scale(0.95);
  }
</style>
