import { SupportedLang } from '@/types/props';

type Dict = Record<string, string>;

const en: Dict = {
  preview: 'Pletunia thanks you for the order!',
  hello: 'Hello, {{name}}!',
  orderNo: 'Your order number:',
  youPicked: 'You picked:',
  yourComment: 'Your comment / extra contact:',
  weWillReach: "We'll reach you soon to discuss payment and delivery.",
  questions: 'If you have questions, write to:',
  or: 'or in Telegram:',
};

const ru: Dict = {
  preview: 'Плетунья благодарит вас за заказ! ',
  hello: 'Здравствуйте, {{name}}!',
  orderNo: 'Номер вашего заказа:',
  youPicked: 'Вы выбрали:',
  yourComment: 'Примечания / доп. контакты:',
  weWillReach: 'Скоро мы с вами свяжемся по поводу оплаты и доставки.',
  questions: 'По любым вопросам пишите на почту:',
  or: 'или в Телеграм:',
};

export const M: Record<SupportedLang, Dict> = { en, ru };

export function t(lang: SupportedLang, key: keyof typeof en, vars?: Record<string, string>) {
  const raw = M[lang][key as string] ?? '';
  if (!vars) return raw;
  return raw.replace(/{{(\w+)}}/g, (_, k) => vars[k] ?? '');
}
