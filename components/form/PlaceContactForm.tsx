"use client"

export default function PlaceContactForm({
  placeId
}:{
  placeId:string
}){


    return (

    <div
    className="   
    p-8    
    "
    >


    <div className="mb-2">

    {/* <h3
    className="
    text-2xl
    font-bold
    text-slate-700
    "
    >
    Solicita información
    </h3> */}


    <p
    className="
    mt-2
    text-sm
    text-slate-500
    "
    >
    Ponte en contacto con la clinica.
    </p>


    </div>



    <form
    action="/api/contact"
    method="POST"
    className="space-y-4"
    >


    <input
    type="hidden"
    name="placeId"
    value={placeId}
    />



    <input
    name="name"
    placeholder="Nombre completo"
    className="
    w-full
    rounded-xl
    border
    border-slate-200
    bg-white/60
    px-4
    py-3
    outline-none
    focus:border-sky-400
    focus:ring-4
    focus:ring-sky-100
    "
    />



    <input
    name="email"
    placeholder="Correo electrónico"
    className="
    w-full
    rounded-xl
    border
    border-slate-200
    bg-white/60
    px-4
    py-3
    outline-none
    focus:border-sky-400
    focus:ring-4
    focus:ring-sky-100
    "
    />




    <input
    name="phone"
    placeholder="Teléfono"
    className="
    w-full
    rounded-xl
    border
    border-slate-200
    bg-white/60
    px-4
    py-3
    outline-none
    focus:border-sky-400
    focus:ring-4
    focus:ring-sky-100
    "
    />




    <textarea

    name="message"

    rows={4}

    placeholder="¿En qué podemos ayudarte?"

    className="
    w-full
    rounded-xl
    border
    border-slate-200
    bg-white/60
    px-4
    py-3
    outline-none
    focus:border-sky-400
    focus:ring-4
    focus:ring-sky-100
    "

    />



    <button

    className="
    w-full
    rounded-xl
    bg-gradient-to-r
    from-sky-500
    to-cyan-500
    px-6
    py-3
    font-semibold
    text-white
    shadow-lg
    transition
    hover:-translate-y-0.5
    hover:shadow-xl
    active:scale-95
    "

    >

    Enviar solicitud

    </button>


    </form>


    </div>

    )

}
