'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-8">📚 Admin Perpus</h2>
        <nav className="space-y-3 text-sm text-gray-700">
          <button
            onClick={() => router.push('/cms/add-book')}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded transition"
          >
            ➕ Tambah Buku
          </button>
          <button
            onClick={() => router.push('/book')}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded transition"
          >
            📘 Daftar Buku
          </button>
          <button
            onClick={() => router.push('/loan')}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded transition"
          >
            📦 Peminjaman
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Selamat Datang, Admin!</h1>
        <p className="text-sm text-gray-600 mb-8">
          Silakan pilih menu di sidebar untuk mengelola data perpustakaan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => router.push('/cms/add-book')}
            className="cursor-pointer bg-white border border-gray-200 hover:shadow-md rounded-lg p-6 transition"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">➕ Tambah Buku</h2>
            <p className="text-sm text-gray-600">Tambahkan buku baru ke dalam sistem.</p>
          </div>

          <div
            onClick={() => router.push('/book')}
            className="cursor-pointer bg-white border border-gray-200 hover:shadow-md rounded-lg p-6 transition"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">📘 Daftar Buku</h2>
            <p className="text-sm text-gray-600">Lihat semua buku yang tersedia.</p>
          </div>

          <div
            onClick={() => router.push('/loan')}
            className="cursor-pointer bg-white border border-gray-200 hover:shadow-md rounded-lg p-6 transition"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">📦 Data Peminjaman</h2>
            <p className="text-sm text-gray-600">Kelola data peminjaman buku oleh mahasiswa.</p>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          Anda login sebagai <span className="font-medium text-gray-700">Admin</span>.
        </div>
      </main>
    </div>
  );
}
