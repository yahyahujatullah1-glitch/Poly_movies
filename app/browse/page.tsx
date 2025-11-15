"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { getPosts, getCatalog } from "@/lib/api-client";
import { MovieCard } from "@/components/movie/movie-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  title: string;
  image: string;
  link: string;
}

interface CatalogItem {
  title: string;
  filter: string;
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") || "Joya9tv";
  const initialFilter = searchParams.get("filter") || "";

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [movies, setMovies] = useState<Post[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await getCatalog(provider);
        setCatalog(data.catalog || []);
        if (!selectedFilter && data.catalog?.length > 0) {
          setSelectedFilter(data.catalog[0].filter);
        }
      } catch (err) {
        console.error("[v0] Error loading catalog:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchCatalog();
  }, [provider, selectedFilter]);

  useEffect(() => {
    if (!selectedFilter) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getPosts(provider, selectedFilter, page);
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error("[v0] Error loading movies:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [provider, selectedFilter, page]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-text-primary">Browse</h1>

          <div className="flex gap-4 items-center">
            <label className="text-text-secondary">Category:</label>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {catalog.map((item) => (
                  <SelectItem key={item.filter} value={item.filter}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/20 border border-red-900 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.link}
                  movie={{
                    title: movie.title,
                    image: movie.image,
                    link: movie.link,
                    provider,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-text-secondary">Page {page}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
