import { Metadata } from 'next';
import { TField } from '@/types';

export const I18N_NAMESPACES = ['common', 'hero', 'order', 'postcards', 'sets'];

export const METADATA: Metadata = {
  metadataBase: new URL('https://pletunia.com'),
  title: 'Pletunia',
  description: 'Postcards and postcard constructor sets from Yerevan',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Pletunia',
    title: 'Pletunia',
    description: 'Postcards, postcard constructor sets, and friendship bracelets from Yerevan',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Pletunia — postcards & gifts from Yerevan',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pletunia',
    description: 'Postcards, postcard constructor sets, and friendship bracelets from Yerevan',
    images: ['/images/og.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ru: '/ru',
    },
  },
  robots: { index: true, follow: true },
};

export const LANGUAGES = ['en', 'ru'];
export const LOCAL_STORAGE_KEY = 'formData';
export const CURRENT_YEAR = new Date().getFullYear();

export const SOCIAL_LINKS = {
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

export const ORDER_FIELDS: TField[] = [
  {
    name: 'name',
    kind: 'text',
    required: true,
    label: 'order:orderForm.name',
    placeholder: '...',
  },
  {
    name: 'email',
    kind: 'email',
    required: true,
    label: 'order:orderForm.email',
    placeholder: '...',
    inputProps: { inputMode: 'email', autoComplete: 'email' },
  },
  {
    name: 'comment',
    kind: 'textarea',
    required: false,
    label: 'order:orderForm.comment',
    placeholder: '...',
    rows: 3,
  },
];
