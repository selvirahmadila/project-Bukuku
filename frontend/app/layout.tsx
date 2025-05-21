export const metadata = {
  title: "Aplikasi Perpustakaan",
  description: "Manajemen Buku, Pengguna, dan Peminjaman",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head />
      <body className="bg-gray-100 text-gray-900">
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
