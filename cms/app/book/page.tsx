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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Daftar Buku</h1>
        <div className="flex gap-2">
          <Link href="/book/add">
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition">
              Tambah Buku
            </button>
          </Link>
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
          >
            Kembali
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data buku...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada buku yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col hover:shadow-md transition"
            >
              {book.coverimage && (
                <img
                  src={`http://localhost:1220${encodeURI(book.coverimage)}`}
                  alt={book.judul}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">{book.judul}</h2>
                <p className="text-sm text-gray-600">Penulis: {book.penulis}</p>
                <p className="text-sm text-gray-600">Kategori: {book.kategori}</p>
                <p className="text-sm mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      book.status === 'tersedia'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {book.status}
                  </span>
                </p>
              </div>
              <div className="p-4 flex justify-end gap-2 border-t">
                <button
                  onClick={() => toggleStatus(book)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition text-sm"
                >
                  Ubah Status
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded transition text-sm"
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
