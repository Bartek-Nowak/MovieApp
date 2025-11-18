import {Routes, Route} from 'react-router-dom';
import {FavoritesPage, Home, MovieDetail} from '@/views';
import {Navbar} from '@/components';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}
