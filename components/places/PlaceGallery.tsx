import Lightbox from "@/components/ui/Lightbox"


export default function PlaceGallery({
 images
}:{
 images:string[]
}){


if(!images.length){
return null
}


return (

<section
className="
glass-soft
rounded-[36px]
p-8
"
>


<div className="mb-6">

<h2
className="
text-3xl
font-bold
text-slate-800
"
>
Instalaciones
</h2>


<p className="text-slate-500 mt-2">
Conoce nuestras instalaciones
</p>


</div>



<div
className="
grid
grid-cols-1
md:grid-cols-4
gap-4
h-[420px]
"
>


<div
className="
md:col-span-2
md:row-span-2
overflow-hidden
rounded-[28px]
"
>

<img
src={images[0]}
className="
w-full
h-full
object-cover
hover:scale-105
transition
duration-700
"
/>


</div>



{
images.slice(1,5).map((img,index)=>(

<div
key={index}
className="
overflow-hidden
rounded-[28px]
"
>

<img
src={img}
className="
h-full
w-full
object-cover
hover:scale-105
transition
duration-700
"
/>

</div>

))
}


</div>



<Lightbox
images={images}
/>


</section>


)

}
