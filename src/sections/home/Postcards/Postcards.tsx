'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PostcardCard } from './PostcardCard';
import { usePostcardsSelection } from '@/contexts/PostcardsSelectionContext';
import { LOCAL_STORAGE_KEY_RESERVED_CARDS, RESERVATIONS_EVENT } from '@/constants';
import postcards from '@/data/home/postcards.json';
import { getReservedSet } from '@/utils/reservations';
import { TCard } from '@/types';

export const Postcards = () => {
  const { t } = useTranslation('postcards');
  const { selectedCardIds, checkedCards, toggleById } = usePostcardsSelection();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleCardClick = (index: number) =>
    setExpandedIndex((prev) => (prev === index ? null : index));
  const handleAddButtonClick = (id: number) => toggleById(id);
  const [mobile, setMobile] = useState(false);
  const [reservedSet, setReservedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(max-width: 767px)');
      const apply = () => setMobile(mq.matches);
      apply();
      mq.addEventListener?.('change', apply);
      return () => mq.removeEventListener?.('change', apply);
    }
  }, []);

  useEffect(() => {
    setReservedSet(getReservedSet());

    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === LOCAL_STORAGE_KEY_RESERVED_CARDS) {
        setReservedSet(getReservedSet());
      }
    };
    window.addEventListener('storage', onStorage);

    const onReservations = () => setReservedSet(getReservedSet());
    window.addEventListener(RESERVATIONS_EVENT, onReservations);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(RESERVATIONS_EVENT, onReservations);
    };
  }, []);

  const GROWTH = mobile ? 2 : 0.5;
  const flexTargets = useMemo(() => {
    const cards = postcards.length;
    if (expandedIndex === null) return Array(cards).fill(1);
    const expanded = 1 + GROWTH;
    const shrunk = 1 - GROWTH / (cards - 1);
    return postcards.map((_, i) => (i === expandedIndex ? expanded : shrunk));
  }, [GROWTH, expandedIndex]);

  return (
    <section
      id="postcards"
      className="bg-dark-blue relative z-20 flex h-full flex-col items-center gap-y-8 border-b-8 border-b-white px-1 py-16 lg:px-0"
    >
      <div className="flex flex-col items-center gap-y-4">
        <h3 className="text-4xl font-extrabold md:text-6xl">{t('headline')}</h3>
        <span className="max-w-lg text-center text-xl font-semibold md:text-2xl">
          {t('sectionDescription')}
        </span>
      </div>

      <div className="flex w-full gap-x-1 md:max-w-6xl md:px-8 lg:gap-x-4">
        {postcards.map((card: TCard, index: number) => {
          const reserved = reservedSet.has(card.id);
          return (
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
              isMobile={mobile}
              reserved={reserved}
            />
          );
        })}
      </div>

      <p className="italic">{t('oneItemOnly')}</p>
    </section>
  );
};
