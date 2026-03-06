import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  // Crear categoría
  const category = await prisma.category.create({
    data: {
      name: "Salud General",
      slug: "salud-general",
    },
  })

  // Crear 6 blogs
  await prisma.blog.createMany({
    data: [
      {
        title: "Importancia de un chequeo médico anual",
        slug: "chequeo-medico-anual",
        excerpt: "Realizar estudios preventivos puede salvar vidas.",
        content: "Contenido completo sobre chequeos médicos anuales...",
        image: "/blogs/blog1.jpg",
        featured: true,
        views: 120,
        categoryId: category.id,
        published: true
      },
      {
        title: "Turismo médico en Puerto Vallarta",
        slug: "turismo-medico-puerto-vallarta",
        excerpt: "Descubre por qué Vallarta es destino médico líder.",
        content: "Contenido sobre turismo médico...",
        image: "/blogs/blog2.jpg",
        views: 250,
        categoryId: category.id,
        published: true
      },
      {
        title: "Beneficios de la medicina preventiva",
        slug: "beneficios-medicina-preventiva",
        excerpt: "Prevenir siempre será mejor que curar.",
        content: "Contenido sobre medicina preventiva...",
        image: "/blogs/blog3.jpg",
        views: 80,
        categoryId: category.id,
        published: true
      },
      {
        title: "Innovaciones en cardiología 2026",
        slug: "innovaciones-cardiologia-2026",
        excerpt: "Los últimos avances en tratamientos cardíacos.",
        content: "Contenido sobre cardiología...",
        image: "/blogs/blog4.jpg",
        views: 300,
        categoryId: category.id,
        published: true
      },
      {
        title: "5 hábitos para mejorar tu salud",
        slug: "5-habitos-mejorar-salud",
        excerpt: "Pequeños cambios que generan grandes resultados.",
        content: "Contenido sobre hábitos saludables...",
        image: "/blogs/blog5.jpg",
        views: 150,
        categoryId: category.id,
        published: true
      },
      {
        title: "Tecnología médica avanzada en México",
        slug: "tecnologia-medica-mexico",
        excerpt: "Equipamiento de última generación disponible.",
        content: "Contenido sobre tecnología médica...",
        image: "/blogs/blog6.jpg",
        views: 60,
        categoryId: category.id,
        published: true
      },
    ],
  })

  console.log("Blogs creados correctamente")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })