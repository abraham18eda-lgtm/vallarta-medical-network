"use server"

import {
  getPost,
  getTranslatedPost,
} from "@/lib/blog"

export async function getBlogTranslation(
  slug: string,
  currentLocale: "es" | "en"
) {
  const currentPost =
    await getPost(
      slug,
      currentLocale
    )

  if (!currentPost) {
    return null
  }

  if (!currentPost.translationGroup) {
    return null
  }

  const targetLocale =
    currentLocale === "es"
      ? "en"
      : "es"

  const translatedPost =
    await getTranslatedPost(
      currentPost.translationGroup,
      targetLocale
    )

  if (!translatedPost) {
    return null
  }

  return {
    slug: translatedPost.slug,
    locale: translatedPost.locale,
  }
}