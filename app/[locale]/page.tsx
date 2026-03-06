import { prisma } from "@/lib/prisma"
import { getDictionary } from "@/lib/getDictionary"
import HomePage from "@/components/home/HomePage"
import { getPopularPosts, getNewestPosts } from "@/lib/blog"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { BlogFeatured } from "@/components/blog/BlogFeatured"
import { getCMSBlocks  } from "@/lib/cms"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
  const { locale } = params
  const now = new Date()
  const popularPosts = await getPopularPosts()
  const newestPosts = await getNewestPosts()
  
  const [dict, promoBanner, heroSlides, adSection1, adSection2 ] = await Promise.all([
    getDictionary(locale),

    prisma.promoBanner.findFirst({
      where: {
        locale,
        isActive: true,
        OR: [
          { startAt: null, endAt: null },
          {
            startAt: { lte: now },
            endAt: { gte: now },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    }),

    prisma.heroSlide.findMany({
      where: {
        locale,
        isActive: true,
        OR: [
          { startAt: null, endAt: null },
          {
            startAt: { lte: now },
            endAt: { gte: now },
          },
        ],
      },
      orderBy: { order: "asc" },
    }),
    getCMSBlocks(locale, "adsection1"),
    getCMSBlocks(locale, "adsection2"),
  ])

  return (
    <HomePage
      dict={dict}
      promoBanner={promoBanner}
      heroSlides={heroSlides}
      newestPosts={newestPosts}
      popularPosts={popularPosts}
      adSection1={adSection1}
      adSection2={adSection2}

    />
  )
}