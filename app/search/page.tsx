"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { searchPosts, getProviders } from "@/lib/api-client";
import { MovieCard } from "@/components/movie/movie-card";
import { Input } from "@/components/ui/input";
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

interface Provider {
  name: string;
  displayName: string;
  disabled: boolean;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [provider, setProvider] = useState("Joya9tv");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getProviders();
        setProviders(data.filter((p: Provider) => !p.disabled));
      } catch (err) {
        console.error("[v0] Error loading providers:", err);
      }
    };

    fetchProviders();
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchPosts(provider, query, 1);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      console.error("[v0] Error searching:", err);
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Search</h1>

        <form onSubmit={handleSearch} className="mb-8 space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              type="text"
              placeholder="Search for movies or series..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />

            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {providers.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-950/20 border border-red-900 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              No results found for "{query}"
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {results.map((movie) => (
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
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <p className="text-text-secondary">Enter a search query to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
