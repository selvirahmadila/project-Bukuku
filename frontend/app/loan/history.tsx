'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: number;
  judul: string;
  penulis: string;
}

interface Loan {
  id: number;
  loanDate: string;
  returnDate: string | null;
  book: Book;
  user: {
    id: number;
    nama: string;
    npm: string;
  };
}

export default function LoanHistoryPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/loan')
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Memuat data peminjaman...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Riwayat Peminjaman Buku</h1>
      {loans.length === 0 && <p>Belum ada peminjaman buku.</p>}
      <ul className="space-y-4">
        {loans.map((loan) => (
          <li key={loan.id} className="border p-4 rounded shadow">
            <p><strong>Buku:</strong> {loan.book.judul} oleh {loan.book.penulis}</p>
            <p><strong>Tanggal Pinjam:</strong> {new Date(loan.loanDate).toLocaleDateString()}</p>
            <p><strong>Tanggal Kembali:</strong> {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : 'Belum dikembalikan'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
