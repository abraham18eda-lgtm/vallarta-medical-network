import { getMagazines } from "@/lib/magazine"
import RevistaList from "@/components/magazine/RevistaList"


interface Props {

  params: Promise<{
    locale:"es"|"en"
  }>

}


export default async function RevistasPage({
  params
}:Props){


  const {
    locale
  } = await params


  const magazines = await getMagazines(locale)



  return (

    <RevistaList

      magazines={magazines}

      locale={locale}

    />

  )

}