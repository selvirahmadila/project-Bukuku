'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f9fafb] p-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Admin Panel Perpustakaan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kelola Buku */}
          <div
            onClick={() => router.push('/book')}
            className="cursor-pointer border border-gray-200 rounded-xl p-6 bg-white hover:bg-blue-50 hover:shadow transition-all"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">📚 Daftar Buku</h2>
            <p className="text-sm text-gray-600">
              Kelola daftar buku yang tersedia untuk mahasiswa.
            </p>
          </div>

          {/* Kelola Peminjaman */}
          <div
            onClick={() => router.push('/loan')}
            className="cursor-pointer border border-gray-200 rounded-xl p-6 bg-white hover:bg-purple-50 hover:shadow transition-all"
          >
            <h2 className="text-xl font-semibold text-purple-700 mb-2">📦 Data Peminjaman</h2>
            <p className="text-sm text-gray-600">
              Tinjau dan atur aktivitas peminjaman buku oleh pengguna.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          Login sebagai <span className="font-semibold text-gray-700">Admin</span>.
        </div>
      </div>
    </div>
  );
}
