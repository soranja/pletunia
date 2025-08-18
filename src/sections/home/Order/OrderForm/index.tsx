import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderField } from '../OrderField';

import { usePostcardsSelection } from '@/contexts/PostcardsSelectionContext';
import { ORDER_FIELDS } from '@/constants';
import postcards from '@/data/home/postcards.json';
import { buildOrderPayload, idsToCardNames, submitOrder, validateEmail } from '@/utils/order';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { TCard, TFormData } from '@/types';
import { OrderFormProps } from '@/types/props';

export const OrderForm: FC<OrderFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['postcards', 'order']);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<'idle' | 'validating' | 'loading' | 'ready'>('idle');

  const [formValidation, setFormValidation] = useState({
    name: false,
    email: false,
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

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    const { value } = e.target;

    switch (fieldName) {
      case 'name':
        setFormValidation((p) => ({ ...p, name: !!value.trim() }));
        break;
      case 'email':
        setFormValidation((p) => ({ ...p, email: validateEmail(value) }));
        break;
      default:
        break;
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('validating');

    const isValid = formValidation.name && formValidation.email && selectedCardIds.length > 0;
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
    setFormValidation({ name: false, email: false });
  }

  return (
    <form
      className="bg-dark-blue flex w-full flex-col items-center justify-center gap-y-4 p-8"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {/* Postcards */}
      <div className="flex min-h-[110px] w-full flex-col gap-y-1">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {postcards.map((card: TCard, index: number) => (
            <div key={card.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="border-gray-300 bg-gray-100 text-green-600 accent-green-600"
                id={`${card.id}`}
                name="selectedPostcards"
                value={card.name}
                checked={checkedCards[index]}
                onChange={() => toggleById(card.id)}
              />
              <label htmlFor={`${card.id}`}>{t(`cards.${card.name}.name` as const)}</label>
            </div>
          ))}
        </div>
        {state === 'validating' && selectedCardIds.length === 0 && (
          <p className="text-xs text-red-500">{t('order:formValidation.noPostcardsSelected')}</p>
        )}
      </div>

      {ORDER_FIELDS.map((field) => (
        <OrderField
          key={field.name}
          field={field}
          state={state}
          formValidation={formValidation}
          onChange={handleFieldChange}
        />
      ))}

      <button
        className="bg-blue-gray mt-10 cursor-pointer px-8 py-4 text-xl font-bold tracking-wider"
        disabled={state === 'loading'}
      >
        {state === 'loading'
          ? `${t('order:orderForm.orderInProgress')}`
          : `${t('order:orderForm.orderButton')}!`}
      </button>
    </form>
  );
};
