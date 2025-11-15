'use client';

export interface MovieInfoProps {
  releaseDate?: string;
  runtime?: number;
  genres?: string[];
  imdbId?: string;
  type?: 'movie' | 'tv';
}

export function MovieInfo({
  releaseDate,
  runtime,
  genres,
  imdbId,
  type,
}: MovieInfoProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-border">
      {releaseDate && (
        <div>
          <p className="text-sm text-text-secondary mb-1">Release Date</p>
          <p className="font-semibold text-white">{releaseDate}</p>
        </div>
      )}
      {runtime && (
        <div>
          <p className="text-sm text-text-secondary mb-1">Runtime</p>
          <p className="font-semibold text-white">{runtime} min</p>
        </div>
      )}
      {type && (
        <div>
          <p className="text-sm text-text-secondary mb-1">Type</p>
          <p className="font-semibold text-white">{type === 'tv' ? 'TV Series' : 'Movie'}</p>
        </div>
      )}
      {imdbId && (
        <div>
          <p className="text-sm text-text-secondary mb-1">IMDB ID</p>
          <a
            href={`https://imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            {imdbId}
          </a>
        </div>
      )}
      {genres && genres.length > 0 && (
        <div className="col-span-2 md:col-span-4">
          <p className="text-sm text-text-secondary mb-2">Genres</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-card-background rounded-full text-sm text-white"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
