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
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        📚 Koleksi Buku Perpustakaan
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Memuat daftar buku...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => {
            const isAvailable =
              book.status.toLowerCase() === 'tersedia' ||
              book.status.toLowerCase() === 'available';
            const statusLabel = isAvailable ? 'Tersedia' : 'Dipinjam';
            const statusStyle = isAvailable
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600';

            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {book.coverimage ? (
                  <img
                    src={`http://localhost:1220${book.coverimage}`}
                    alt={book.judul}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400 italic">
                    Gambar tidak tersedia
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{book.judul}</h2>
                    <p className="text-sm text-gray-500">Penulis: {book.penulis}</p>
                    <p className="text-sm text-gray-500">Kategori: {book.kategori}</p>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${statusStyle}`}
                    >
                      {statusLabel}
                    </span>

                    {isAvailable && (
                  <button
  onClick={() => router.push(`/book/ajukan?bookId=${book.id}`)}
  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
>
  ➕ Ajukan Peminjaman
</button>

                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
