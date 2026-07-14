'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
   
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    console.log(window.location.href);
   if (res.ok) {
  console.log("LOGIN OK, CAMBIANDO A ADMIN");
  window.location.assign("/admin");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 border rounded-xl">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white p-2 rounded"
        >
          Entrar
        </button>

        <a href="/forgot-password" className="text-sm text-blue-600">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
}