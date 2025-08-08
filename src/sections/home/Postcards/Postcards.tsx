'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PostcardCard } from './PostcardCard';

import postcards from '@/data/home/postcards.json';
import { initialSize } from '@/constants';
import { TCard } from '@/types';

const Postcards = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number[]>([initialSize <= 768 ? 0 : 1]);
  const [selectedCardsIds, setSelectedCardsIds] = useState<number[]>([]);
  const [checkedCards, setCheckedCards] = useState<boolean[]>(postcards.map(() => false));

  const handleCardClick = (index: number) => {
    if (selectedCardsIds.includes(postcards[index].id)) return;
    setExpandedIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAddButtonClick = (id: number) => {
    setSelectedCardsIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setCheckedCards((prev) => {
      const i = postcards.findIndex((c) => c.id === id);
      if (i < 0) return prev;
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <section
      className={`relative z-20 h-[110dvh] text-white ${initialSize <= 1280 ? 'bg-postcards bg-cover' : ''}`}
      id="postcards"
    >
      {initialSize >= 1280 && (
        <video
          src="/videos/postcards-bg-video.mp4"
          poster="/images/postcards-bg/postcards-bg-poster.jpg"
          autoPlay
          loop
          muted
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
      )}

      <div className="relative inset-0 flex h-full flex-col gap-y-8 border-2 border-amber-400 py-16 lg:items-center">
        <div className="flex flex-col items-center gap-y-4">
          <h3 className="text-4xl font-extrabold md:text-6xl">{t('postcards.headline')}</h3>
          <span className="max-w-lg text-xl font-semibold md:text-2xl lg:text-center">
            {t('postcards.sectionDescription')}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-6 lg:flex-row lg:items-center">
          {postcards.map((card: TCard, index: number) => (
            <PostcardCard
              key={card.id}
              card={card}
              index={index}
              expandedIndex={expandedIndex}
              selectedCardsIds={selectedCardsIds}
              checkedCards={checkedCards}
              onCardClick={handleCardClick}
              onAddButtonClick={handleAddButtonClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Postcards;
