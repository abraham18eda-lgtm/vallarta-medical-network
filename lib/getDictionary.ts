import 'server-only';

const dictionaries = {
  es: () => import('@/messages/es.json').then(m => m.default),
  en: () => import('@/messages/en.json').then(m => m.default),
};

export async function getDictionary(locale: 'es' | 'en') {
  return dictionaries[locale]?.() ?? dictionaries.es();
}