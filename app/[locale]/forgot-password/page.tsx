"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const submit = async () => {

    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email
      })
    });


    const data = await res.json();

    setMessage(
      data.message || data.error
    );

    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">

        <h1 className="text-2xl font-bold mb-5">
          Recuperar contraseña
        </h1>


        <input
          className="border p-3 rounded-xl w-full"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <button
          onClick={submit}
          disabled={loading}
          className="
            mt-4
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-xl
          "
        >
          {loading
            ? "Enviando..."
            : "Enviar enlace"
          }
        </button>


        {message && (
          <p className="mt-4 text-sm">
            {message}
          </p>
        )}

      </div>

    </div>
  )
}