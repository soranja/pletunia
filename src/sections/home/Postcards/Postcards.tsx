'use client';

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PostcardCard } from './PostcardCard';
import OrderImages from '@/data/home/order.json';
import postcards from '@/data/home/postcards.json';
import { initialSize } from '@/constants';
import { TCard } from '@/types';

const GROWTH = 0.3;

const Postcards = () => {
  const { t } = useTranslation();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCardsIds, setSelectedCardsIds] = useState<number[]>([]);
  const [checkedCards, setCheckedCards] = useState<boolean[]>(postcards.map(() => false));

  const handleCardClick = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
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

  const flexTargets = useMemo(() => {
    const cards = postcards.length;
    if (expandedIndex === null) return Array(cards).fill(1);
    const expanded = 1 + GROWTH;
    const shrunk = 1 - GROWTH / (cards - 1);
    return postcards.map((_, i) => (i === expandedIndex ? expanded : shrunk));
  }, [expandedIndex]);

  return (
    <section
      id="postcards"
      className="bg-paper-tile bg-layout-dark-blue relative z-20 flex h-full flex-col items-center gap-y-8 py-16 bg-blend-multiply"
    >
      <div className="flex flex-col items-center gap-y-4">
        <h3 className="text-4xl font-extrabold md:text-6xl">{t('postcards.headline')}</h3>
        <span className="max-w-lg text-center text-xl font-semibold md:text-2xl">
          {t('postcards.sectionDescription')}
        </span>
      </div>

      <div className="flex w-full gap-4 md:max-w-6xl md:px-8">
        {postcards.map((card: TCard, index: number) => (
          <PostcardCard
            key={card.id}
            card={card}
            index={index}
            isExpanded={expandedIndex === index}
            selectedCardsIds={selectedCardsIds}
            checkedCards={checkedCards}
            onCardClick={handleCardClick}
            onAddButtonClick={handleAddButtonClick}
            flexGrowTarget={flexTargets[index]}
          />
        ))}
      </div>
    </section>
  );
};

export default Postcards;
