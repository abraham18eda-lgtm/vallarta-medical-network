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

    '/clinicas': {
      es: '/clinicas',
      en: '/clinic'
    },

    '/dentales': {
      es: '/dentales',
      en: '/dental'
    },

     '/hospitales': {
      es: '/hospitales',
      en: '/hospital'
    },

    '/laboratorios': {
      es: '/laboratorios',
      en: '/laboratories'
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