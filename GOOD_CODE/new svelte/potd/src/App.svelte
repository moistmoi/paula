<script>
  import Router from "svelte-spa-router";
  import Navbar from "./Navbar.svelte";
  import Overview from "./Overview.svelte";
  import LandingPage from "./LandingPage.svelte";
  import Favorites from "./Favorites.svelte";
  import BirthdayCard from "./BirthdayCard.svelte";

  const routes = {
    "/": LandingPage,
    "/overview": Overview,
    "/favorites": Favorites,
    "/birthday": BirthdayCard,
  };
</script>

<div>
  <Navbar />
  <main>
    <Router {routes} />
  </main>
</div>

<style>
  :global(body) {
    background-color: #f5f5f4;
    margin: 0;
    font-family: Arial, sans-serif;
  }

  main {
    padding: 1rem;
  }
</style>
