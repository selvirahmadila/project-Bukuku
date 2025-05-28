const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      {
        judul: "Pengantar Kecerdasan Buatan",
        penulis: "Dr. Arief Prasetyo",
        kategori: "Teknologi",
        isbn: "9786020321231",
        sinopsis: "Buku ini membahas dasar-dasar AI seperti machine learning, reasoning, dan NLP.",
        jumlaheksemplar: 4,
        lokasirak: "Rak A1",
        coverimage: "https://covers.openlibrary.org/b/id/11122467-L.jpg"
      },
      {
        judul: "Dasar Pemrograman Web",
        penulis: "Indah Permata Sari",
        kategori: "Pemrograman",
        isbn: "9786237141239",
        sinopsis: "Pembahasan HTML, CSS, JavaScript, dan konsep responsif.",
        jumlaheksemplar: 3,
        lokasirak: "Rak B2",
        coverimage: "https://covers.openlibrary.org/b/id/11122562-L.jpg"
      },
      {
        judul: "Manajemen Sumber Daya Manusia",
        penulis: "Dr. Rino S. Sihombing",
        kategori: "Manajemen",
        isbn: "9786024257122",
        sinopsis: "Konsep dan praktik pengelolaan SDM dalam organisasi modern.",
        jumlaheksemplar: 5,
        lokasirak: "Rak C3",
        coverimage: "https://covers.openlibrary.org/b/id/11122673-L.jpg"
      },
      {
        judul: "Sistem Basis Data",
        penulis: "Andi Hermawan",
        kategori: "Teknologi Informasi",
        isbn: "9786020378843",
        sinopsis: "Menjelaskan teori dan implementasi basis data relasional.",
        jumlaheksemplar: 6,
        lokasirak: "Rak D1",
        coverimage: "https://covers.openlibrary.org/b/id/11122790-L.jpg"
      },
      {
        judul: "Etika Profesi Teknologi Informasi",
        penulis: "Lisa Anggraini",
        kategori: "Etika",
        isbn: "9786026150276",
        sinopsis: "Pembahasan etika dan tanggung jawab profesional dalam dunia IT.",
        jumlaheksemplar: 2,
        lokasirak: "Rak E2",
        coverimage: "https://covers.openlibrary.org/b/id/11122888-L.jpg"
      },
      {
        judul: "Data Mining: Konsep dan Aplikasi",
        penulis: "Dedi Sutedi",
        kategori: "Data Science",
        isbn: "9786024220131",
        sinopsis: "Teknik data mining dengan pendekatan klasifikasi dan clustering.",
        jumlaheksemplar: 4,
        lokasirak: "Rak F3",
        coverimage: "https://covers.openlibrary.org/b/id/11122978-L.jpg"
      },
      {
        judul: "Statistika untuk Penelitian",
        penulis: "Sutrisno Hadi",
        kategori: "Statistika",
        isbn: "9789790118991",
        sinopsis: "Cocok untuk mahasiswa yang melakukan penelitian kuantitatif.",
        jumlaheksemplar: 5,
        lokasirak: "Rak G1",
        coverimage: "https://covers.openlibrary.org/b/id/11123069-L.jpg"
      },
      {
        judul: "Algoritma dan Struktur Data",
        penulis: "Rizky Firmansyah",
        kategori: "Pemrograman",
        isbn: "9786026571233",
        sinopsis: "Konsep dasar algoritma dan struktur data untuk pengembangan perangkat lunak.",
        jumlaheksemplar: 4,
        lokasirak: "Rak H4",
        coverimage: "https://covers.openlibrary.org/b/id/11123145-L.jpg"
      },
      {
        judul: "Pengantar Jaringan Komputer",
        penulis: "Eka Santosa",
        kategori: "Jaringan",
        isbn: "9786028423451",
        sinopsis: "Bahasan lengkap dari dasar hingga TCP/IP dan switching.",
        jumlaheksemplar: 3,
        lokasirak: "Rak I2",
        coverimage: "https://covers.openlibrary.org/b/id/11123267-L.jpg"
      },
      {
        judul: "Metodologi Penelitian Kualitatif",
        penulis: "Prof. Siti Rohmah",
        kategori: "Metodologi",
        isbn: "9789794561203",
        sinopsis: "Panduan lengkap penelitian kualitatif untuk skripsi dan tesis.",
        jumlaheksemplar: 2,
        lokasirak: "Rak J3",
        coverimage: "https://covers.openlibrary.org/b/id/11123345-L.jpg"
      }
    ]
  });

  console.log("📚 Data buku berhasil disisipkan!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
