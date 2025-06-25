'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [nama, setNama] = useState('');

  useEffect(() => {
    const storedNama = localStorage.getItem('nama');
    if (!storedNama) {
      router.push('/login'); // redirect kalau belum login
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Selamat Datang, {nama} 👋</h1>

        <p className="mb-6 text-gray-700">Silakan pilih menu di bawah ini:</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={goToBooks}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            📚 Lihat Daftar Buku
          </button>

          <button
            onClick={goToLoans}
            className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            📖 Riwayat Peminjaman
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
