export function ogLocale(locale: string): 'en_US' | 'ru_RU' {
  return locale === 'ru' ? 'ru_RU' : 'en_US';
}

export function localizedPath(locale: string): `/${string}` {
  return `/${locale}`;
}
