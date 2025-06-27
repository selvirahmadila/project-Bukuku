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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">👋 Selamat Datang</h2>
        <p className="text-center text-slate-600 text-sm mb-6">
          Hai <span className="font-semibold text-slate-800">{nama}</span>, silakan pilih aksi:
        </p>

        <div className="flex flex-col gap-4">
  <button
    onClick={() => router.push('/book')}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition flex items-center justify-center gap-2"
  >
    📚 Lihat Daftar Buku
  </button>

  <button
    onClick={() => router.push('/riwayat')}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition flex items-center justify-center gap-2"
  >
    📖 Riwayat Peminjaman
  </button>

  <button
    onClick={handleLogout}
    className="bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold py-2 rounded-md transition flex items-center justify-center gap-2"
  >
    🚪 Keluar
  </button>
</div>


        <p className="text-xs text-center text-slate-400 mt-6">
          © 2025 Bukuku — Mahasiswa Informatika
        </p>
      </div>
    </div>
  );
}
