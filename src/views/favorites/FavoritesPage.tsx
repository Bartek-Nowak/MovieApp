import {useEffect, useState} from 'react';
import {MovieCard} from '@/components';
import type {MovieDetail} from '@/types/Movie';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<MovieDetail[]>([]);

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => window.location.assign(`/media/${movie.imdbID}`)}
          />
        ))}
      </div>
    </div>
  );
}
