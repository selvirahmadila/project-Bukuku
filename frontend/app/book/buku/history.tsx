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
    const fetchLoanHistory = async () => {
      try {
        const res = await fetch('/api/loan');
        if (!res.ok) throw new Error('Gagal mengambil data');
        const data = await res.json();
        setLoans(data);
      } catch (error) {
        console.error('Gagal memuat data riwayat peminjaman:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Riwayat Peminjaman Buku
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data peminjaman...</p>
      ) : loans.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada peminjaman buku.</p>
      ) : (
        <ul className="space-y-4">
          {loans.map((loan) => (
            <li key={loan.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <p className="text-lg font-semibold">
                {loan.book.judul} <span className="text-sm font-normal text-gray-500">oleh {loan.book.penulis}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Peminjam:</strong> {loan.user.nama} ({loan.user.npm})
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tanggal Pinjam:</strong> {new Date(loan.loanDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tanggal Kembali:</strong>{' '}
                {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : (
                  <span className="text-red-500 font-medium">Belum dikembalikan</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
