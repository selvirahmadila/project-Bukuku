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

    // Simpan data user di localStorage (bisa simpan minimal npm saja)
    localStorage.setItem('user', JSON.stringify({ npm }));

    // Redirect ke homepage
    router.push('/');
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="NPM"
          value={npm}
          onChange={(e) => setNpm(e.target.value)}
          className="border px-3 py-2 rounded"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
