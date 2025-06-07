'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BookListPage() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/book');
      const data = await res.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Buku</h1>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{book.judul}</h2>
            <p>Penulis: {book.penulis}</p>
            <Link href={`/book/${book.id}`}>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Lihat Detail</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
