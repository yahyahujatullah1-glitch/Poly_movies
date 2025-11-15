'use client';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export interface EpisodeCardProps {
  title: string;
  episodeNumber?: number;
  link?: string;
  thumbnail?: string;
}

export function EpisodeCard({ title, episodeNumber, link, thumbnail }: EpisodeCardProps) {
  return (
    <div className="bg-card-background rounded-lg overflow-hidden hover:border-primary border border-border transition-colors">
      <div className="aspect-video bg-black relative">
        {thumbnail ? (
          <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-card-background flex items-center justify-center" />
        )}
        {link && (
          <Button
            onClick={() => window.open(link, '_blank')}
            size="sm"
            className="absolute inset-0 m-auto w-fit h-fit gap-2 bg-primary hover:bg-primary/90"
          >
            <Play className="w-4 h-4 fill-white" />
            Watch
          </Button>
        )}
      </div>
      <div className="p-4">
        {episodeNumber && (
          <p className="text-sm text-primary font-semibold mb-1">Episode {episodeNumber}</p>
        )}
        <p className="text-white font-semibold line-clamp-2">{title}</p>
      </div>
    </div>
  );
}
