'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [nama, setNama] = useState('');

  useEffect(() => {
    const storedNama = localStorage.getItem('nama');
    if (!storedNama) {
      router.push('/login');
    } else {
      setNama(storedNama);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const goToBooks = () => {
    router.push('/book');
  };

  const goToLoans = () => {
    router.push('/riwayat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">👋 Selamat Datang</h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Hai <span className="font-semibold text-blue-800">{nama}</span>, silakan pilih aksi:
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={goToBooks}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            📚 Lihat Daftar Buku
          </button>

          <button
            onClick={goToLoans}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition"
          >
            📖 Riwayat Peminjaman
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
          >
            🚪 Keluar
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">© 2025 Bukuku. Mahasiswa</p>
      </div>
    </div>
  );
}
