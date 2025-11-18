import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GlobalUIProvider } from "@/context/GlobalUIContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalUIProvider>
      <App />
    </GlobalUIProvider>
  </StrictMode>
);

