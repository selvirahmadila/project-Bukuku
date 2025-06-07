'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, year: parseInt(year) }),
    });

    if (res.ok) {
      router.push('/book'); // kembali ke daftar buku
    } else {
      alert('Gagal menambahkan buku');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Tambah Buku Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Judul Buku</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Penulis</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tahun Terbit</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded w-full"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
