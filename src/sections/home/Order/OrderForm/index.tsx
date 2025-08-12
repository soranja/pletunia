import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import postcards from '@/data/home/postcards.json';
import { usePostcardsSelection } from '@/contexts/PostcardsSelectionContext';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { buildOrderPayload, idsToCardNames, submitOrder, validateEmail } from '@/utils/order';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TCard, TFormData } from '@/types';
import { OrderFormProps } from '@/types/props';

export const OrderForm: FC<OrderFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['home', 'common', 'order']);

  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'validating' | 'loading' | 'ready'>('idle');
  const [formValidation, setFormValidation] = useState({
    name: false,
    email: false,
    selectedPostcards: false,
  });
  const { selectedCardIds, checkedCards, toggleById, clearAll } = usePostcardsSelection();
  const { setItem } = useLocalStorage('formData');

  function collectFormData(): TFormData {
    const form = formRef.current!;
    const name = (form.querySelector('input[name="name"]') as HTMLInputElement)?.value || '';
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value || '';
    const comment = (form.querySelector('#comment') as HTMLTextAreaElement)?.value || '';
    const selectedPostcards = idsToCardNames(selectedCardIds, postcards);

    return { selectedPostcards, name, email, comment };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { name, value, checked: isChecked } = e.target;

    switch (fieldName) {
      case 'name':
        setFormValidation((p) => ({ ...p, name: !!value.trim() }));
        break;
      case 'email':
        setFormValidation((prev) => ({ ...prev, [name]: validateEmail(value) }));
        break;
      case 'selectedPostcards':
        setFormValidation((prev) => ({
          ...prev,
          selectedPostcards: isChecked || selectedCardIds.length > 0,
        }));
        break;
      default:
        break;
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('validating');

    const isValid =
      formValidation.name &&
      formValidation.email &&
      (selectedCardIds.length > 0 || formValidation.selectedPostcards);

    if (isValid) {
      setState('loading');
      const data = collectFormData();
      const payload = buildOrderPayload(data);
      await submitOrder(payload);
      setItem(payload);
      await onSubmit(data);
      resetForm();
      setState('ready');
    }
  }

  function resetForm() {
    formRef.current?.reset();
    clearAll();
    setFormValidation({
      name: false,
      email: false,
      selectedPostcards: false,
    });
  }

  return (
    <form
      className="bg-layout-dark-blue flex flex-col items-center justify-center gap-y-4 rounded-xl p-8"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {/* Postcards */}
      <div className="flex min-h-12 w-full flex-col gap-y-2">
        <div className="flex flex-col gap-x-6 md:flex-row">
          {postcards.map((card: TCard, index: number) => (
            <div key={card.id} className="flex gap-2 checked:bg-black">
              <input
                type="checkbox"
                className="rounded border-gray-300 bg-gray-100 text-green-600 accent-green-600"
                id={`${card.id}`}
                name="selectedPostcards"
                value={card.name}
                checked={checkedCards[index]}
                onChange={(e) => {
                  toggleById(card.id);
                  handleInputChange(e, 'selectedPostcards');
                }}
              />
              <label htmlFor={`${card.id}`}>
                {t(`postcards.cards.${card.name}.name` as const)}
              </label>
            </div>
          ))}
        </div>
        {state === 'validating' && !formValidation.selectedPostcards && (
          <p className="text-xs text-red-500">{t('common:validationForm.noPostcardsSelected')}</p>
        )}
      </div>
      {/* Name */}
      <div className="flex min-h-22 w-full flex-col gap-y-2">
        <Label htmlFor="name">
          {t('orderForm.name')}
          <span className="text-red-500"> *</span>
        </Label>
        <Input id="name" name="name" onChange={(e) => handleInputChange(e, 'name')} />
        {state === 'validating' && !formValidation.name && (
          <p className="text-xs text-red-500">{t('common:validationForm.emptyName')}</p>
        )}
      </div>
      {/* E-mail */}
      <div className="flex min-h-22 w-full flex-col gap-y-2">
        <Label htmlFor="email">
          {t('orderForm.email')} <span className="text-red-500"> *</span>
        </Label>
        <Input id="email" name="email" onChange={(e) => handleInputChange(e, 'email')} />
        {state === 'validating' && !formValidation.email && (
          <p className="text-xs text-red-500">
            {(
              formRef.current?.querySelector('input[name="email"]') as HTMLInputElement
            )?.value.trim() === ''
              ? t('common:validationForm.emptyEmail')
              : t('common:validationForm.invalidEmailFormat')}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="flex w-full flex-col gap-y-2">
        <Label htmlFor="comment">{t('orderForm.comment')} </Label>
        <textarea
          aria-label="comment"
          id="comment"
          name="comment"
          placeholder="..."
          className="w-full rounded-md bg-white/20 px-2 py-1"
        />
      </div>

      <button
        className="bg-layout-blue-gray mt-10 w-40 cursor-pointer rounded-xl p-5 text-xl font-bold tracking-wider lg:w-80"
        disabled={state === 'loading'}
      >
        {state === 'loading'
          ? `${t('common:buttons.orderInProgress')}`
          : `${t('common:buttons.orderButton')}!`}
      </button>
    </form>
  );
};
