'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function BookDetailPage() {
  const params = useParams();
    const id = params?.id as string;    
  const [book, setBook] = useState<any>(null);
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/book/detail?id=${id}`);
      const data = await res.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleLoan = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/loan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: Number(id),
        loanDate,
        returnDate,
        userId: 1, // sementara hardcode, nanti diganti dari login
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Peminjaman berhasil!');
      setLoanDate('');
      setReturnDate('');
    } else {
      setMessage(data.message || 'Gagal melakukan peminjaman');
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Detail Buku</h1>
      <div className="border p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold">{book.judul}</h2>
        <p>Penulis: {book.penulis}</p>
        <p>Tahun: {book.tahun}</p>
      </div>

      <form onSubmit={handleLoan} className="max-w-md space-y-4">
        <h2 className="font-semibold">Ajukan Peminjaman</h2>
        <input
          type="date"
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Pinjam Buku
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
