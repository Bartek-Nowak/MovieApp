import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {GlobalUIProvider, MovieProvider} from '@/context';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalUIProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </GlobalUIProvider>
    </BrowserRouter>
  </StrictMode>
);

