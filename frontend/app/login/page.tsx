import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginUserPage() {
  const [npm, setNpm] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ npm, password }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/user/home')
    } else {
      setError(data.message || 'Login gagal')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login Mahasiswa</h2>
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
        )}
        <div className="mb-4">
          <label className="block mb-1">NPM</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={npm}
            onChange={(e) => setNpm(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
