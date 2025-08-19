import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderForm } from './OrderForm';
import { OrderSuccessModal } from './OrderSuccessModal';
import { TFormData } from '@/types';

export const Order = () => {
  const { t } = useTranslation('order');

  const [formData, setFormData] = useState<TFormData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(min-width: 1024px)');
      const update = () => setShowVideo(mq.matches);
      update();
      mq.addEventListener?.('change', update);
      return () => mq.removeEventListener?.('change', update);
    }
  }, []);

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
      className={`bg-postcards relative flex flex-col items-center justify-center border-b-8 bg-cover py-10 text-white lg:bg-none`}
      id="order"
    >
      {showVideo && (
        <video
          src="/videos/postcards-bg-video.mp4"
          poster="/images/bg/postcards.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
        />
      )}

      <div className="z-10 my-10 flex flex-col items-center justify-center gap-y-8 lg:w-1/3">
        <h3 className="mb-4 text-4xl font-extrabold md:text-6xl">{t('headline')}</h3>

        <OrderForm onSubmit={handleFormSubmit} />
      </div>

      {formData && showModal && (
        <OrderSuccessModal formData={formData} onClose={handleCloseModal} />
      )}
    </section>
  );
};
