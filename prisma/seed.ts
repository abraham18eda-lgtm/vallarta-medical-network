import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

async function main() {

    const email = "contact@magictourspv.com"
    const password = "Magic123!"

    const hash = await bcrypt.hash(password, 10)

    const exists = await prisma.user.findUnique({
      where: { email }
    })

    if (!exists) {
      await prisma.user.create({
        data: {
          email,
          password: hash,
          role: "ADMIN"
        }
      })

      console.log("✅ Admin creado")
      console.log("📧", email)
      console.log("🔑", password)
    } else {
      console.log("⚠️ Admin ya existe")
    }
  

   // 🔹 1. Crear categoría padre (Especialidades)
  const especialidades = await prisma.category.upsert({
    where: {
      slug_type: {
        slug: "especialidades",
        type: "DOCTOR"
      }
    },
    update: {},
    create: {
      name: "Especialidades",
      slug: "especialidades",
      type: "DOCTOR"
    }
  })

  // 🔹 2. Crear subcategoría (Cardiología)
  await prisma.category.upsert({
    where: {
      slug_type: {
        slug: "cardiologia",
        type: "DOCTOR"
      }
    },
    update: {},
    create: {
      name: "Cardiología",
      slug: slugify("Cardiología"),
      type: "DOCTOR",
      parentId: especialidades.id // 🔥 clave
    }
  })

  // 🧠 1. Crear categoría padre
  // const especialidades = await prisma.category.upsert({
  //   where: { slug: "especialidades" },
  //   update: {},
  //   create: {
  //     name: "Especialidades",
  //     slug: "especialidades"
  //   }
  // })

  // 🧠 2. Crear subcategorías (IMPORTANTE: usar create, no createMany)
  const cardiologia = await prisma.category.upsert({
    where: { slug: "cardiologia" },
    update: {},
    create: {
      name: "Cardiología",
      slug: "cardiologia",
      parentId: especialidades.id
    }
  })

  const dermatologia = await prisma.category.upsert({
    where: { slug: "dermatologia" },
    update: {},
    create: {
      name: "Dermatología",
      slug: "dermatologia",
      parentId: especialidades.id
    }
  })

  // 🧠 3. Crear doctor
  const doctor = await prisma.doctor.upsert({
    where: { slug: "dr-juan-perez" },
    update: {},
    create: {
      name: "Dr. Juan Pérez",
      slug: "dr-juan-perez",
      city: "CDMX",
      description: "Especialista en corazón"
    }
  })

  // 🧠 4. Relación doctor → subcategoría
  await prisma.doctorCategory.upsert({
    where: {
      doctorId_categoryId: {
        doctorId: doctor.id,
        categoryId: cardiologia.id
      }
    },
    update: {},
    create: {
      doctorId: doctor.id,
      categoryId: cardiologia.id
    }
  })

  // 🎯 HERO SLIDES
  await prisma.heroSlide.createMany({
    data: [
      {
        image: "https://res.cloudinary.com/demo/image/upload/v1/hero1.jpg",
        title: "Atención médica de clase mundial",
        highlight: "en Puerto Vallarta",
        description:
          "Conecta con especialistas certificados y hospitales modernos.",
        link: "/doctores",
        order: 1,
        locale: "es",
        isActive: true,
      }
    ],
    skipDuplicates: true
  })

  // 🎯 BLOCKS
  await prisma.block.createMany({
    data: [
      {
        type: "cta",
        order: 1,
        locale: "es",
        isActive: true,
        data: {
          title: "Encuentra tu especialista",
          description: "Explora nuestra red de doctores certificados.",
          buttonText: "Ver doctores",
          buttonLink: "/doctores"
        }
      }
    ],
    skipDuplicates: true
  })

  console.log("✅ Seed ejecutado correctamente")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })