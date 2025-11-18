import {Routes, Route} from 'react-router-dom';
import {Home} from '@/views';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

