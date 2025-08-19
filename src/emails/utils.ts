import { SupportedLang } from '@/types/props';
import type { TEmailPostcard } from './props';

export function absoluteUrl(assetBaseUrl: string, path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${assetBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function captionFor(p: TEmailPostcard, lang: SupportedLang) {
  return lang === 'ru' ? p.nameRu : p.nameEn;
}

export function commaJoin(items: string[]) {
  return items.join(', ');
}
