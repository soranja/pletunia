import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderForm } from './OrderForm';
import { OrderSuccessModal } from './OrderSuccessModal';
import { initialSize } from '@/constants';
import { TFormData } from '@/types';

export default function Order() {
  const { t } = useTranslation(['home', 'common', 'order']);

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
      className={`relative h-[110dvh] border-b-8 py-16 text-white ${initialSize <= 1280 ? 'bg-postcards bg-cover' : ''}`}
      id="order"
    >
      {initialSize >= 1280 && (
        <video
          src="/videos/postcards-bg-video.mp4"
          poster="/images/bg/postcards.webp"
          autoPlay
          loop
          muted
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
      )}

      <div className="flex flex-col items-center justify-center gap-y-8">
        <h3 className="text-4xl font-extrabold md:text-6xl">{t('orderForm.headline')}</h3>

        <OrderForm onSubmit={handleFormSubmit} />
      </div>

      {formData && showModal && (
        <OrderSuccessModal formData={formData} onClose={handleCloseModal} />
      )}
    </section>
  );
}
