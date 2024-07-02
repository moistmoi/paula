<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let months = ['January', 'February', 'March', 'April', 'May'];
  let activeMonth = 'January';

  function selectMonth(month) {
    activeMonth = month;
    dispatch('monthChange', { month });
  }

  // Dispatch the initial active month
  $: selectMonth(activeMonth);
</script>

<div class="pagination">
  {#each months as month}
    <button 
      class:active={month === activeMonth}
      on:click={() => selectMonth(month)}
      class="glass-button"
    >
      {month}
    </button>
  {/each}
</div>

<style>
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  .glass-button {
    padding: 8px 18px;
    margin: 0 5px;
    background: rgba(255, 255, 255, 0.547);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    color: inherit;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  }
  .glass-button:hover {
    background-color: rgba(124, 126, 255, 0.308); /* Slightly lighter glass effect on hover */
  }
  .glass-button.active {
    background-color: #a5b4fc;
    color: #eef2ff;
  }
</style>
