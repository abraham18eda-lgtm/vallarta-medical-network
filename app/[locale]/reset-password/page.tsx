"use client";

import {useState} from "react";
import {useSearchParams} from "next/navigation";


export default function ResetPassword(){

const params =
useSearchParams();


const token =
params.get("token");


const [password,setPassword]
=
useState("");

const [message,setMessage]
=
useState("");



async function submit(){

const res =
await fetch(
"/api/auth/reset-password",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

token,

password

})

}

);



const data =
await res.json();


setMessage(
data.message || data.error
);


}



return (

<div className="
min-h-screen
flex
items-center
justify-center
">


<div className="
bg-white
p-8
rounded-xl
shadow
w-full
max-w-md
">


<h1 className="
text-2xl
font-bold
mb-5
">

Nueva contraseña

</h1>



<input

type="password"

className="
w-full
border
p-3
rounded
"

placeholder="
Nueva contraseña
"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>



<button

onClick={submit}

className="
mt-4
w-full
bg-blue-600
text-white
py-3
rounded
"

>

Guardar contraseña

</button>



<p className="mt-4">

{message}

</p>



</div>


</div>

)

}