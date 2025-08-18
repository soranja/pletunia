'use client';

import Image from 'next/image';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CloseIcon from '@/assets/icons/close.svg';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { OrderSuccessModalProps } from '@/types/props';

export const OrderSuccessModal: FC<OrderSuccessModalProps> = ({ formData, onClose }) => {
  const { t } = useTranslation(['common', 'order']);
  const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY);
  const [emailCopied, setEmailCopied] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('pletunia.orders@gmail.com');
    setEmailCopied(true);
  };

  const handleClose = useCallback(() => {
    removeItem();
    onClose();
  }, [removeItem, onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[5px]"
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      />

      {/* Modal Content */}
      <div
        ref={dialogRef}
        className="bg-dark-green fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform border-8 border-white p-8 text-white shadow-lg"
      >
        <div className="flex flex-col items-center gap-y-8">
          {/* Greeting */}
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col">
              <h4 className="text-2xl">
                {t('order:emailConfirmation.greeting', { user: '' })}
                <strong>{formData?.name}</strong>!
              </h4>
              <h3>{t('order:emailConfirmation.thanks')}</h3>
            </div>
            <button
              onClick={handleClose}
              aria-label={t('common:buttons.close') ?? 'close'}
              type="button"
            >
              <CloseIcon className="h-6 w-6 cursor-pointer text-white hover:text-gray-300" />
            </button>
          </div>

          {/* Confirmation Message */}
          <div>
            <p>
              {t('order:emailConfirmation.message', { email: '' })}{' '}
              <strong>{formData.email}</strong>
            </p>
            <br />
            <p>{t('order:emailConfirmation.notReceived')}</p>{' '}
            <span className={`my-5 cursor-pointer font-bold ${emailCopied ? 'text-skintone' : ''}`}>
              pletunia.orders@gmail.com
            </span>
          </div>

          {/* Copy Button */}
          <button
            className="bg-dark-blue w-40 cursor-pointer px-4 py-2 text-white"
            onClick={handleCopyEmail}
            type="button"
          >
            {emailCopied
              ? t('order:emailConfirmation.emailCopied')
              : t('order:emailConfirmation.copyEmailButton')}
          </button>

          {/* Spam Alert */}
          <p className="text-xs italic">{t('order:emailConfirmation.PS')}</p>
        </div>
      </div>
    </>
  );
};
