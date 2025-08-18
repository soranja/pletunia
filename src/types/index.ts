import { i18n, Resource } from 'i18next';

export type TInitTranslations = {
  locale: string;
  namespaces: string[];
  i18nInstance?: i18n;
  resources?: Resource;
};

export type TMobile = {
  isMobile: boolean;
};

export type TCard = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  addButton: string;
  addedButton: string;
};

export interface TFormData {
  selectedPostcards: string[];
  name: string;
  email: string;
  comment: string;
}

export interface TConstructorLayer {
  layer: number;
  label: string;
  path: string;
}
