import DirectorioEspecialidades from "@/components/directorio/DirectorioEspecialidades";


type Props = {
 params:Promise<{
   locale:"es"|"en"
 }>
};


export default async function DirectorioPage({
 params
}:Props){


 const {locale}=await params;


 return (

   <DirectorioEspecialidades
      locale={locale}
   />

 );

}