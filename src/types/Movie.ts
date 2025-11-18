export interface Movie {
  Title?: string;
  Poster?: string;
  Year?: string | number;
  imdbID?: string;
  Type: string;
}

export interface MovieSearchFormProps {
  onResults: (results: Movie[]) => void;
}