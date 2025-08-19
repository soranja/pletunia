import { Resource } from 'i18next';
import { ReactNode } from 'react';
import { TCard, TField, TFormData } from '.';

export type SupportedLang = 'en' | 'ru';

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

export interface OrderFormProps {
  onSubmit: (data: TFormData) => void | Promise<void>;
}

export interface OrderFieldProps {
  field: TField;
  state: 'idle' | 'validating' | 'loading' | 'ready';
  formValidation: Record<string, boolean>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
}

export interface OrderSuccessModalProps {
  formData: TFormData;
  onClose: () => void;
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
  reserved: boolean;
}
