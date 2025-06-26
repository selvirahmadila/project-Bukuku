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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-10">
        📖 Koleksi Buku Perpustakaan
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Memuat daftar buku...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => {
            const isAvailable = book.status.toLowerCase() === 'tersedia' || book.status.toLowerCase() === 'available';
            const statusLabel = isAvailable ? 'Tersedia' : 'Dipinjam';
            const statusStyle = isAvailable
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-100 text-rose-700';

            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
              >
                {book.coverimage ? (
                  <img
                    src={`http://localhost:1220${book.coverimage}`}
                    alt={book.judul}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                    Tidak ada gambar
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-800">{book.judul}</h2>
                    <p className="text-sm text-gray-600 mt-1">Penulis: {book.penulis}</p>
                    <p className="text-sm text-gray-600">Kategori: {book.kategori}</p>
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
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm transition"
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
