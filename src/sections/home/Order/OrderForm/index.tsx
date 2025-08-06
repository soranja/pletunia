import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { customAlphabet } from 'nanoid';

import postcards from '@/data/home/postcards.json';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { useActions, useAppSelector } from '@/hooks/useRedux';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TCard, TFormData } from '@/types';
import { OrderFormProps } from '@/types/props';

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const { t }: any = useTranslation(['home', 'common', 'order']);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'validating' | 'loading' | 'ready'>('idle');
  const [formValidation, setFormValidation] = useState({
    name: false,
    email: false,
    selectedPostcards: false,
    userAddress: false,
  });
  const { checkedCards, selectedCardsIds } = useAppSelector((s) => s.selector);
  const { setSelectedCardsIds, setCheckedCards } = useActions();
  const { setItem } = useLocalStorage('formData');

  function isInputNamedElement(e: Element): e is HTMLInputElement & { name: string } {
    return 'value' in e && 'name' in e;
  }

  const handleTick = (id: number) => {
    // Add cards Ids to an array, Ids are sorted
    setSelectedCardsIds(
      selectedCardsIds.includes(id)
        ? selectedCardsIds
            .filter((prevId) => prevId !== id)
            .sort(function (a, b) {
              return a - b;
            })
        : [...selectedCardsIds, id].sort(function (a, b) {
            return a - b;
          })
    );

    // Update checkedCards array
    function updatedCheckedCards(prevCheckedCards: boolean[]) {
      const updatedCheckedCardsArray = [...prevCheckedCards];
      const indexToUpdate = postcards.findIndex((card) => card.id === id);

      if (indexToUpdate !== -1) {
        updatedCheckedCardsArray[indexToUpdate] = !updatedCheckedCardsArray[indexToUpdate];
      }
      return updatedCheckedCardsArray;
    }

    setCheckedCards(updatedCheckedCards(checkedCards));
  };

  function collectFormData(): TFormData {
    const formData: any = {};
    Array.from(formRef.current?.elements || [])
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (field.type === 'checkbox') {
          formData.selectedPostcards ??= [];
          if (field.checked) (formData.selectedPostcards as string[]).push(field.value);
        } else {
          formData[field.name] = field.value;
        }
      });

    return {
      selectedPostcards: formData.selectedPostcards || [],
      name: formData.name as string,
      email: formData.email as string,
      comment: formData.comment as string,
    };
  }

  async function submitFormData(data: TFormData) {
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        lang: navigator.language,
        orderId: nanoid(),
        userAddress: data.comment,
      }),
    });
    setItem(data);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { name, value, checked } = e.target;

    // Update formValidation based on the field name
    switch (fieldName) {
      case 'name':
      case 'userAddress':
        setFormValidation((prevState) => ({
          ...prevState,
          // double negative is used to convert a value to its corresponding boolean value
          [name]: !!value.trim(),
        }));
        break;
      case 'email':
        setFormValidation((prevState) => ({
          ...prevState,
          [name]: validateEmail(value),
        }));
        break;
      case 'selectedPostcards':
        setFormValidation((prevState) => ({
          ...prevState,
          selectedPostcards: checked,
        }));
        break;
      default:
        break;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('validating');

    if (Object.values(formValidation).every((v) => v)) {
      setState('loading');
      const data = collectFormData();
      await submitFormData(data);
      await onSubmit(data);
      resetForm();
      setState('ready');
    }
  }

  function resetForm() {
    if (formRef.current) {
      formRef.current.reset();
    }

    // Clear selected postcards and their checkboxes (update Redux state)
    setSelectedCardsIds([]);
    setCheckedCards(new Array(postcards.length).fill(false));

    // Reset validation form
    setFormValidation({
      name: false,
      email: false,
      selectedPostcards: false,
      userAddress: false,
    });
  }

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit} ref={formRef}>
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
                handleTick(card.id);
                handleInputChange(e, 'selectedPostcards');
              }}
            />
            <label htmlFor={`${card.id}`}>{t(`postcards.cards.${card.name}.name` as const)}</label>
          </div>
        ))}
      </div>
      {state === 'validating' && !formValidation.selectedPostcards && (
        <p className="text-xs text-red-500">{t('common:validationForm.noPostcardsSelected')}</p>
      )}
      <Label htmlFor="name">
        {t('orderForm.name')}
        <span className="text-red-500"> *</span>
      </Label>
      <Input id="name" name="name" onChange={(e) => handleInputChange(e, 'name')} />
      {state === 'validating' && !formValidation.name && (
        <p className="text-xs text-red-500">{t('common:validationForm.emptyName')}</p>
      )}
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
      <Label htmlFor="userAddress">
        {t('orderForm.address')} <span className="text-red-500"> *</span>
      </Label>
      <Input
        id="userAddress"
        name="userAddress"
        onChange={(e) => handleInputChange(e, 'userAddress')}
      />
      {state === 'validating' && !formValidation.userAddress && (
        <p className="text-xs text-red-500">{t('common:validationForm.emptyAddress')}</p>
      )}
      <Label htmlFor="comment">{t('orderForm.comment')} </Label>
      <textarea
        aria-label="comment"
        id="comment"
        name="comment"
        className="rounded-xl px-5 py-5 text-black lg:w-80"
      ></textarea>
      <button
        className="bg-layout-blue-gray mt-10 w-40 cursor-pointer rounded-2xl p-5 text-xl font-bold tracking-wider lg:w-80"
        disabled={state === 'loading'}
      >
        {state === 'loading'
          ? `${t('common:buttons.orderInProgress')}`
          : `${t('common:buttons.orderButton')}!`}
      </button>
    </form>
  );
}
