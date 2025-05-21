export default function HomePage() {
  return (
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Selamat Datang di Aplikasi Perpustakaan</h1>
      <p className="text-gray-600 text-lg mb-8">
        Aplikasi ini digunakan untuk mengelola data buku, pengguna, dan peminjaman buku di Universitas Teknokrat Indonesia.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/book"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Lihat Daftar Buku
        </a>
        <a
          href="/user"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Lihat Data Pengguna
        </a>
        <a
          href="/loan"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          Kelola Peminjaman
        </a>
      </div>
    </div>
  );
}
