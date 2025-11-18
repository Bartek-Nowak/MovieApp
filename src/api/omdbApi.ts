import axios from 'axios';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: apiKey,
  },
});

export default omdbApi;
