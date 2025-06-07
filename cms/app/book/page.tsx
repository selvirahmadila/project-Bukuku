// cms/book/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Book {
  id: number;
  judul: string;
  penulis: string;
  kategori: string | null;
  coverimage: string | null;
  status: string;
}

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:1220/api/book');
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error('Gagal mengambil data buku', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Daftar Buku</h1>
        <div className="flex gap-4">
          <Link href="/book/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Tambah Buku
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>Tidak ada buku.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white shadow-md rounded-xl p-4">
              {book.coverimage && (
                <img
                  src={`http://localhost:1220/uploads/${book.coverimage}`}
                  alt={book.judul}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-semibold mt-2">{book.judul}</h2>
              <p className="text-gray-600">Penulis: {book.penulis}</p>
              <p className="text-gray-600">Kategori: {book.kategori || '-'}</p>
              <p className="text-gray-600">Status: {book.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
