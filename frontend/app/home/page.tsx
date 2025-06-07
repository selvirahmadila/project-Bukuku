import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Selamat datang di Aplikasi Perpustakaan</h1>

      <div className="space-x-4 mb-10">
        <button
          onClick={() => router.push('/books')}
          className="px-5 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Daftar Buku
        </button>

        <button
          onClick={() => router.push('/riwayat')}
          className="px-5 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Riwayat
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Tentang Aplikasi</h2>
        <p className="text-gray-700">
          Aplikasi perpustakaan ini membantu mahasiswa dalam meminjam dan mengelola buku secara mudah dan efisien.
          Dengan fitur login menggunakan NPM, mahasiswa dapat mengakses daftar buku serta melihat riwayat peminjaman mereka.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact</h2>
        <p className="text-gray-700">
          Email: perpustakaan@example.com<br />
          Telepon: (021) 123-4567<br />
          Alamat: Jl. Teknokrat No.123, Bandar Lampung
        </p>
      </section>
    </div>
  );
}
