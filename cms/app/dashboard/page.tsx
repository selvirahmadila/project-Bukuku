'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
          Dashboard Admin Perpustakaan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kelola Buku */}
          <div
            onClick={() => router.push('/book')}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-blue-50 hover:border-blue-400 transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Kelola Daftar Buku
            </h2>
            <p className="text-sm text-gray-500">
              Tambah dan atur koleksi buku perpustakaan.
            </p>
          </div>

          {/* Kelola Peminjaman */}
          <div
            onClick={() => router.push('/loan')}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-indigo-50 hover:border-indigo-400 transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Kelola Peminjaman
            </h2>
            <p className="text-sm text-gray-500">
              Pantau dan kelola transaksi peminjaman buku.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          Login sebagai <span className="font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </div>
  );
}
