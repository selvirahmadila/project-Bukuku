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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 p-4">
      <div className="backdrop-blur-md bg-white/70 p-10 rounded-3xl shadow-xl w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Halo, <span className="text-blue-700 font-bold">{nama}</span> 👋
        </h1>
        <p className="text-gray-600 text-sm mb-6">Ayo pilih aktivitasmu hari ini</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={goToBooks}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-full shadow hover:scale-105 transition"
          >
            <span>📚</span> <span>Lihat Daftar Buku</span>
          </button>

          <button
            onClick={goToLoans}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-full shadow hover:scale-105 transition"
          >
            <span>🗂️</span> <span>Riwayat Peminjaman</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-full shadow hover:scale-105 transition"
          >
            <span>🚪</span> <span>Logout</span>
          </button>
        </div>

        <p className="text-[10px] text-gray-500 mt-6">Versi Mahasiswa • 2025</p>
      </div>
    </div>
  );
}