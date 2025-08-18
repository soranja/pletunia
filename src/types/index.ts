import { i18n, Resource } from 'i18next';

export type TInitTranslations = {
  locale: string;
  namespaces: string[];
  i18nInstance?: i18n;
  resources?: Resource;
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

export type TFormData = {
  selectedPostcards: string[];
  name: string;
  email: string;
  comment: string;
};

type TFieldName = Exclude<keyof TFormData, 'selectedPostcards'>;
type TFieldKind = 'text' | 'email' | 'textarea';

export interface TField<N extends TFieldName = TFieldName> {
  name: N;
  kind: TFieldKind;
  required: boolean;
  label: string;
  placeholder: string;
  rows?: number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export type TConstructorLayer = {
  layer: number;
  label: string;
  path: string;
};
