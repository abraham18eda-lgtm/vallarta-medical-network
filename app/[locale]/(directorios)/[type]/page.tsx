import { prisma } from "@/lib/prisma"
import PlacesList from "@/components/places/PlacesList"

function normalizeType(type: string) {
  return type
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
}


export default async function PlacesPage({
  params
}: {
  params: Promise<{ type: string }>
}) {

  const { type } = await params

  const normalizedType = normalizeType(type)

  const mapType: any = {
    hospital: "HOSPITAL",
    hospitales: "HOSPITAL",

    clinica: "CLINIC",
    clinicas: "CLINIC",

    laboratorio: "LAB",
    laboratorios: "LAB",

    dental: "DENTAL",
    dentales: "DENTAL",
  }

  const prismaType = mapType[normalizedType]

  const titleMap: any = {
    hospital: "Hospital",
    hospitales: "Hospitales",

    clinica: "Clínicas",
    clinicas: "Clínicas",

    laboratorio: "Laboratorio",
    laboratorios: "Laboratorios",

    dental: "Clínicas dentales",
    dentales: "Clínicas dentales",
  }

  const title = titleMap[normalizedType] || "Directorio"

  if (!prismaType) {
    return <div className="p-10">Tipo inválido { type }</div>
  }

  const places = await prisma.place.findMany({
    where: {
      type: prismaType
    },
    include: {
      doctors: {
        include: {
          doctor: true
        }
      },
      
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { type: "DOCTOR" },
        { type: "PLACE" }
      ]
    },
    orderBy: {
      name: "asc"
    },
    take :8
  })
  // console.log("Categorías:", categories.length)
  return <PlacesList initialPlaces={places}  categories={categories} title={title}/>
}