import Image from 'next/image';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE_KEY } from '@/constants';
import { Modal } from '@/components/ui/Modal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { OrderSuccessModalProps } from '@/types/props';

export const OrderSuccessModal: FC<OrderSuccessModalProps> = ({ formData, onClose }) => {
  const { t } = useTranslation(['home', 'common', 'order']);

  const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('pletunia.orders@gmail.com');
    setEmailCopied(true);
  };

  const handleClose = () => {
    removeItem();
    onClose();
  };

  return (
    <Modal onClose={onClose} classNameModal="bg-orange-100 p-8 m-4 rounded-lg shadow-lg">
      <div className="modal-content flex flex-col items-center gap-y-3 text-center text-black">
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
          <span className={`my-5 cursor-pointer font-bold ${emailCopied && 'text-green-700'}`}>
            pletunia.orders@gmail.com
          </span>
        </div>

        <div className="flex justify-between gap-x-8">
          <button
            className="w-40 rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
            onClick={handleCopyEmail}
          >
            {emailCopied
              ? t('order:emailConfirmation.emailCopied')
              : t('order:emailConfirmation.copyEmailButton')}
          </button>
          <button
            className="w-40 rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600"
            onClick={handleClose}
          >
            {t('common:buttons.close')}
          </button>
        </div>
        <p className="mt-4 text-xs italic">{t('order:emailConfirmation.PS')}</p>
        <Image
          className="inline"
          src="/images/svgs-icons/email.svg"
          height={18}
          width={18}
          alt="email-icon"
        />
      </div>
    </Modal>
  );
};
