import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import postcards from '@/data/home/postcards.json';
import OrderImages from '@/data/home/order.json';
import { initialSize } from '@/constants';
import OrderForm from './OrderForm';
import OrderSuccessModal from './OrderSuccessModal';
import { useActions } from '@/hooks/useRedux';
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
      className="order grid-cols-order lg:grid-rows-order flex flex-col px-10 pt-20 pr-28 pb-20 text-white lg:grid lg:items-start lg:pl-0 lg:text-xl"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url(${OrderImages.greenGirl.imgUrl})`,
        backgroundSize: `${initialSize <= 1168 ? '30%' : '14%'}`,
      }}
      id="order"
    >
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
