'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      router.push('/book');  // langsung ke halaman buku kalau sudah login
    }
  }, [router]);

  return (
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Selamat Datang di Aplikasi Perpustakaan</h1>
      <p className="text-gray-600 text-lg mb-8">
        Mengarahkan ke halaman yang sesuai...
      </p>
    </div>
  );
}
