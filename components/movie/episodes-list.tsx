'use client';

import { EpisodeCard } from './episode-card';

export interface Episode {
  title: string;
  episodeNumber?: number;
  link?: string;
  thumbnail?: string;
}

export interface EpisodesListProps {
  episodes: Episode[];
  seasonTitle?: string;
}

export function EpisodesList({ episodes, seasonTitle }: EpisodesListProps) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="py-8">
        <p className="text-text-secondary">No episodes available.</p>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-4">
      {seasonTitle && <h3 className="text-xl font-bold text-white">{seasonTitle}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {episodes.map((episode, idx) => (
          <EpisodeCard key={idx} {...episode} />
        ))}
      </div>
    </div>
  );
}
