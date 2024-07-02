import { writable } from 'svelte/store';
import axios from 'axios';

export const images = writable([]);
export const favorites = writable([]);

const fetchImages = async () => {
  const endDate = new Date().toISOString().split('T')[0]; // Today's date
  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().split('T')[0]; // Date 2 years ago
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await axios.get(url);
    images.set(response.data);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

fetchImages();
