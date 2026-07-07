import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',

  pathnames: {
    '/': '/',

    '/directorio': {
      es: '/directorio',
      en: '/directory'
    },

    '/blog': {
      es: '/blog',
      en: '/blog'
    },

    '/contacto': {
      es: '/contacto',
      en: '/contact'
    }
  }
});