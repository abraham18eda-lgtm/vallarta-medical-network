import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",

  pathnames: {
    "/": "/",

    "/[type]": {
      es: "/[type]",
      en: "/[type]",
    },

    "/[type]/[slug]": {
      es: "/[type]/[slug]",
      en: "/[type]/[slug]",
    },

    "/blog": {
      es: "/blog",
      en: "/blog",
    },

    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },

    "/forgot-password": {
      es: "/forgot-password",
      en: "/forgot-password",
    },
    
  },
});