import { Resource } from 'i18next';
import { ReactNode } from 'react';
import { TCard, TFormData } from '.';

export interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}

export interface LinkScrollProps {
  to: string;
  offset: number;
  children: React.ReactNode;
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

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  classNameModal: string;
}

export interface OrderFormProps {
  onSubmit: (data: TFormData) => void | Promise<void>;
}

export interface OrderSuccessModalProps {
  formData: TFormData;
  onClose: () => void;
}

export interface OrderEmailProps {
  selectedPostcards: string[];
  name: string;
  comment: string;
  lang: string;
  orderId: string;
  userAddress: string;
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
}
