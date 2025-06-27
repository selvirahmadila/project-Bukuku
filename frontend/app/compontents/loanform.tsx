'use client';

import { useState } from 'react';

interface LoanFormProps {
  bookid: number;
}

export default function LoanForm({ bookid }: LoanFormProps) {
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loanDate || !returnDate) {
      setMessage('Semua field harus diisi');
      return;
    }

    try {
      const res = await fetch('/api/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookid,
          loanDate,
          returnDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Peminjaman berhasil!');
        setLoanDate('');
        setReturnDate('');
      } else {
        setMessage(data.message || 'Gagal meminjam buku');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan jaringan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Ajukan Peminjaman</h2>

      <label className="block mb-1">Tanggal Pinjam</label>
      <input
        type="date"
        value={loanDate}
        onChange={(e) => setLoanDate(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-1">Tanggal Kembali</label>
      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Pinjam Buku
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}
