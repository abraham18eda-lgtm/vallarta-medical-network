export function switchLocale(pathname: string, newLocale: "es" | "en") {
  const segments = pathname.split("/");

  // reemplaza el locale (posición 1)
  segments[1] = newLocale;

  return segments.join("/");
}