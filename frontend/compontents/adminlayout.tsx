'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/pages/admin/home' },
    { name: 'Tambah Buku', href: '/pages/admin/addbook' },
    { name: 'Daftar Buku', href: '/pages/admin/book' },
    { name: 'Peminjaman', href: '/pages/admin/loan' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold">Admin Perpus</h1>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`py-2 px-4 rounded-lg transition ${
                pathname === item.href ? 'bg-blue-700' : 'hover:bg-blue-800'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
