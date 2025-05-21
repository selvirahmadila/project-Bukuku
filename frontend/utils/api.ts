export async function fetchBooks() {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  return data;
}
