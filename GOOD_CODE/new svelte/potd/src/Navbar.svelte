<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let brandName = "MyBrand";
  let menuOpen = false;

  // Store to hold the current path
  const currentPath = writable('/');

  onMount(() => {
    // Update currentPath whenever the hash changes
    const updatePath = () => currentPath.set(window.location.hash || '#/');
    window.addEventListener('hashchange', updatePath);
    updatePath(); // Initial call to set the current path

    return () => {
      window.removeEventListener('hashchange', updatePath);
    };
  });
</script>

<nav class="navbar glass sticky top-0 z-50">
  <a href="#/" class:active="{$currentPath === '#/'}">Home</a>
  <a href="#/overview" class:active="{$currentPath === '#/overview'}">Overview</a>
  <a href="#/favorites" class:active="{$currentPath === '#/favorites'}">Favorites</a>
  <a href="#/birthday" class:active="{$currentPath === '#/birthday'}">Birthday Card</a>
</nav>

<style>
  .navbar {
    padding: 0.8rem;
  
    display: flex;
    justify-content: center;
    backdrop-filter: blur(10px); /* For glass effect */
    background: rgba(255, 255, 255, 0.2); /* For glass effect */
    border: 1px solid rgba(255, 255, 255, 0.3); /* For glass effect */
  }
  .navbar a {
    padding: 10px 20px;
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    background-color: #d6d3d1;
    border-radius: 25px;
    transition: background-color 0.3s, color 0.3s;
  }
  .navbar a:hover {
    background-color: #c7d2fe;
    color: white;
  }
  .navbar a.active {
    background-color: #818cf8;
    color: white;
  }
</style>
