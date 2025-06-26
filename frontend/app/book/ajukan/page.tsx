'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Book {
  id: number;
  judul: string;
  penulis: string;
  kategori: string;
  status: string;
  coverimage: string;
}

export default function AjukanPeminjaman() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get('bookId');
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId) {
      fetch(`http://localhost:1220/api/book/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Gagal mengambil data buku:', err);
          setLoading(false);
        });
    }
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId || !bookId) return alert('Data tidak lengkap');

    const res = await fetch('http://localhost:1220/api/loan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, bookId }),
    });

    if (res.ok) {
      alert('Peminjaman berhasil!');
    } else {
      alert('Gagal meminjam buku');
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Memuat data buku...</div>;
  }

  if (!book) {
    return <div className="p-6 text-center text-red-500">Buku tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Ajukan Peminjaman
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Buku</label>
            <input
              type="text"
              value={book.judul}
              readOnly
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
            <input
              type="text"
              value={book.penulis}
              readOnly
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <input
              type="text"
              value={book.kategori}
              readOnly
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              📥 Ajukan Peminjaman
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
