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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl shadow-md w-full max-w-md p-6 md:p-8 space-y-4"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          📘 Tambah Buku Baru
        </h1>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Masukkan judul buku"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Penulis</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            placeholder="Masukkan nama penulis"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Kategori</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            placeholder="Masukkan kategori"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Status</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Cover Buku</label>
          <label
            htmlFor="coverUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-500 text-sm cursor-pointer px-4 py-6 rounded-lg transition"
          >
            {cover ? (
              <span className="text-gray-800 font-medium">{cover.name}</span>
            ) : (
              <span>Klik untuk memilih file gambar</span>
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {loading ? 'Menyimpan...' : 'Simpan Buku'}
        </button>
      </form>
    </div>
  );
}
