'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Loan {
  id: number;
  user: {
    npm: string;
  };
  book: {
    judul: string;
  };
  loanDate: string;
  returnDate: string;
}

export default function AdminLoanPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axios.get('http://localhost:1220/api/admin/loan');
      setLoans(res.data);
    } catch (err) {
      console.error('Gagal mengambil data peminjaman:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => router.push('/dashboard');
  const handleLogout = () => router.push('/cms');

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data Peminjaman Buku</h1>
          <div className="flex gap-2">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Kembali
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data peminjaman...</p>
        ) : loans.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data peminjaman.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">Judul Buku</th>
                  <th className="px-6 py-4 text-left">NPM User</th>
                  <th className="px-6 py-4 text-left">Tanggal Pinjam</th>
                  <th className="px-6 py-4 text-left">Tanggal Kembali</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-gray-50 border-t border-gray-100 transition"
                  >
                    <td className="px-6 py-3">{loan.book?.judul || '-'}</td>
                    <td className="px-6 py-3">{loan.user?.npm || '-'}</td>
                    <td className="px-6 py-3">
                      {new Date(loan.loanDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(loan.returnDate).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
