import {createContext, useContext, useState, useEffect} from 'react';
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
  const [visibleError, setVisibleError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    setVisibleError(error);

    const hideTimer = setTimeout(() => {
      setVisibleError(null);
    }, 3000);

    return () => clearTimeout(hideTimer);
  }, [error]);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <GlobalUIContext.Provider value={{loading, error, setLoading, setError}}>
      {children}

      {visibleError && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="relative px-6 py-4 bg-red-600 text-white rounded-lg shadow-lg">
            {visibleError}
          </div>
        </div>
      )}

      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40"
        >
          <div className="flex space-x-2">
            <span
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{animationDelay: '0s'}}
            ></span>
            <span
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{animationDelay: '0.2s'}}
            ></span>
            <span
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{animationDelay: '0.4s'}}
            ></span>
          </div>
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
