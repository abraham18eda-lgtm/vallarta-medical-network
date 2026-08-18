"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import crypto from "crypto"

export async function createBlogTranslation(
  blogId: number
) {

  const post = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  })

  if (!post) {
    throw new Error("El artículo no existe.")
  }

  // Si ya tiene traducción, no crear otra
  if (post.translationGroup) {

    const existingTranslation =
      await prisma.blog.findFirst({
        where: {
          translationGroup: post.translationGroup,
          id: {
            not: post.id,
          },
        },
        select: {
          id: true,
        },
      })

    if (existingTranslation) {
      redirect(
        `/admin/blog/${existingTranslation.id}/edit`
      )
    }
  }

  // Crear un nuevo grupo de traducción
  const translationGroup =
    post.translationGroup ??
    crypto.randomUUID()

  const targetLocale =
    post.locale === "es"
      ? "en"
      : "es"

  // Slug temporal
  const slug = `${post.slug}-${targetLocale}`

  const translatedPost =
    await prisma.$transaction(async (tx) => {

        const newPost =
        await tx.blog.create({
            data: {

            title: post.title,

            slug,

            excerpt: post.excerpt,

            content: post.content,

            image: post.image,

            featured: false,

            published: false,

            isActive: true,

            locale: targetLocale,

            translationGroup,

            categoryId: post.categoryId,

            },
        })

        // Si el artículo original todavía no tenía
        // translationGroup, se lo asignamos ahora.
        if (!post.translationGroup) {

        await tx.blog.update({
            where: {
            id: post.id,
            },

            data: {
            translationGroup,
            },
        })

        }

        return newPost
    })

    redirect(
    `/admin/blog/${translatedPost.id}/edit`
    )
}