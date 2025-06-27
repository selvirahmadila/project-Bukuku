'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Book {
  id: number;
  judul: string;
  penulis: string;
  kategori: string;
  status: string;
  coverimage: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:1220/api/book')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil data buku:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        📚 Daftar Buku
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => {
            const normalizedStatus = book.status.toLowerCase(); // normalize
            const isAvailable = normalizedStatus === 'tersedia' || normalizedStatus === 'available';
            const statusText = isAvailable ? 'Tersedia' : 'Dipinjam';
            const statusColor = isAvailable
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800';

            return (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
              >
                {book.coverimage && (
                  <img
                    src={`http://localhost:1220${book.coverimage}`}
                    alt={book.judul}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold">{book.judul}</h2>
                <p className="text-sm text-gray-600">Penulis: {book.penulis}</p>
                <p className="text-sm text-gray-600">Kategori: {book.kategori}</p>
                <p className={`mt-2 text-xs px-2 py-1 rounded-full ${statusColor}`}>
                  Status: {statusText}
                </p>

                {isAvailable && (
                  <button
                    onClick={() => router.push(`/book/ajukan?bookId=${book.id}`)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    ➕ Ajukan Peminjaman
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
