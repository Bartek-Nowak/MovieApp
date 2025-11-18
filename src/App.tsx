import {Routes, Route} from 'react-router-dom';
import {Home, MovieDetail} from '@/views';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/media/:id" element={<MovieDetail />} />
    </Routes>
  );
}

