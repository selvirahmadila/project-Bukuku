'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBookPage() {
  const router = useRouter();
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!judul || !penulis || !cover) {
      setError('Judul, penulis, dan cover wajib diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('penulis', penulis);
    formData.append('kategori', kategori);
    formData.append('cover', cover); // penting: nama field 'cover' harus sama dengan backend handler

    try {
      const res = await fetch('http://localhost:1220/api/admin/book', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSuccess('Buku berhasil ditambahkan!');
        setJudul('');
        setPenulis('');
        setKategori('');
        setCover(null);
        setError('');
        setTimeout(() => router.push('/book'), 1500); // arahkan ke halaman daftar buku
      } else {
        const data = await res.json();
        setError(data.message || 'Gagal menambahkan buku.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengirim data.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Tambah Buku</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul Buku"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Penulis"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Kategori (opsional)"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Simpan Buku
          </button>
        </form>
      </div>
    </div>
  );
}
