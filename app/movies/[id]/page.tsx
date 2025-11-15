"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from 'next/navigation';
import { getMeta, getStream, getEpisodes } from "@/lib/api-client";
import { MovieHero } from "@/components/movie/movie-hero";
import { MovieInfo } from "@/components/movie/movie-info";
import { MovieDescription } from "@/components/movie/movie-description";
import { StreamingSources } from "@/components/movie/streaming-sources";
import { SeasonSelector } from "@/components/movie/season-selector";
import { EpisodesList } from "@/components/movie/episodes-list";
import { Skeleton } from "@/components/ui/skeleton";

interface LinkItem {
  title: string;
  link?: string;
  episodesLink?: string;
  directLinks?: Array<{
    link: string;
    title: string;
    type: string;
  }>;
  quality?: string;
}

interface StreamData {
  server: string;
  link: string;
  type: string;
  quality?: string;
}

interface MovieData {
  title: string;
  description: string;
  image: string;
  poster: string;
  imdbId?: string;
  type: string;
  year?: number;
  rating?: string;
  duration?: string;
  genres?: string[];
  director?: string[];
  writers?: string[];
  cast?: string[];
  linkList?: LinkItem[];
}

function MovieDetailContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const link = searchParams.get("link");
  const idParam = params.id as string;

  const [provider, encodedLink] = idParam.split("-", 2);
  const actualLink = decodeURIComponent(link || encodedLink || "");

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<LinkItem | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!actualLink) {
          throw new Error("No link provided");
        }

        const [metaData, streamData] = await Promise.all([
          getMeta(provider, actualLink),
          getStream(provider, actualLink, "movie"),
        ]);

        setMovie(metaData);
        setStreams(streamData);

        if (metaData.linkList && metaData.linkList.length > 0) {
          setSelectedSeason(metaData.linkList[0]);
        }

        setError(null);
      } catch (err) {
        console.error("[v0] Error loading movie:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [provider, actualLink]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!selectedSeason?.episodesLink || !provider) return;

      try {
        const data = await getEpisodes(provider, selectedSeason.episodesLink);
        setEpisodes(data);
      } catch (err) {
        console.error("[v0] Error loading episodes:", err);
      }
    };

    fetchEpisodes();
  }, [selectedSeason, provider]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-950/20 border border-red-900 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Movie</h1>
            <p className="text-red-300">{error || "Movie not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <MovieHero movie={movie} />
        <MovieInfo movie={movie} />
        <MovieDescription movie={movie} />

        {streams.length > 0 && <StreamingSources streams={streams} />}

        {movie.linkList && movie.linkList.length > 0 && (
          <div className="space-y-6">
            <SeasonSelector
              seasons={movie.linkList}
              selectedSeason={selectedSeason}
              onSelectSeason={setSelectedSeason}
            />

            {episodes.length > 0 && (
              <EpisodesList
                episodes={episodes}
                provider={provider}
                season={selectedSeason?.title || ""}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MovieDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-center text-text-secondary">Loading...</p>
          </div>
        </div>
      }
    >
      <MovieDetailContent />
    </Suspense>
  );
}
