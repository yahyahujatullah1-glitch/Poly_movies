'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface Season {
  title: string;
  episodesLink?: string;
  directLinks?: Array<{ title: string; link: string; type?: string }>;
}

export interface SeasonSelectorProps {
  seasons: Season[];
  onSeasonChange: (season: Season) => void;
}

export function SeasonSelector({ seasons, onSeasonChange }: SeasonSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(seasons[0] || null);

  const handleSeasonChange = (season: Season) => {
    setSelectedSeason(season);
    onSeasonChange(season);
  };

  if (!seasons || seasons.length === 0) {
    return null;
  }

  return (
    <div className="py-8 space-y-4">
      <h2 className="text-2xl font-bold text-white">Seasons</h2>
      <div className="relative">
        <button className="w-full md:w-64 px-4 py-3 bg-card-background border border-border rounded-lg text-white flex items-center justify-between hover:border-primary transition-colors">
          {selectedSeason?.title || 'Select Season'}
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute top-full left-0 right-0 md:w-64 mt-2 bg-card-background border border-border rounded-lg overflow-hidden z-10 hidden group-hover:block shadow-lg">
          {seasons.map((season, idx) => (
            <button
              key={idx}
              onClick={() => handleSeasonChange(season)}
              className="w-full px-4 py-3 text-left text-white hover:bg-primary hover:text-black transition-colors border-b border-border last:border-b-0"
            >
              {season.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
