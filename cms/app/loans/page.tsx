// cms/loans/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Loan {
  id: number;
  user: {
    nama: string | null;
    npm: string;
  };
  book: {
    judul: string;
  };
  loanDate: string;
  returnDate: string | null;
}

export default function LoanPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch('/api/admin/loan');
        const data = await res.json();
        setLoans(data);
      } catch (error) {
        console.error('Gagal mengambil data peminjaman', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Data Peminjaman Buku</h1>
      {loading ? (
        <p>Loading...</p>
      ) : loans.length === 0 ? (
        <p>Tidak ada data peminjaman.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md rounded-xl">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">NPM</th>
                <th className="p-3 text-left">Judul Buku</th>
                <th className="p-3 text-left">Tanggal Pinjam</th>
                <th className="p-3 text-left">Tanggal Kembali</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="border-b">
                  <td className="p-3">{loan.user.nama || '-'}</td>
                  <td className="p-3">{loan.user.npm}</td>
                  <td className="p-3">{loan.book.judul}</td>
                  <td className="p-3">{new Date(loan.loanDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
