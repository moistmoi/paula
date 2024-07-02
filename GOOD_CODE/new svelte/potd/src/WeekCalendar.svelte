<script>
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.css';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let calendarInput;
  let selectedWeek = { start: '', end: '' };

  onMount(() => {
    flatpickr(calendarInput, {
      mode: 'range',
      dateFormat: 'Y-m-d',
      onClose: (selectedDates) => {
        if (selectedDates.length === 2) {
          selectedWeek = {
            start: selectedDates[0],
            end: selectedDates[1],
          };
          dispatch('weekChange', { startOfWeek: selectedWeek.start, endOfWeek: selectedWeek.end });
        }
      },
    });
  });
</script>

<input type="text" bind:this={calendarInput} class="input input-bordered w-full max-w-xs" />

<style>
  .input {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
  }
</style>
