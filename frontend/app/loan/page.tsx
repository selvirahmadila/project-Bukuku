'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: string;
  judul: string;
  penulis: string;
}

export default function ExtendLoanPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/book');
        if (!res.ok) throw new Error('Gagal mengambil data buku');
        const data = await res.json();
        setBooks(data);
        setMessage('');
      } catch (err) {
        console.error('Error saat memuat buku:', err);
        setMessage('Gagal memuat daftar buku.');
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBookId || !loanDate || !returnDate) {
      setMessage('Semua field harus diisi.');
      setSuccess(false);
      return;
    }

    if (new Date(returnDate) <= new Date(loanDate)) {
      setMessage('Tanggal perpanjangan harus setelah tanggal pinjam.');
      setSuccess(false);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/extend-loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: selectedBookId, loanDate, returnDate }),
      });

      if (res.ok) {
        setMessage('Perpanjangan berhasil diajukan!');
        setSuccess(true);
        setSelectedBookId('');
        setLoanDate('');
        setReturnDate('');
      } else {
        const error = await res.json();
        throw new Error(error.message || 'Terjadi kesalahan saat memperpanjang.');
      }
    } catch (err: any) {
      console.error('Error perpanjangan:', err);
      setMessage('Gagal memperpanjang: ' + (err.message || 'Unknown error'));
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Ajukan Perpanjangan Peminjaman
      </h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm font-medium text-center ${
            success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pilih Buku yang Dipinjam:</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={loading || books.length === 0}
          >
            <option value="">-- Pilih Buku --</option>
            {books.length > 0 ? (
              books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.judul} - {book.penulis}
                </option>
              ))
            ) : (
              <option disabled>{loading ? 'Memuat data...' : 'Tidak ada buku yang dapat diperpanjang'}</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Peminjaman Saat Ini:</label>
          <input
            type="date"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Diperpanjang Hingga Tanggal:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
          disabled={loading || submitting}
        >
          {submitting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            'Ajukan Perpanjangan'
          )}
        </button>
      </form>
    </div>
  );
}
