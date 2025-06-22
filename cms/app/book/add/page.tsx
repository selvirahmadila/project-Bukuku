'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AddBookPage() {
  const router = useRouter();
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('');
  const [status, setStatus] = useState('tersedia');
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cover) return alert('Pilih file cover terlebih dahulu');

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('penulis', penulis);
    formData.append('kategori', kategori);
    formData.append('status', status);
    formData.append('coverimage', cover);

    try {
      setLoading(true);
      await axios.post('http://localhost:1220/api/admin/book', formData);
      router.push('/book');
    } catch (error) {
      alert('Gagal menambahkan buku');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h1 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Tambah Buku Baru
        </h1>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Penulis</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Kategori</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Status</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Cover Buku</label>
          <label
            htmlFor="coverUpload"
            className="flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-500 text-sm cursor-pointer px-4 py-6 rounded-lg w-full text-center transition"
          >
            {cover ? (
              <span className="font-medium">{cover.name}</span>
            ) : (
              <span>Klik untuk memilih file</span>
            )}
            <input
              id="coverUpload"
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
              className="hidden"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-890 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          {loading ? 'Menyimpan...' : 'Simpan Buku'}
        </button>
      </form>
    </div>
  );
}
