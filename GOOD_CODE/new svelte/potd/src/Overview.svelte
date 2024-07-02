<script>
  import { writable } from 'svelte/store';
  import { images, favorites } from './store.js';
  import ImageCard from './ImageCard.svelte';
  import WeekCalendar from './WeekCalendar.svelte';
  import WishlistIcon from "./assets/Wishlist_b.svg"; // Import the SVG file

  let filteredImagesCurrentWeek = [];
  let selectedImage = null; // Track the selected image for the modal
  const showModal = writable(false); // State to control modal visibility

  // Load environment variables
  const API_KEY = import.meta.env.VITE_API_KEY;
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  // Function to calculate the current week and the week before
  function calculateWeeks() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Calculate the distance to Monday
    const startOfWeek = new Date(now.setDate(now.getDate() - distanceToMonday)); // Start of the current week (Monday)
    const startOfPreviousWeek = new Date(startOfWeek);
    startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7); // Start of the previous week

    return {
      startOfWeek: startOfWeek.toISOString().split('T')[0],
      endOfWeek: new Date().toISOString().split('T')[0],
      startOfPreviousWeek: startOfPreviousWeek.toISOString().split('T')[0],
      endOfPreviousWeek: startOfWeek.toISOString().split('T')[0]
    };
  }

  const { startOfWeek, endOfWeek, startOfPreviousWeek, endOfPreviousWeek } = calculateWeeks();

  // Function to filter images for the current week and the week before
  function filterImages(startDate, endDate) {
    filteredImagesCurrentWeek = $images.filter((img) => {
      const imgDate = new Date(img.date);
      return imgDate >= new Date(startDate) && imgDate <= new Date(endDate);
    });
  }

  // Subscribe to images and filter initially
  images.subscribe(() => {
    filterImages(startOfWeek, endOfWeek);
  });

  // Function to fetch summary from OpenAI
  async function fetchSummary(text) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Please provide a summary of the following text in exactly two short sentences: ${text}` }],
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("OpenAI API response error:", errorDetails);
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      const summary = data.choices[0].message.content.trim();

      // Ensure the summary is two sentences long
      const sentences = summary.split('.').filter(s => s.trim().length > 0);
      return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
    } catch (error) {
      console.error("Error in fetchSummary:", error);
      throw error;
    }
  }

  // Function to open the modal
  async function openModal(image) {
    selectedImage = image;
    showModal.set(true);

    try {
      const summary = await fetchSummary(selectedImage.explanation);
      if (selectedImage) {
        selectedImage.summary = summary;
      } else {
        console.error("selectedImage is null when setting summary");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }

  // Function to close the modal
  function closeModal() {
    showModal.set(false);
    selectedImage = null;
  }

  function downloadImage(url) {
    const { type, src } = getMediaType(url);
    if (type === "image") {
      const a = document.createElement("a");
      a.href = src;
      a.download = src.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (type === "video") {
      window.open(src, "_blank");
    }
  }

  function addToFavorites(image) {
    favorites.update((items) => {
      const exists = items.find((item) => item.date === image.date);
      if (!exists) {
        return [...items, { ...image, favorite: true }];
      }
      return items;
    });
  }

  function openImageInNewTab(url) {
    window.open(url, "_blank"); // Opens the URL in a new tab
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

  // Function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  function handleWeekChange(event) {
    const { startOfWeek, endOfWeek } = event.detail;
    filterImages(startOfWeek, endOfWeek);
  }
</script>

<div class="min-h-screen bg-custom-radial p-4">
  <div class="content flex flex-wrap justify-center gap-4 mb-8">
    {#each filteredImagesCurrentWeek as image}
      <ImageCard {image} on:click={() => openModal(image)} />
    {/each}
  </div>
  <div class="flex flex-col items-center justify-center">
    <p class="text-lg font-semibold text-indigo-100 mb-2">
      Tap the field and choose the desired time to see the pictures
    </p>
    <WeekCalendar on:weekChange={handleWeekChange} />
  </div>
</div>

{#if $showModal && selectedImage}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="modal modal-open bg-base-100 p-4 rounded-lg shadow glass relative">
      <div class="modal-box relative glass max-h-[650px]">
        <button
          class="btn btn-sm btn-circle absolute right-5 top-5"
          on:click={closeModal}>✕</button>
        <p class="text-2xl text-indigo-500 font-semibold date-padding">
          {formatDate(selectedImage.date)}
        </p>
        {#if getMediaType(selectedImage.url).type === "image"}
          <div class="image-container relative">
            <img
              src={getMediaType(selectedImage.url).src}
              alt={selectedImage.title}
              class="w-full mb-4 rounded-lg image-hover"
            />

            <!-- favourites button -->
            <button
              class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-transform duration-200"
              on:click={() => addToFavorites(selectedImage)}
            >
              <img src={WishlistIcon} alt="Favorite" class="w-6 h-6 hover" />
            </button>
          </div>
        {:else if getMediaType(selectedImage.url).type === "video"}
          <iframe
            src={getMediaType(selectedImage.url).src}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-96 mb-4 rounded-lg"
          ></iframe>
        {/if}
        <h2 class="card-title text-[22px] text-neutral-700 mb-3">
          {selectedImage.title}
        </h2>
        <p class="text-sm text-neutral-800 mb-4">{selectedImage.summary ? selectedImage.summary : selectedImage.explanation}.</p>
        <div class="modal-actions flex items-center gap-2">
          <button
            class="btn bg-indigo-500 text-white hover:bg-indigo-700 active:bg-indigo-700 border border-indigo-50"
            on:click={() => downloadImage(selectedImage.url)}>Download</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .glass {
    background: rgba(255, 255, 255, 0.547);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.7);
  }

  .image-container {
    overflow: hidden;
    border-radius: 8px;
  }

  .image-hover {
    transition: transform 0.3s ease-in-out;
  }

  .image-hover:hover {
    transform: scale(1.04);
  }

  .hover {
    color: #4338ca;
    transition: transform 0.3s ease-in-out;
  }

  .date-padding {
    padding: 10px;
    padding-left: 0;
  }

  .mb-8 {
    margin-bottom: 2rem; /* Adjust the value to increase or decrease the gap */
  }
</style>
