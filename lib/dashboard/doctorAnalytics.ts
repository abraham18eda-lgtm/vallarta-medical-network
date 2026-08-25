import { prisma } from "@/lib/prisma"

export async function getDoctorAnalytics(
  doctorId: string
) {

  // FECHAS

  const now = new Date()

  const startDate = new Date(now)

  startDate.setDate(
    startDate.getDate() - 29
  )

  startDate.setHours(0, 0, 0, 0)


  // EVENTOS DEL DOCTOR

  const doctorEvents =
    await prisma.analytics.findMany({
      where: {
        doctorId,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        type: true,
        query: true,
        createdAt: true,
      },
    })


  // BÚSQUEDAS GENERALES

  const searchEvents =
    await prisma.analytics.findMany({
      where: {
        type: "SEARCH",
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        type: true,
        query: true,
        createdAt: true,
      },
    })


  // GRÁFICA - 30 DÍAS

  const chartMap = new Map<
    string,
    {
      views: number
      whatsapp: number
      contacts: number
      searches: number
    }
  >()


  for (let i = 0; i < 30; i++) {

    const date = new Date(startDate)

    date.setDate(
      startDate.getDate() + i
    )

    const key =
      date.toISOString().split("T")[0]

    chartMap.set(key, {
      views: 0,
      whatsapp: 0,
      contacts: 0,
      searches: 0,
    })
  }


  // EVENTOS DEL DOCTOR EN LA GRÁFICA

  for (const event of doctorEvents) {

    const key =
      event.createdAt
        .toISOString()
        .split("T")[0]

    const day =
      chartMap.get(key)

    if (!day) continue


    switch (event.type) {

      case "PROFILE_VIEW":
        day.views++
        break

      case "WHATSAPP_CLICK":
        day.whatsapp++
        break

      case "CONTACT_FORM":
        day.contacts++
        break

    }
  }


  // BÚSQUEDAS EN LA GRÁFICA

  for (const event of searchEvents) {

    const key =
      event.createdAt
        .toISOString()
        .split("T")[0]

    const day =
      chartMap.get(key)

    if (!day) continue

    day.searches++
  }


  // FORMATEAR GRÁFICA

  const chart =
    Array.from(
      chartMap.entries()
    ).map(
      ([date, values]) => {

        const [
          year,
          month,
          day
        ] = date.split("-")

        return {
          date: `${day}/${month}`,
          ...values,
        }
      }
    )


  // TOTALES DEL DOCTOR

  let profileViews = 0
  let whatsappClicks = 0
  let contactForms = 0


  for (const event of doctorEvents) {

    switch (event.type) {

      case "PROFILE_VIEW":
        profileViews++
        break

      case "WHATSAPP_CLICK":
        whatsappClicks++
        break

      case "CONTACT_FORM":
        contactForms++
        break

    }
  }


  // TOTAL DE BÚSQUEDAS

  const searches =
    searchEvents.length


  // TOP BÚSQUEDAS

  const searchMap =
    new Map<string, number>()


  for (const event of searchEvents) {

    if (!event.query) {
      continue
    }

    const query =
      event.query
        .trim()
        .toLowerCase()

    if (!query) {
      continue
    }

    searchMap.set(
      query,
      (searchMap.get(query) || 0) + 1
    )
  }


  const topSearches =
    Array.from(
      searchMap.entries()
    )
      .map(
        ([query, total]) => ({
          query,
          total,
        })
      )
      .sort(
        (a, b) =>
          b.total - a.total
      )
      .slice(0, 5)


  // CONVERSIÓN

  const conversion =
    profileViews > 0
      ? (
          (
            whatsappClicks +
            contactForms
          ) /
          profileViews
        ) * 100
      : 0


  // ACTIVIDAD RECIENTE

  const recentActivity =
    [...doctorEvents]
      .reverse()
      .slice(0, 8)


  // RESULTADO

  return {

    profileViews,

    whatsappClicks,

    contactForms,

    searches,

    conversion:
      Number(
        conversion.toFixed(1)
      ),

    chart,

    topSearches,

    recentActivity,

  }
}
