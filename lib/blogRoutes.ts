export function getBlogSlugFromPath(
  pathname: string
) {

  const match =
    pathname.match(
      /^\/blog\/([^/]+)$/
    )

  if (!match) {
    return null
  }

  return match[1]
}