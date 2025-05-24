'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ClipboardList } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F4FF] via-white to-[#F5F3FF] p-6 font-sans">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Gambar */}
        <div className="flex justify-center md:justify-end">
          <div className="overflow-hidden rounded-3xl shadow-xl ring-4 ring-white/40">
            <Image
              src="/images/anu.png"
              alt="Foto Perpustakaan"
              width={500}
              height={350}
              className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105 rounded-xl ring-4 ring-sky-200 shadow-md"
            />
          </div>
        </div>

        {/* Konten */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-blue-800 tracking-tight">
            Selamat Datang di Aplikasi Perpustakaan
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Kelola data buku, pengguna, dan peminjaman dengan mudah di{' '}
            <span className="text-sky-600 font-semibold">
              Universitas Teknokrat Indonesia
            </span>.
          </p>

          {/* Tombol navigasi */}
         <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6">
  {/* Tombol Daftar Buku */}
  <a
    href="/book"
    className="flex flex-col items-center justify-center bg-sky-100 hover:bg-sky-200 text-sky-800 w-[220px] h-[110px] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="bg-sky-600 text-white p-2 rounded-full mb-2 shadow-md">
      <BookOpen className="w-6 h-6" />
    </div>
    <span className="font-semibold text-base">Daftar Buku</span>
    <span className="text-xs text-gray-500">Lihat dan kelola koleksi buku</span>
  </a>

  {/* Tombol Perpanjangan Masa Pinjam */}
  <a
    href="/loan"
    className="flex flex-col items-center justify-center bg-indigo-100 hover:bg-indigo-200 text-indigo-800 w-[220px] h-[110px] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="bg-indigo-600 text-white p-2 rounded-full mb-2 shadow-md">
      <ClipboardList className="w-6 h-6" />
    </div>
    <span className="font-semibold text-base">Perpanjangan</span>
    <span className="text-xs text-gray-500 text-center">
      Perpanjang masa pinjam buku
    </span>
  </a>
</div>
  </div>
      </div>
    </main>
  );
}
