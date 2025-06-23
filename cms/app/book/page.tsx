'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

interface Book {
  id: number;
  judul: string;
  penulis: string;
  kategori: string;
  status: string;
  coverimage: string;
}

export default function BookListPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:1220/api/admin/book');
      setBooks(res.data);
    } catch (err) {
      console.error('Gagal mengambil data buku:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => router.push('/dashboard');
  const handleLogout = () => router.push('/');

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus buku ini?')) return;
    try {
      await axios.delete(`http://localhost:1220/api/admin/book/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      alert('Gagal menghapus buku');
    }
  };

  const toggleStatus = async (book: Book) => {
    const newStatus = book.status === 'tersedia' ? 'dipinjam' : 'tersedia';
    try {
      await axios.patch(`http://localhost:1220/api/admin/book/${book.id}`, {
        status: newStatus,
      });
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      alert('Gagal mengubah status buku');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">📘 Daftar Buku</h1>
        <div className="flex gap-2">
          <Link href="/book/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm">
              ➕ Tambah Buku
            </button>
          </Link>
          <button
            onClick={handleBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm"
          >
            Kembali
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat data buku...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada buku yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px]">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition text-sm flex flex-col overflow-hidden w-full max-w-[180px]"
            >
              {/* Cover */}
              {book.coverimage && (
                <div className="w-full aspect-[2/3] bg-white">
                  <img
                    src={`http://localhost:1220${encodeURI(book.coverimage)}`}
                    alt={book.judul}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}

              {/* Info Buku */}
              <div className="px-3 pt-1 pb-2">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-1">
                  {book.judul}
                </h2>
                <p className="text-xs text-gray-600 line-clamp-1">
                  Penulis: {book.penulis}
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full ${
                    book.status === 'tersedia'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {book.status}
                </span>
              </div>

              {/* Tombol */}
              <div className="border-t px-3 py-2 flex justify-between">
                <button
                  onClick={() => toggleStatus(book)}
                  className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded"
                >
                  Status
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-[10px] bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
