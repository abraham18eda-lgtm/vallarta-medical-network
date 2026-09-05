'use client';

import { useState } from 'react';

export default function AdminLogin() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const submit = async () => {
if (!email || !password) {
setError('Ingresa tu correo y contraseña.');
return;
}

setLoading(true);
setError('');

try {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (res.ok) {
    window.location.assign('/admin');
    return;
  }

  setError('Correo o contraseña incorrectos.');
} catch (error) {
  console.error(error);
  setError('No se pudo conectar con el servidor.');
} finally {
  setLoading(false);
}


};

return (
<main className="min-h-screen flex items-center justify-center p-6">

  <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

    <div className="grid md:grid-cols-2">

      {/* PANEL IZQUIERDO */}

      <div className="hidden md:flex relative bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-12 text-white">

        <div className="relative z-10 flex flex-col justify-between w-full">

          <div>

            <div className="flex items-center gap-3 mb-12">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 border border-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18M3 12h18"
                  />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-lg">
                  Medical Network
                </p>

                <p className="text-xs text-blue-200">
                  Administración
                </p>
              </div>

            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Panel de
              <br />
              administración
            </h2>

            <p className="mt-6 max-w-md text-blue-100 leading-relaxed">
              Gestiona doctores, clínicas, hospitales, contenido,
              categorías y todos los recursos de la plataforma.
            </p>

          </div>

          <div className="text-sm text-blue-200">
            © {new Date().getFullYear()} Medical Network
          </div>

        </div>

        {/* DECORACIÓN */}

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      </div>


      {/* FORMULARIO */}

      <div className="p-8 sm:p-12 md:p-14">

        <div className="mx-auto max-w-md">

          {/* LOGO MOBILE */}

          <div className="flex items-center gap-3 mb-10 md:hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v18M3 12h18"
                />
              </svg>
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                Medical Network
              </p>

              <p className="text-xs text-slate-500">
                Administración
              </p>
            </div>

          </div>


          {/* TITULO */}

          <div className="mb-8">

            <p className="text-sm font-medium text-blue-600 mb-2">
              ADMINISTRACIÓN
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              Bienvenido de nuevo
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Inicia sesión para acceder al panel administrativo.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}


          {/* EMAIL */}

          <div className="mb-5">

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@vallartameidcalnetwork.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>


          {/* PASSWORD */}

          <div className="mb-4">

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>


          {/* FORGOT PASSWORD */}

          <div className="mb-7 text-right">

            <a
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ¿Olvidaste tu contraseña?
            </a>

          </div>


          {/* BUTTON */}

          <button
            onClick={submit}
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              px-4 py-3.5
              text-sm font-semibold text-white
              shadow-lg shadow-blue-600/20
              transition
              hover:bg-blue-700
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">

                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                Iniciando sesión...

              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>


          {/* SECURITY */}

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <rect
                width="16"
                height="11"
                x="4"
                y="10"
                rx="2"
              />
              <path
                strokeLinecap="round"
                d="M8 10V7a4 4 0 018 0v3"
              />
            </svg>

            Acceso seguro al panel administrativo

          </div>

        </div>

      </div>

    </div>

  </div>

</main>


);
}