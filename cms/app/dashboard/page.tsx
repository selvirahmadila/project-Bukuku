'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Admin Dashboard - Perpustakaan Universitas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => router.push('/book')}
            className="cursor-pointer border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
          >
            <h2 className="text-lg font-medium text-gray-700 mb-2">📘 Kelola Daftar Buku</h2>
            <p className="text-sm text-gray-500">
              Lihat dan tambah koleksi buku yang tersedia di perpustakaan.
            </p>
          </div>

          <div
            onClick={() => router.push('/loan')}
            className="cursor-pointer border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
          >
            <h2 className="text-lg font-medium text-gray-700 mb-2">📦 Kelola Peminjaman</h2>
            <p className="text-sm text-gray-500">
              Tinjau dan kelola semua transaksi peminjaman buku oleh mahasiswa.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          Anda login sebagai <span className="font-medium text-gray-700">Admin</span>.
        </div>
      </div>
    </div>
  );
}
