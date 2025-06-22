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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
            Data Peminjaman Buku
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-sm text-gray-800 rounded-full hover:bg-gray-300 transition"
            >
              Kembali
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-500 text-sm text-white rounded-full hover:bg-blue-600 transition"
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
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Judul Buku</th>
                  <th className="px-5 py-3 text-left font-medium">NPM</th>
                  <th className="px-5 py-3 text-left font-medium">Tanggal Pinjam</th>
                  <th className="px-5 py-3 text-left font-medium">Tanggal Kembali</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {loans.map((loan) => (
                  <tr key={loan.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-5 py-3">{loan.book?.judul || '-'}</td>
                    <td className="px-5 py-3">{loan.user?.npm || '-'}</td>
                    <td className="px-5 py-3">
                      {new Date(loan.loanDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-5 py-3">
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
