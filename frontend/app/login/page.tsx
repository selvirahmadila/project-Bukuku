'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [npm, setNpm] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!npm || !password) {
      setError('NPM dan Password wajib diisi');
      return;
    }

    if (npm !== password) {
      setError('Password harus sama dengan NPM');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ npm }));
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Selamat Datang 
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 mb-4 rounded-md border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600 block mb-1">NPM</label>
            <input
              type="text"
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan NPM"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Aplikasi Perpustakaan
        </p>
      </div>
    </div>
  );
}
