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
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!book) {
    return <div className="p-6 text-center text-red-500">Buku tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">Ajukan Peminjaman</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Judul Buku</label>
            <input
              type="text"
              value={book.judul}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Penulis</label>
            <input
              type="text"
              value={book.penulis}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ajukan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
