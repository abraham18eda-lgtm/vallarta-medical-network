import 'server-only';

const dictionaries = {
  es: () => import('../messages/es.json').then(m => m.default),
  en: () => import('../messages/en.json').then(m => m.default),
};

export const getDictionary = async (locale: 'es' | 'en') =>
  dictionaries[locale]?.() ?? dictionaries.es();