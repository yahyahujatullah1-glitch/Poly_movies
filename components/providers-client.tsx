"use client";

import { useEffect, useState } from "react";
import { getProviders } from "@/lib/api-client";

interface Provider {
  name: string;
  displayName: string;
  icon: string;
  disabled: boolean;
}

export function ProvidersClient() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProviders()
      .then((data) => {
        setProviders(data.filter((p: Provider) => !p.disabled));
        setLoading(false);
      })
      .catch((err) => {
        console.error("[v0] Error loading providers:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Loading providers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-950/20 rounded-lg p-4">
        <p className="text-red-400">Error: {error}</p>
        <p className="text-sm text-text-secondary mt-2">
          Make sure the Express backend is running on http://localhost:3001
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {providers.map((provider) => (
        <div key={provider.name} className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center border border-border hover:border-primary transition-colors cursor-pointer">
            <img
              src={provider.icon || "/placeholder.svg"}
              alt={provider.displayName}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.currentTarget.src = "/provider-icon.jpg";
              }}
            />
          </div>
          <p className="text-xs text-center text-text-secondary truncate w-full px-1">
            {provider.displayName}
          </p>
        </div>
      ))}
    </div>
  );
}
