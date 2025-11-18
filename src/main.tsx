import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {GlobalUIProvider} from '@/context/GlobalUIContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalUIProvider>
        <App />
      </GlobalUIProvider>
    </BrowserRouter>
  </StrictMode>
);

