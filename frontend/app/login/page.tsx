'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [nama, setNama] = useState('');
  const [npm, setNpm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:1220/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, npm }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('nama', data.user.nama);
        localStorage.setItem('npm', data.user.npm);

        router.push('/home');
      } else {
        setError('Login gagal, periksa kembali nama dan NPM.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">🔐 Login Mahasiswa</h2>
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-md text-sm text-center mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="nama" className="block text-gray-700 font-medium mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="npm" className="block text-gray-700 font-medium mb-1">
              NPM
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🎓</span>
              <input
                type="text"
                id="npm"
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Masukkan NPM Anda"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Masuk
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          © 2025 Bukuku. All rights reserved.
        </p>
      </div>
    </div>
  );
}
