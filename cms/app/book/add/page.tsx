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
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-md rounded-xl p-8 w-full max-w-xl"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Tambah Buku Baru
        </h1>

        {/* Input Judul */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Input Penulis */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
          <input
            type="text"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Input Kategori */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Input Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select>
        </div>

        {/* Upload Cover */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Buku</label>
          <label
            htmlFor="coverUpload"
            className="flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm cursor-pointer px-4 py-6 rounded-lg w-full text-center transition"
          >
            {cover ? (
              <span className="font-medium">{cover.name}</span>
            ) : (
              <span>Klik untuk pilih file gambar</span>
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

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Menyimpan...' : 'Simpan Buku'}
        </button>
      </form>
    </div>
  );
}
