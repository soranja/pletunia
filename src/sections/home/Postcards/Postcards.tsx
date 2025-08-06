'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import postcards from '@/data/home/postcards.json';
import { initialSize } from '@/constants';
import { TCard } from '@/types';
import { PostcardCard } from './PostcardCard';

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
      className={`postcards ${initialSize <= 1280 ? 'bg-postcards bg-cover' : ''}`}
      id="postcards"
    >
      {initialSize >= 1280 && (
        <video
          src="/videos/postcards-bg-video.mp4"
          poster="/images/postcards-bg/postcards-bg-poster.jpg"
          autoPlay
          loop
          muted
          className="absolute -z-10 h-screen w-screen object-cover"
        />
      )}

      <div className="flex flex-col bg-white/[0.1] pt-16 lg:items-center">
        <h3 className="my-5 mt-0 mb-12 pl-10 text-4xl font-extrabold text-white md:mb-10 md:text-6xl lg:pl-0">
          {t('postcards.headline')}
        </h3>
        <span className="px-10 text-justify text-xl text-white md:text-2xl lg:px-0 lg:text-center lg:font-semibold">
          {t('postcards.sectionDescription')}
        </span>
        <div className="py-16">
          <div className="max-w-7xl">
            <div className="flex flex-col justify-center gap-6 px-10 xl:flex-row xl:items-center">
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
        </div>
      </div>
    </section>
  );
};

export default Postcards;
