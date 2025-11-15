"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCatalog, getPosts } from "@/lib/api-client";
import { MovieCard } from "./movie/movie-card";
import { Skeleton } from "@/components/ui/skeleton";

interface CatalogItem {
  title: string;
  filter: string;
}

interface Post {
  title: string;
  image: string;
  link: string;
  imdbid?: string;
  type?: string;
}

interface CatalogClientProps {
  provider: string;
}

export function CatalogClient({ provider }: CatalogClientProps) {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [postsMap, setPostsMap] = useState<Record<string, Post[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catalogData = await getCatalog(provider);
        setCatalog(catalogData.catalog || []);

        // Fetch posts for first 3 catalog items
        const postsData: Record<string, Post[]> = {};
        for (let i = 0; i < Math.min(3, catalogData.catalog?.length || 0); i++) {
          const item = catalogData.catalog[i];
          const posts = await getPosts(provider, item.filter, 1);
          postsData[item.filter] = posts.slice(0, 6);
        }
        setPostsMap(postsData);
        setLoading(false);
      } catch (err) {
        console.error("[v0] Error loading catalog:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchData();
  }, [provider]);

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <Skeleton key={j} className="aspect-[2/3]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-950/20 rounded-lg p-4">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {catalog.slice(0, 3).map((item) => (
        <div key={item.filter}>
          <h2 className="text-2xl font-bold mb-4 text-text-primary">{item.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {postsMap[item.filter]?.map((post) => (
              <MovieCard
                key={post.link}
                movie={{
                  title: post.title,
                  image: post.image,
                  link: post.link,
                  provider,
                }}
              />
            ))}
          </div>
          <Link
            href={`/browse?provider=${provider}&filter=${encodeURIComponent(item.filter)}`}
            className="inline-block mt-4 text-primary hover:underline"
          >
            View All →
          </Link>
        </div>
      ))}
    </div>
  );
}
