const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getProviders() {
  const res = await fetch(`${API_BASE_URL}/api/providers`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch providers");
  return res.json();
}

export async function getCatalog(provider: string) {
  const res = await fetch(`${API_BASE_URL}/api/${provider}/catalog`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch catalog for ${provider}`);
  return res.json();
}

export async function getPosts(provider: string, filter: string, page: number = 1) {
  const params = new URLSearchParams({
    filter,
    page: page.toString(),
  });
  const res = await fetch(`${API_BASE_URL}/api/${provider}/posts?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Failed to fetch posts from ${provider}`);
  return res.json();
}

export async function searchPosts(provider: string, query: string, page: number = 1) {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
  });
  const res = await fetch(`${API_BASE_URL}/api/${provider}/search?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Failed to search in ${provider}`);
  return res.json();
}

export async function getMeta(provider: string, link: string) {
  const params = new URLSearchParams({ link });
  const res = await fetch(`${API_BASE_URL}/api/${provider}/meta?${params}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch metadata from ${provider}`);
  return res.json();
}

export async function getStream(provider: string, link: string, type: string = "movie") {
  const params = new URLSearchParams({ link, type });
  const res = await fetch(`${API_BASE_URL}/api/${provider}/stream?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Failed to fetch streams from ${provider}`);
  return res.json();
}

export async function getEpisodes(provider: string, url: string) {
  const params = new URLSearchParams({ url });
  const res = await fetch(`${API_BASE_URL}/api/${provider}/episodes?${params}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch episodes from ${provider}`);
  return res.json();
}
