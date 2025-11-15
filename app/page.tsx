import { FeaturedSection } from "@/components/home/featured-section";
import { ProvidersClient } from "@/components/providers-client";
import { CatalogClient } from "@/components/catalog-client";

const FEATURED_MOVIE = {
  title: "Discover Amazing Content",
  image: "/featured-movie-background.jpg",
  poster: "/featured-movie-poster.jpg",
  link: "#",
  provider: "demo",
  description:
    "Browse thousands of movies and series from multiple providers. Stream directly in your browser with seamless integration.",
};

export const metadata = {
  title: "PolyMovies - Streaming Hub",
  description: "Watch movies and series from multiple providers",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <FeaturedSection movie={FEATURED_MOVIE} />

        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary">Available Providers</h2>
          <ProvidersClient />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary">Browse Content</h2>
          <CatalogClient provider="Joya9tv" />
        </section>
      </div>
    </main>
  );
}
