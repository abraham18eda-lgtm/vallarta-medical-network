type AnyObject = Record<string, any>;

function get(obj: AnyObject, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function tr(
  item: AnyObject,
  field: string,
  locale: "es" | "en",
  dict?: AnyObject,
  fallbackField = "es"
) {
  // 1. BD según locale
  const dbValue =
    item?.[`${field}_${locale}`] ??
    item?.[`${field}_${fallbackField}`];

  if (dbValue) return dbValue;

  // 2. fallback JSON (opcional)
  if (dict) {
    const jsonValue = get(dict, field);
    if (jsonValue) return jsonValue;
  }

  // 3. nada encontrado
  return "";
}