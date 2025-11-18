import {useState, type FormEvent} from 'react';
import {useMovieContext} from '@/context/MovieContext';
import {MOVIE_TYPES} from '@/constants/movie';

export interface MovieSearchFormProps {
  onResults: (searchQuery: string, year?: string, type?: string) => void;
}

export default function MovieSearchForm({onResults}: MovieSearchFormProps) {
  const {query, setQuery} = useMovieContext();
  const [year, setYear] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    onResults(trimmedQuery, year, type);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-2"
      role="search"
      aria-label="Search movies"
    >
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All types</option>
        {MOVIE_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
}
