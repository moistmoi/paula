<script>
  import { writable } from "svelte/store";
  import ImageCard from "./ImageCard.svelte";
  import { favorites } from "./store.js";

  let favoriteImages = $favorites;
  let selectedImage = null;
  const showModal = writable(false);
  const funFacts = writable("");

  // Load environment variables
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  // Function to fetch fun facts from OpenAI
  async function fetchFunFacts(imageTitle) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Tell me 3 short fun facts about ${imageTitle}`,
              },
            ],
            // max_tokens: 70,
          }),
        },
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("OpenAI API response error:", errorDetails);
        throw new Error("Failed to fetch fun facts");
      }

      const data = await response.json();
      return data.choices[0].message.content
        .trim()
        .split("\n")
        .filter((fact) => fact.trim() !== "");
    } catch (error) {
      console.error("Error in fetchFunFacts:", error);
      throw error;
    }
  }

  // Function to open the modal and fetch fun facts
  async function openModal(image) {
    selectedImage = image;
    showModal.set(true);

    try {
      const facts = await fetchFunFacts(selectedImage.title);
      funFacts.set(facts);
    } catch (error) {
      console.error("Error fetching fun facts:", error);
      funFacts.set(["Sorry, something went wrong while fetching fun facts."]);
    }
  }

  // Function to close the modal
  function closeModal() {
    showModal.set(false);
    selectedImage = null;
    funFacts.set("");
  }
</script>

<div class="min-h-screen bg-transparent p-4">
  {#if favoriteImages.length > 0}
    <div class="text-center mb-6">
      <p class="text-lg font-semibold text-gray-700">
        Click on the cards to read more fun facts about your favorite images!
      </p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {#each favoriteImages as image}
        <div
          class="card-container relative overflow-hidden"
          on:click={() => openModal(image)}
        >
          <img
            src={image.url}
            alt={image.title}
            class="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div
            class="absolute h-64 inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            <div class="text-center text-white p-4">
              <h2 class="text-xl font-semibold mb-2">{image.title}</h2>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center text-gray-700">
      <p class="text-lg">
        You have no favorited images yet. Start adding some to see them here!
      </p>
    </div>
  {/if}
</div>

{#if $showModal && selectedImage}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-blur fixed inset-0"></div>
    <div
      class="modal modal-open bg-white p-4 rounded-lg shadow-lg relative max-w-3xl mx-auto"
    >
      <div class="modal-box relative glass max-h-[650px]">
        <button
          class="btn btn-sm btn-circle absolute right-2 top-2"
          on:click={closeModal}>✕</button
        >
        <h2 class="text-[26px] font-medium text-indigo-500 mb-3">
          {selectedImage.title}
        </h2>
        <h3 class="text-xl text-neutral-800 font-semibold mb-2">Fun Facts:</h3>
        {#each $funFacts as fact}
          <p class="text-base text-neutral-800 mb-4">{fact}</p>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .card-container {
    position: relative;
    overflow: hidden; /* Ensure the hover effect does not go outside */
    border-radius: 0.5rem; /* Make sure the container has rounded corners if needed */
  }

  .card-container img {
    transition: transform 0.3s ease-in-out;
  }

  .card-container:hover img {
    transform: scale(1.05);
  }

  .glass {
    background: rgba(255, 255, 255, 0.547);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.7);
  }

  .bg-blur {
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }

  .modal {
    max-width: 100vw;
    z-index: 20;
  }
</style>
