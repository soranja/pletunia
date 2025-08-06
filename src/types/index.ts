import { i18n, Resource } from 'i18next';

export type TInitTranslations = {
  locale: string;
  namespaces: string[];
  i18nInstance?: i18n;
  resources?: Resource;
};

export type CheckMobile = {
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

export type OrderData = {
  selectedPostcards: string[];
  userComment: string;
  userEmail: string;
  userName: string;
  userPhone: string | number | readonly string[] | undefined;
};

export type SelectedCards = {
  selectedIds: number[];
  areSelected: boolean[];
};

export type SelectInitialState = {
  selectedCardsIds: number[];
  checkedCards: boolean[];
};

export interface TFormData {
  selectedPostcards: string[];
  name: string;
  email: string;
  comment: string;
}
