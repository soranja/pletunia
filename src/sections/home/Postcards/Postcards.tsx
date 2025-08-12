'use client';

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PostcardCard } from './PostcardCard';
import postcards from '@/data/home/postcards.json';
import { usePostcardsSelection } from '@/contexts/PostcardsSelectionContext';

import { TCard } from '@/types';

const Postcards = () => {
  const { t } = useTranslation();
  const { selectedCardIds, checkedCards, toggleById } = usePostcardsSelection();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleCardClick = (index: number) =>
    setExpandedIndex((prev) => (prev === index ? null : index));
  const handleAddButtonClick = (id: number) => toggleById(id);

  const GROWTH = 0.3;
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
      className="bg-paper-tile bg-layout-dark-blue relative z-20 flex h-full flex-col items-center gap-y-8 border-b-8 border-b-white py-16 bg-blend-multiply"
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
            selectedCardIds={selectedCardIds}
            checkedCards={checkedCards}
            onCardClick={handleCardClick}
            onAddButtonClick={handleAddButtonClick}
            flexGrowTarget={flexTargets[index]}
          />
        ))}
      </div>

      <p className="italic">{t('postcards.oneItemOnly')}</p>
    </section>
  );
};

export default Postcards;
