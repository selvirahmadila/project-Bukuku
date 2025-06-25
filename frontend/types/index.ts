export interface Book {
  id: number;
  judul: string;
  penulis: string;
  kategori: string | null;
  coverimage: string;
  status: "available" | "non-available";
}

export interface Loan {
  id: number;
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string | null;
  status: string;
  book: Book;
}

export interface User {
  id: number;
  npm: string;
}
