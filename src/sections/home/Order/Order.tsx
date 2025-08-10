import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import OrderImages from '@/data/home/order.json';
import { initialSize } from '@/constants';
import OrderForm from './OrderForm';
import OrderSuccessModal from './OrderSuccessModal';
import { TFormData } from '@/types';

export default function Order() {
  const { t }: any = useTranslation(['home', 'common', 'order']);

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
      className={`relative h-[110dvh] border-b-8 text-white ${initialSize <= 1280 ? 'bg-postcards bg-cover' : ''}`}
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

      <div className="left-column flex flex-col lg:items-end lg:pr-24">
        <h3 className="mb-12 text-3xl font-extrabold md:pr-0 lg:text-right lg:text-5xl">
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
      <div className="right-column flex flex-col items-start justify-start gap-4 lg:pl-24">
        <h4 className="text-2xl font-bold lg:text-3xl">
          {t('orderForm.choose')}
          <span className="text-red-500"> *</span>
        </h4>

        <OrderForm onSubmit={handleFormSubmit} />
      </div>
      {formData && showModal && (
        <OrderSuccessModal formData={formData} onClose={handleCloseModal} />
      )}
    </section>
  );
}
