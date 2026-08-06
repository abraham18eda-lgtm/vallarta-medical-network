export const directoryRoutes = {
  doctor: {
    es: "directorio",
    en: "directory",
  },

  clinic: {
    es: "clinicas",
    en: "clinics",
  },

  dental: {
    es: "dentales",
    en: "dental",
  },

  hospital: {
    es: "hospitales",
    en: "hospital",
  },

  laboratory: {
    es: "laboratorios",
    en: "laboratories",
  },

  oftalmology: {
    es: "oftalmologia",
    en: "oftalmology",
  },

  revista: {
    es: "revista-digital",
    en: "digital-magazine",
  },
} as const;


export type DirectoryType = keyof typeof directoryRoutes;


export function getDirectoryType(
  type: DirectoryType,
  locale: "es" | "en"
) {
  return directoryRoutes[type][locale];
}


export function normalizeDirectoryType(
  value: string
): DirectoryType | null {

  for (const key of Object.keys(directoryRoutes)) {

    const route =
      directoryRoutes[key as DirectoryType];

    if (
      key === value ||
      route.es === value ||
      route.en === value
    ) {
      return key as DirectoryType;
    }
  }

  return null;
}