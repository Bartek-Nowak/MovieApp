import {Routes, Route} from 'react-router-dom';
import {Suspense, lazy} from 'react';
import {Navbar} from '@/components';

const Home = lazy(() => import('./views/home/Home'));
const MovieDetail = lazy(() => import('./views/movie/MovieDetail'));
const FavoritesPage = lazy(() => import('./views/favorites/FavoritesPage'));

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={<div className="text-center mt-8">Loading page...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
