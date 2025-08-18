import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderForm } from './OrderForm';
import { OrderSuccessModal } from './OrderSuccessModal';
import { TFormData } from '@/types';

export const Order = () => {
  const { t } = useTranslation('order');

  const [formData, setFormData] = useState<TFormData | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleFormSubmit(data: TFormData) {
    setFormData(data);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setFormData(null);
  }

  return (
    <section
      className={`relative flex flex-col items-center justify-center border-b-8 py-10 text-white ${'bg-postcards bg-cover'}`}
      id="order"
    >
      {
        <video
          src="/videos/postcards-bg-video.mp4"
          poster="/images/bg/postcards.webp"
          autoPlay
          loop
          muted
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
      }

      <div className="my-10 flex flex-col items-center justify-center gap-y-8 lg:w-1/3">
        <h3 className="mb-4 text-4xl font-extrabold md:text-6xl">{t('headline')}</h3>

        <OrderForm onSubmit={handleFormSubmit} />
      </div>

      {formData && showModal && (
        <OrderSuccessModal formData={formData} onClose={handleCloseModal} />
      )}
    </section>
  );
};
