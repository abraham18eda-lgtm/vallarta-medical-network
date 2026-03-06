// lib/getBlogNews.ts

import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getBlogNews = cache(async (locale: string) => {

  const categorySlug = locale === "en" ? "news" : "noticias";

  // traer featured
  const featuredBlogs = await prisma.blog.findMany({
    where: {
      published: true,
      isActive: true,
      featured: true,
      locale,
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  // si ya hay 4 regresamos
  if (featuredBlogs.length === 4) {
    return featuredBlogs;
  }

  // traer recientes para completar
  const remaining = 4 - featuredBlogs.length;

  const recentBlogs = await prisma.blog.findMany({
    where: {
      published: true,
      isActive: true,
      locale,
      category: {
        slug: categorySlug,
      },
      NOT: {
        id: {
          in: featuredBlogs.map((b) => b.id),
        },
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: remaining,
  });

  return [...featuredBlogs, ...recentBlogs];
});