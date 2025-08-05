/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react';
import { initialSize } from '@/constants';

// Translation
import { useTranslation } from 'react-i18next';

// Data
import postcards from '@/data/home/postcards.json';
import OrderImages from '@/data/home/order.json';

import { CardType, FormDataType } from '@/types';

// Redux
import { useAppSelector } from '@/hooks/selector';
import { useActions } from '@/hooks/actions';

// UI
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import Image from 'next/image';

// Local storage
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ID generator
import { customAlphabet } from 'nanoid';

// Type Safety & Guards
function isInputNamedElement(e: Element): e is HTMLInputElement & { name: string } {
  return 'value' in e && 'name' in e;
}

// the component
function OrderForm() {
  // ========================================

  // Data fetching, localStorage, and ID generating*
  const [state, setState] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  // formData for getItem (noId and address)
  const [formData, setFormData] = useState<FormDataType>();
  const localStorageKey = 'formData';
  const { setItem, getItem, removeItem } = useLocalStorage(localStorageKey);

  // ========================================

  // Postcards updation
  const { checkedCards, selectedCardsIds } = useAppSelector((state) => state.selector);
  const { setSelectedCardsIds, setCheckedCards } = useActions();

  // Duplicate handleAddButtonClick, so both components can update the same state
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

  // Print names of selected postcards (relies on user's browser)
  const selectedPostcards = postcards
    .filter((card) => selectedCardsIds.includes(card.id))
    .map((card) => (navigator.language.includes('ru') ? card.nameRu : card.nameEn));

  // ========================================

  // Form validation
  const [formValidation, setFormValidation] = useState({
    name: false,
    email: false,
    selectedPostcards: false,
    userAddress: false,
  });

  console.log(formValidation);

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

  // Function to validate email format
  const validateEmail = (email: string): boolean => {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  // Click event: triggers submission, reset, localStorage; updates setState.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if all form fields are valid
    const isFormValid = Object.values(formValidation).every((value) => value === true);
    setState('validating');
    if (isFormValid) {
      setState('loading');
      // Collect data and send it to POST API
      await submitFormData();
      setState('ready');
      // Show confirmation message
      setShowModal(true);
      resetForm();
    } else {
      // Display validation error message or prevent submission
      console.log('Form validation failed. Please fill in all required fields.');
    }
  }

  // Collect data from form, send it to POST API, and add it to localStorage
  async function submitFormData() {
    // formData for POST API and setItem
    const formData: Record<string, string | string[] | number[]> = {};

    Array.from(formRef.current?.elements || [])
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return;
        if (field.type === 'checkbox') {
          if (!formData[field.name]) {
            formData[field.name] = [];
          }
          if ((field as HTMLInputElement).checked) {
            (formData[field.name] as string[]).push(field.value);
          }
        } else {
          formData[field.name] = field.value;
        }
      });

    // ID generating
    // * nano id is used temporarily, while we don't have a proper database
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, 10);

    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        selectedPostcards: selectedPostcards,
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        lang: navigator.language,
        orderId: nanoid(),
        userAddress: formData.userAddress,
      }),
    });

    // Add form data to local storage
    setItem(formData);
  }

  // Reset form
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

  useEffect(() => {
    // Retrieve form data from localStorage
    setFormData(getItem());

    // No issues so far!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // ========================================

  // Translation
  const { t }: any = useTranslation(['home', 'common', 'order']);
  // 'any' for reason t func errors -- 'For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.'

  // ========================================

  // Email copying
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('pletunia.orders@gmail.com');
    setCopied(true);
  };

  // ========================================

  // Modal state
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="order
      text-white flex flex-col pt-20 pb-20 px-10 pr-28
      lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:items-start"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url(${OrderImages.greenGirl.imgUrl})`,
        backgroundSize: `${initialSize <= 1168 ? '30%' : '14%'}`,
      }}
      id="order"
    >
      <div
        className="left-column 
        flex flex-col 
        lg:items-end lg:pr-24"
      >
        <h3
          className="text-3xl font-extrabold mb-12 
          md:pr-0 
          lg:text-5xl lg:text-right"
        >
          {t('orderForm.headline')}
        </h3>
        <div>
          <Image
            className="hidden rounded-r-3xl lg:block lg:w-6/12 xl:w-3/5"
            src={OrderImages.greenGirl.imgUrlMilti}
            alt="Green Girl (miltiplied)"
            height={200}
            width={300}
          />
        </div>
      </div>
      <div className="right-column lg:pl-24 flex flex-col gap-4 items-start justify-start">
        <h4 className="text-2xl lg:text-3xl font-bold">
          {t('orderForm.choose')}
          <span className="text-red-500"> *</span>
        </h4>

        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit} ref={formRef}>
          <div className="flex gap-x-6 flex-col md:flex-row">
            {postcards.map((card: CardType, index: number) => (
              <div key={card.id} className="flex gap-2 checked:bg-black">
                <input
                  type="checkbox"
                  className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
                  id={`${card.id}`}
                  name="selectedPostcards"
                  value={card.name}
                  checked={checkedCards[index]}
                  onChange={(e) => {
                    handleTick(card.id);
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
            <p className="text-red-500 text-xs">{t('common:validationForm.noPostcardsSelected')}</p>
          )}
          <Label htmlFor="name">
            {t('orderForm.name')}
            <span className="text-red-500"> *</span>
          </Label>
          <Input id="name" name="name" onChange={(e) => handleInputChange(e, 'name')} />
          {state === 'validating' && !formValidation.name && (
            <p className="text-red-500 text-xs">{t('common:validationForm.emptyName')}</p>
          )}
          <Label htmlFor="email">
            {t('orderForm.email')} <span className="text-red-500"> *</span>
          </Label>
          <Input id="email" name="email" onChange={(e) => handleInputChange(e, 'email')} />
          {state === 'validating' && !formValidation.email && (
            <p className="text-red-500 text-xs">
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
            <p className="text-red-500 text-xs">{t('common:validationForm.emptyAddress')}</p>
          )}
          <Label htmlFor="comment">{t('orderForm.comment')} </Label>
          <textarea
            aria-label="comment"
            id="comment"
            name="comment"
            className="text-black px-5 lg:w-80 py-5 rounded-xl"
          ></textarea>
          <button
            className="mt-10 rounded-2xl p-5 w-40 lg:w-80 tracking-wider bg-layout-blue-gray font-bold text-xl cursor-pointer"
            disabled={state === 'loading'}
          >
            {state === 'loading'
              ? `${t('common:buttons.orderInProgress')}`
              : `${t('common:buttons.orderButton')}!`}
          </button>
        </form>
      </div>
      {state === 'ready' && showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            // Delete previous data from localStorage if it exists (unnecessary?)
            removeItem();
          }}
          classNameModal="bg-orange-100 p-8 m-4 rounded-lg shadow-lg"
        >
          <div className="modal-content flex flex-col gap-y-3 items-center text-center text-black">
            <h4 className="text-2xl">
              {t('order:emailConfirmation.greeting', { user: formData?.name })}
            </h4>
            <h3>{t('order:emailConfirmation.thanks')}</h3>
            <div className="mt-4">
              <p>
                {t('order:emailConfirmation.message', {
                  email: formData?.email,
                })}
              </p>
              <p>{t('order:emailConfirmation.notReceived')}</p>
            </div>
            <div className="flex gap-x-4">
              <span className={`my-5 font-bold cursor-pointer ${copied && 'text-green-700'}`}>
                pletunia.orders@gmail.com
              </span>
            </div>

            <div className="flex gap-x-8 justify-between">
              <button
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 w-40"
                onClick={handleCopyEmail}
              >
                {copied
                  ? t('order:emailConfirmation.emailCopied')
                  : t('order:emailConfirmation.copyEmailButton')}
              </button>
              <button
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 w-40"
                onClick={() => {
                  setShowModal(false);
                  // Delete previous data from localStorage if it exists
                  removeItem();
                }}
              >
                {t('common:buttons.close')}
              </button>
            </div>
            <p className="text-xs italic mt-4">{t('order:emailConfirmation.PS')}</p>
            <Image
              className="inline"
              src="/images/svgs-icons/email.svg"
              height={18}
              width={18}
              alt="email-icon"
            ></Image>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default OrderForm;
