'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, GraduationCap } from 'lucide-react';

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
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <Lock className="text-gray-600 w-6 h-6 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-800">Login Mahasiswa</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-sm px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-600 mb-1">
              Nama Lengkap
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-gray-400">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="npm" className="block text-sm font-medium text-gray-600 mb-1">
              NPM
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-gray-400">
              <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
              <input
                id="npm"
                type="text"
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                placeholder="Masukkan NPM Anda"
                required
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium py-2.5 rounded-lg transition"
          >
            Masuk
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          &copy; 2025 <span className="font-medium text-gray-500">Bukuku</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
}
