import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  // HERO SLIDES
  await prisma.heroSlide.createMany({
    data: [
      {
        image: "https://res.cloudinary.com/demo/image/upload/v1/hero1.jpg",
        title: "Atención médica de clase mundial",
        highlight: "en Puerto Vallarta",
        description:
          "Conecta con especialistas certificados y hospitales modernos para tratamientos seguros.",
        link: "/doctors",
        order: 1,
        locale: "es",
        isActive: true,
      },
      {
        image: "https://res.cloudinary.com/demo/image/upload/v1/hero2.jpg",
        title: "Especialistas médicos confiables",
        highlight: "para pacientes internacionales",
        description:
          "Nuestra red conecta pacientes con los mejores doctores y clínicas.",
        link: "/services",
        order: 2,
        locale: "es",
        isActive: true,
      },
      {
        image: "https://res.cloudinary.com/demo/image/upload/v1/hero3.jpg",
        title: "Turismo médico",
        highlight: "simple y seguro",
        description:
          "Planea tu tratamiento médico mientras disfrutas de Puerto Vallarta.",
        link: "/contact",
        order: 3,
        locale: "es",
        isActive: true,
      },
    ],
  })


  // BLOCKS
  await prisma.block.createMany({
    data: [
      {
        type: "cta",
        order: 1,
        locale: "es",
        isActive: true,
        data: {
          title: "Encuentra tu especialista",
          description:
            "Explora nuestra red de doctores certificados en Puerto Vallarta.",
          buttonText: "Ver doctores",
          buttonLink: "/doctors",
        },
      },
      {
        type: "features",
        order: 2,
        locale: "es",
        isActive: true,
        data: {
          title: "¿Por qué elegir Vallarta Medical Network?",
          features: [
            "Doctores certificados",
            "Hospitales modernos",
            "Atención a pacientes internacionales",
            "Tratamientos accesibles",
          ],
        },
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