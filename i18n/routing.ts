import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",

  pathnames: {
    "/": "/",

    "/directorio": {
      es: "/directorio",
      en: "/directory",
    },

    "/directorio/[slug]": {
      es: "/directorio/[slug]",
      en: "/directory/[slug]",
    },

    "/especialidades": {
      es: "/especialidades",
      en: "/specialties",
    },

    "/especialidades/[slug]": {
      es: "/especialidades/[slug]",
      en: "/specialties/[slug]",
    },

    "/directorio/especialidad/[slug]": {
      es: "/directorio/especialidad/[slug]",
      en: "/directory/specialty/[slug]",
    },

    // "/directorio/[specialty]": {
    //   es: "/directorio/[specialty]",
    //   en: "/directory/[specialty]",
    // },

    // "/directorio/doctor/[slug]": {
    //   es: "/directorio/doctor/[slug]",
    //   en: "/directory/doctor/[slug]",
    // },    
    
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

    //  "/[type]": {
    //   es: "/[type]",
    //   en: "/[type]",
    // },

    // "/[type]/[slug]": {
    //   es: "/[type]/[slug]",
    //   en: "/[type]/[slug]",
    // },
    
  },
});