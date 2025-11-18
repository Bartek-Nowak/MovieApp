# Movie App

A React application for searching and viewing movies using the OMDb API.
Built with **Vite**, **TypeScript**, **Tailwind CSS**, and **Axios**.
Supports infinite scroll, filters by year and type, and allows marking movies as favorites.

## Features

- Search for movies and series by title
- Infinite scroll for search results
- Filter results by year and type (movie/series/episode)
- View detailed information about a movie
- Add/remove movies to favorites (stored in `localStorage`)
- Responsive design with Tailwind CSS
- Type-safe code with TypeScript

---

## Dependencies

- **React** – UI library
- **Vite** – Build tool for fast development
- **TypeScript** – Type safety and better developer experience
- **Tailwind CSS** – Utility-first styling
- **Axios** – API requests
- **React Router** – Routing
- **Heroicons** – Icons
- **Vitest & Testing Library** – Unit and integration tests

---

## Setup

1. Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

2. Add your OMDb API key in .env.local:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

3. Install dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

## Testing

Run all tests with:

```bash
npm run test
```

- Uses Vitest and React Testing Library

- Includes tests for pages, components, context, and API service

- Mocks API requests for consistent test results

## Project Structure (simplified)

```bash
src/
├─ api/          # API services (OMDb)
├─ components/   # Reusable UI components
├─ context/      # React context (MovieProvider, GlobalUIProvider)
├─ views/        # Page-level components (Home, MovieDetail, FavoritesPage)
├─ types/        # TypeScript interfaces/types
├─ constants/    # App constants (movie types, etc.)
├─ index.tsx     # App entry point
└─ App.tsx       # Main component + routes
```

## Notes

- Uses TypeScript for type safety across components and API calls.

- StrictMode is enabled; infinite scroll is handled to avoid double API calls.

- Favorite movies are stored in localStorage for persistence.

- CSS is fully managed with Tailwind for rapid and responsive styling.
