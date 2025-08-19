import { SupportedLang } from '@/types/props';

export interface EmailShellProps {
  lang: SupportedLang;
  children: React.ReactNode;
}

export interface OrderEmailProps {
  lang: SupportedLang;
  orderId: string;
  name: string;
  comment?: string | null;
  selectedIds: number[];
  assetBaseUrl: string;
}

export interface TEmailPostcard {
  id: number;
  name: string;
  nameEn: string;
  nameRu: string;
  emailImgUrl: string;
}
