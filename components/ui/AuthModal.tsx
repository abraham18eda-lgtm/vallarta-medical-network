"use client"

import { useState, useEffect  } from "react"
import { createPortal } from "react-dom"
import { Eye, EyeOff } from "lucide-react"

export default function AuthModal({ onClose }: any) {

  const [mode, setMode] = useState<"login" | "forgot">("login")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })


  const submit = async () => {

    setMessage("")

    const url =
      mode === "login"
        ? "/api/auth/login"
        : "/api/auth/forgot-password"


    const res = await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form),
      credentials:"include"
    })


    const data = await res.json()


    if(res.ok){

      if(mode === "login"){

        onClose()

        // dashboard del doctor
        window.location.href="/dashboard"

      }else{

        setMessage(
          "Si el correo existe recibirás un enlace para cambiar tu contraseña."
        )

      }


    }else{

      setMessage(data.error || "Error")

    }

  }



if (!mounted) return null

  return createPortal(

    // <div className="
    //   fixed inset-0 
    //   bg-black/40 
    //   flex 
    //   items-center 
    //   justify-center 
    //   z-[100]
    // ">
    <div 
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        px-4
        overflow-y-auto
      "
    >

      {/* <div className="
        bg-white 
        w-full 
        max-w-md 
        p-6 
        rounded-2xl 
        space-y-4
      "> */}
      <div
        className="
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          bg-white/95
          backdrop-blur-xl
          p-6
          rounded-3xl
          shadow-2xl
          space-y-4
          my-auto
        "
      >


        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold">

            {
              mode === "login"
              ? "Iniciar sesión"
              : "Recuperar contraseña"
            }

          </h2>


          <button onClick={onClose}>
            ✕
          </button>

        </div>



        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />



        {
          mode === "login" && (

          <div className="relative">

            <input
              type={showPassword ? "text":"password"}
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={form.password}
              onChange={(e)=>
                setForm({
                  ...form,
                  password:e.target.value
                })
              }
            />


            <button
              type="button"
              onClick={()=>
                setShowPassword(!showPassword)
              }
              className="
                absolute 
                right-3 
                top-1/2 
                -translate-y-1/2
                text-gray-500
              "
            >

              {
                showPassword
                ? <EyeOff size={18}/>
                : <Eye size={18}/>
              }

            </button>

          </div>

          )
        }



        {
          message && (

          <div className="
            bg-blue-100 
            text-blue-700 
            rounded-lg 
            p-2 
            text-sm
          ">
            {message}
          </div>

          )
        }




        <button
          onClick={submit}
          className="
            w-full 
            bg-gradient-to-r
            from-blue-500
            to-blue-700
            shadow-lg
            shadow-blue-500/30
            text-white 
            py-2 
            rounded-lg
          "
        >

          {
            mode === "login"
            ? "Entrar"
            : "Enviar enlace"
          }

        </button>




        <div className="text-center text-sm">


        {
          mode === "login" && (

          <button
            onClick={()=>
              setMode("forgot")
            }
            className="
              text-blue-600
              block
              mx-auto
            "
          >
            ¿Olvidaste tu contraseña?
          </button>

          )
        }



        {
          mode === "forgot" && (

          <button
            onClick={()=>
              setMode("login")
            }
            className="text-blue-600"
          >
            Volver al login
          </button>

          )
        }


        </div>


      </div>
    </div>,
    document.body
  )
  
}