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

  const mapType: any = {
    hospital: "HOSPITAL",
    hospitales: "HOSPITAL",

    "clinica": "CLINIC",
    "clinicas": "CLINIC",

    laboratorio: "LAB",
    laboratorios: "LAB",

    "clinica-dental": "DENTAL",
    "clinica-dentales": "DENTAL"
  }
  

  const normalizedType = normalizeType(type)
  const prismaType = mapType[normalizedType]


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
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return <PlacesList initialPlaces={places} />
}