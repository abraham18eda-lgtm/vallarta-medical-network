"use client"

export default function Header() {

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <footer className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <h1 className="font-semibold">
        Panel de administración
      </h1>

      <button
        onClick={logout}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>

    </footer>
  )
}