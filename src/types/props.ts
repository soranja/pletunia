import { Resource } from 'i18next';
import { ReactNode } from 'react';
import { TCard, TFormData } from '.';

export type LocaleParamsProps = Promise<{ locale: string }>;

export interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}

export interface NavbarProps {
  orientation: 'row' | 'col';
  onItemClick?: () => void;
}

export interface LanguageChangerProps {
  onChangeEnd?: () => void;
}

export interface LinkScrollProps {
  to: string;
  offset: number;
  children: React.ReactNode;
  onAfterClick?: () => void;
}

export interface InputProps {
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export interface OrderFormProps {
  onSubmit: (data: TFormData) => void | Promise<void>;
}

export interface OrderSuccessModalProps {
  formData: TFormData;
  onClose: () => void;
}

export interface OrderEmailProps {
  lang: string;
  orderId: string;
  selectedPostcards: string[];
  name: string;
  comment: string;
}

export interface PostcardCardProps {
  card: TCard;
  index: number;
  isExpanded: boolean;
  selectedCardIds: number[];
  checkedCards: boolean[];
  flexGrowTarget: number;
  onCardClick: (index: number) => void;
  onAddButtonClick: (id: number) => void;
  isMobile: boolean;
}
