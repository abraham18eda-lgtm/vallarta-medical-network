import { slugify } from "./slugify"
import { getBaseUrl } from "./getBaseUrl"

export function getBlogUrl(category: string, title: string) {
  const base = getBaseUrl()

  const slug = slugify(title)
  const categorySlug = slugify(category)

  return `${base}/blog/${categorySlug}/${slug}`
}