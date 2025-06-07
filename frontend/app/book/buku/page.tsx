'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: string;
  judul: string;
  penulis: string;
}

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/book');
        if (!res.ok) throw new Error('Gagal mengambil data buku');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError('Gagal memuat daftar buku.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Daftar Buku
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Memuat daftar buku...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada buku tersedia.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="border border-gray-300 rounded-md p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-800">{book.judul}</h2>
              <p className="text-sm text-gray-600">Penulis: {book.penulis}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
