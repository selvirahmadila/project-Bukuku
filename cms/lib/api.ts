// cms/lib/api.ts
const BASE_URL = "http://localhost:1220"; // HARUS mengarah ke backend

export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login gagal");
  }

  return res.json();
}
