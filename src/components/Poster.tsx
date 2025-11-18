interface PosterProps {
  src?: string;
  title?: string;
  className?: string;
}

export default function Poster({ src, title, className }: PosterProps) {
  const poster =
    src && src !== "N/A"
      ? src
      : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='50%' font-size='24' text-anchor='middle' fill='%239ca3af' font-family='Arial' dy='.3em'>No poster</text></svg>";

  return (
    <img
      src={poster}
      alt={title ? `${title} poster` : "No poster"}
      className={className}
      loading="lazy"
    />
  );
}
