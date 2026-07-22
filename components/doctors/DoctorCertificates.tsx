"use client"

import Image from "next/image"


export default function DoctorCertificates({
  items=[]
}:{
  items:any[]
}) {


return (

<div className="glass-soft rounded-[28px] p-6 md:p-8">


<h2 className="text-xl font-bold text-slate-900 mb-5">
  Certificaciones
</h2>


<div className="grid grid-cols-2 md:grid-cols-3 gap-4">


{
items.length === 0 && (

<p className="text-slate-400">
Sin certificados registrados
</p>

)


}


{
items.map((item)=>(
  
<div
key={item.id}
className="
rounded-2xl
overflow-hidden
border
border-white/50
bg-white/40
"
>

<div className="relative h-40">

<Image
src={item.url}
alt={item.title || "Certificado"}
fill
className="object-cover"
/>

</div>


{
item.title && (

<p className="
p-3
text-sm
font-medium
text-slate-700
">
{item.title}
</p>

)

}


</div>

))

}


</div>

</div>

)

}
