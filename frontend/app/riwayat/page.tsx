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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📖 Riwayat Peminjaman</h1>
        <button
          onClick={() => router.push('/home')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ⬅️ Kembali ke Home
        </button>
      </div>

      {riwayat.length === 0 ? (
        <p>Belum ada riwayat peminjaman</p>
      ) : (
        <div className="space-y-4">
          {riwayat.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <p><strong>Judul:</strong> {item.book.judul}</p>
              <p><strong>Penulis:</strong> {item.book.penulis}</p>
              <p><strong>Tanggal Pinjam:</strong> {new Date(item.loanDate).toLocaleDateString()}</p>
              <p>
                <strong>Tanggal Kembali:</strong>{' '}
                {item.returnDate
                  ? new Date(item.returnDate).toLocaleDateString()
                  : 'Belum dikembalikan'}
              </p>

              {!item.returnDate && (
                <button
                  onClick={() => kembalikanBuku(item.id)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
