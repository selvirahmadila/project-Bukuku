'use client';

import { useEffect, useState } from 'react';

export default function LoanPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/book') // sesuaikan ini dengan nama API kamu
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setMessage('Gagal memuat daftar buku.'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedBookId || !loanDate || !returnDate) {
      setMessage('Semua field harus diisi.');
      return;
    }

    try {
      const res = await fetch('/api/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: selectedBookId,
          loanDate,
          returnDate,
        }),
      });

      if (res.ok) {
        setMessage('Pengajuan peminjaman berhasil!');
        setSelectedBookId('');
        setLoanDate('');
        setReturnDate('');
      } else {
        const error = await res.json();
        setMessage('Gagal meminjam: ' + (error.message || 'Unknown error'));
      }
    } catch {
      setMessage('Terjadi kesalahan jaringan.');
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ajukan Peminjaman Buku</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Pilih Buku:
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Pilih Buku --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.judul} - {book.penulis}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tanggal Pinjam:
          <input
            type="date"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          Tanggal Kembali:
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Ajukan Peminjaman
        </button>
      </form>
    </div>
  );
}
