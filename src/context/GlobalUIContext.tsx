import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';

type GlobalUIContextType = {
  loading: boolean;
  error: string | null;
  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
};

const GlobalUIContext = createContext<GlobalUIContextType | undefined>(
  undefined
);

export function GlobalUIProvider({children}: {children: ReactNode}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <GlobalUIContext.Provider value={{loading, error, setLoading, setError}}>
      {children}

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg z-50"
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40"
        >
          <div className="bg-white px-6 py-4 rounded-lg shadow">Loading...</div>
        </div>
      )}
    </GlobalUIContext.Provider>
  );
}

export function useGlobalUI() {
  const context = useContext(GlobalUIContext);
  if (!context)
    throw new Error('useGlobalUI must be used inside GlobalUIProvider');
  return context;
}
