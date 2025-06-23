'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-500 text-white py-8 px-6">
        <h2 className="text-xl font-bold mb-8">Admin Perpus</h2>
        <nav className="space-y-4 text-sm">
          <button onClick={() => router.push('/cms/add-book')} className="block w-full text-left hover:underline">
            ➕ Tambah Buku
          </button>
          <button onClick={() => router.push('/book')} className="block w-full text-left hover:underline">
            📘 Daftar Buku
          </button>
          <button onClick={() => router.push('/loan')} className="block w-full text-left hover:underline">
            📦 Peminjaman
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Selamat Datang Admin!</h1>
        <p className="text-sm text-gray-600 mb-10">Silakan pilih menu di sidebar untuk mengelola perpustakaan.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => router.push('/cms/add-book')}
            className="cursor-pointer bg-blue-50 border border-blue-200 hover:border-blue-400 rounded-lg p-6 transition"
          >
            <h2 className="text-lg font-medium text-blue-800 mb-2">➕ Tambah Buku</h2>
            <p className="text-sm text-gray-600">Tambahkan buku baru ke sistem.</p>
          </div>

          <div
            onClick={() => router.push('/book')}
            className="cursor-pointer bg-green-50 border border-green-200 hover:border-green-400 rounded-lg p-6 transition"
          >
            <h2 className="text-lg font-medium text-green-800 mb-2">📘 Daftar Buku</h2>
            <p className="text-sm text-gray-600">Lihat daftar buku yang tersedia.</p>
          </div>

          <div
            onClick={() => router.push('/loan')}
            className="cursor-pointer bg-purple-50 border border-purple-200 hover:border-purple-400 rounded-lg p-6 transition"
          >
            <h2 className="text-lg font-medium text-purple-800 mb-2">📦 Data Peminjaman</h2>
            <p className="text-sm text-gray-600">Kelola data peminjaman buku.</p>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          Anda login sebagai <span className="font-medium text-gray-700">Admin</span>.
        </div>
      </main>
    </div>
  );
}
