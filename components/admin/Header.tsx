"use client"

export default function Header() {

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <header className="hidden lg:flex bg-white border-b px-6 py-4 justify-between items-center shadow-md">
      <h1 className="font-semibold text-lg">
        Panel de administración
      </h1>

      <button
        onClick={logout}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </header>
    )
}