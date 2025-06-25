'use client';

import { User } from "@/types";

// Simpan user ke localStorage
export const setSession = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Ambil user dari localStorage
export const getSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

// Hapus session saat logout
export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};
