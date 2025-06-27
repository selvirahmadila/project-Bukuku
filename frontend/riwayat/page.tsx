'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Loan {
  id: number;
  loanDate: string;
  returnDate: string | null;
  book: {
    judul: string;
    penulis: string;
  };
}

export default function RiwayatPeminjaman() {
  const [riwayat, setRiwayat] = useState<Loan[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);

      fetch(`http://localhost:1220/api/loan/user/${storedUserId}`)
        .then((res) => res.json())
        .then((data) => setRiwayat(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const kembalikanBuku = async (loanId: number) => {
    const res = await fetch('http://localhost:1220/api/loan/return', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanId }),
    });

    const data = await res.json();
    alert(data.message);

    if (userId) {
      fetch(`http://localhost:1220/api/loan/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setRiwayat(data));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">📖 Riwayat Peminjaman</h1>
        <button
          onClick={() => router.push('/home')}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          ⬅️ Kembali ke Home
        </button>
      </div>

      {riwayat.length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat peminjaman</p>
      ) : (
        <div className="space-y-4">
          {riwayat.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow border border-gray-100">
              <p className="text-sm text-gray-700"><strong>Judul:</strong> {item.book.judul}</p>
              <p className="text-sm text-gray-700"><strong>Penulis:</strong> {item.book.penulis}</p>
              <p className="text-sm text-gray-700"><strong>Tanggal Pinjam:</strong> {new Date(item.loanDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700">
                <strong>Tanggal Kembali:</strong>{' '}
                {item.returnDate
                  ? new Date(item.returnDate).toLocaleDateString()
                  : 'Belum dikembalikan'}
              </p>

              {!item.returnDate && (
                <button
                  onClick={() => kembalikanBuku(item.id)}
                  className="mt-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
                >
                  Kembalikan
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
