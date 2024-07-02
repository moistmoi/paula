<script>
  export let image;

  // Function to determine if the URL is an image, a video, or needs a fallback
  function getMediaType(url) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'];

    const isImageUrl = imageExtensions.some(extension => url.split('?')[0].endsWith(extension));
    const isYouTubeUrl = url.includes('youtube.com') || url.includes('youtu.be');

    if (isImageUrl) {
      return { type: 'image', src: url };
    } else if (isYouTubeUrl) {
      // Convert YouTube URL to an embeddable format if necessary
      let embedUrl = url;
      if (url.includes('watch?v=')) {
        embedUrl = `https://www.youtube.com/embed/${url.split('watch?v=')[1].split('&')[0]}`;
      } else if (url.includes('youtu.be')) {
        embedUrl = `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
      }
      return { type: 'video', src: embedUrl };
    } else {
      return { type: 'image', src: 'src/assets/svelte.png' }; // default fallback image
    }
  }

  // Function to format the date in "1st January 2024" format
  function formatDate(dateString) {
    if (!dateString) return 'No Date Available';

    const date = new Date(dateString);
    const day = date.getDate();
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const j = day % 10, k = day % 100;
    let suffix = 'th';
    if (j == 1 && k != 11) suffix = 'st';
    else if (j == 2 && k != 12) suffix = 'nd';
    else if (j == 3 && k != 13) suffix = 'rd';

    return `${day}${suffix} ${month} ${year}`;
  }
</script>

<div class="card-container">
  <div class="card bg-white w-72 h-56 shadow-xl rounded-lg cursor-pointer" on:click>
    <figure class="h-2/3 overflow-hidden p-2">
      {#if getMediaType(image.url).type === 'image'}
        <img src={getMediaType(image.url).src} alt={image.title || 'Default Image'} class="w-full h-full object-cover rounded-t-lg">
      {:else if getMediaType(image.url).type === 'video'}
        <!-- Use iframe for YouTube video embedding -->
        <iframe src={getMediaType(image.url).src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full object-cover rounded-t-lg"></iframe>
      {/if}
    </figure>
    <div class="card-body p-2 h-1/3 flex flex-col justify-between">
      <h2 class="card-title text-sm text-black">
        {image.date ? formatDate(image.date) : 'No Date Available'}
      </h2>
    </div>
  </div>
</div>

<style>
  .card-container {
    perspective: 1000px;
  }
  .card {
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .card:hover {
    transform: rotateY(-10deg) scale(1.05);
  }
  .card-body {
    padding: 0.5rem;
    overflow: hidden;
  }
</style>
