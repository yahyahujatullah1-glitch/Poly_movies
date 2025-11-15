import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Menu, X, Search } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            PolyMovies
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-text-primary hover:text-primary transition">
              Home
            </Link>
            <Link href="/browse" className="text-text-primary hover:text-primary transition">
              Browse
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="/" className="block text-text-primary hover:text-primary">
              Home
            </Link>
            <Link href="/browse" className="block text-text-primary hover:text-primary">
              Browse
            </Link>
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
