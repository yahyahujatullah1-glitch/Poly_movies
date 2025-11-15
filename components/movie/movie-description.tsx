'use client';

export interface MovieDescriptionProps {
  synopsis?: string;
  cast?: Array<{ name: string; character?: string }>;
  director?: string[];
  writers?: string[];
}

export function MovieDescription({
  synopsis,
  cast,
  director,
  writers,
}: MovieDescriptionProps) {
  return (
    <div className="space-y-8 py-8">
      {synopsis && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-text-secondary leading-relaxed">{synopsis}</p>
        </div>
      )}

      {cast && cast.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cast.slice(0, 10).map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-full aspect-square bg-card-background rounded-lg mb-2" />
                <p className="font-semibold text-white text-sm line-clamp-1">{member.name}</p>
                {member.character && (
                  <p className="text-xs text-text-secondary line-clamp-1">as {member.character}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(director || writers) && (
        <div className="grid md:grid-cols-2 gap-6">
          {director && director.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Director</h3>
              <p className="text-text-secondary">{director.join(', ')}</p>
            </div>
          )}
          {writers && writers.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Writers</h3>
              <p className="text-text-secondary">{writers.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
