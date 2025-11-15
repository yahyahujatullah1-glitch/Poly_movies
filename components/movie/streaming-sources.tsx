'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export interface StreamingSource {
  server: string;
  link: string;
  quality?: string;
  type?: string;
}

export interface StreamingSourcesProps {
  sources: StreamingSource[];
  title?: string;
}

export function StreamingSources({ sources, title = 'Available Streams' }: StreamingSourcesProps) {
  if (!sources || sources.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-text-secondary">No streaming sources available.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, idx) => (
          <Button
            key={idx}
            onClick={() => window.open(source.link, '_blank')}
            className="h-auto p-4 flex flex-col items-start gap-2 bg-card-background hover:bg-primary text-white border border-border"
            variant="outline"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{source.server}</span>
              <ExternalLink className="w-4 h-4" />
            </div>
            {source.quality && (
              <span className="text-xs bg-primary/20 px-2 py-1 rounded text-primary">
                {source.quality}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
