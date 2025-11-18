import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MovieCard} from '@/components';
import type {MovieDetail} from '@/types/Movie';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<MovieDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs: MovieDetail[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavorites(favs);
  }, []);

  if (favorites.length === 0) {
    return <p className="text-center text-slate-500 mt-8">No favorites yet.</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8" aria-label="Favorites list">
      <title>Favorites - Movie App</title>
      <meta
        name="description"
        content="Your favorite movies saved in Movie App."
      />
      <meta
        name="keywords"
        content="favorites, movies, saved movies, Movie App"
      />

      <h1 className="text-3xl font-bold mb-8 text-center">Favorites</h1>

      <section
        aria-label="Favorite movies"
        aria-live="polite"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => navigate(`/media/${movie.imdbID}`)}
          />
        ))}
      </section>
    </main>
  );
}
