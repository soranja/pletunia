export const initialSize = typeof window === 'undefined' ? 768 : window.innerWidth;
export const i18nNamespaces = ['home', 'common', 'news', 'order'];

export const LANGUAGES = ['en', 'ru'];
export const LOCAL_STORAGE_KEY = 'formData';
export const CURRENT_YEAR = new Date().getFullYear();

export const SOCIAL_LINKS = {
  open: (url: string) => window.open(url, '_blank', 'noreferrer'),
  telegramAlyona: 'https://t.me/Alyonka_che',
  instagram: 'https://www.instagram.com/i_carry_joy/',
  whatsApp: 'https://wa.me/+79940221741',
  telegramIvan: 'https://t.me/s_oranja',
};

export const SOCIAL_ICONS = {
  telegram: { src: '/images/icons/social/telegram.svg', alt: 'tg-icon' },
  whatsApp: { src: '/images/icons/social/whats-app.svg', alt: 'wa-icon' },
  insta: { src: '/images/icons/social/instagram.svg', alt: 'insta-icon' },
};
