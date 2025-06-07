'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/');
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div className="space-y-4">
        <Link
          href="/book"
          className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          📚 Daftar Buku
        </Link>
        <Link
          href="/loan"
          className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          👥 Daftar Peminjaman
        </Link>
      </div>
    </div>
  );
}
