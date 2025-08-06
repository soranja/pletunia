import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import postcards from '@/data/home/postcards.json';
import { initialSize } from '@/constants';
import { useAppSelector, useActions } from '@/hooks/useRedux';
import { TCard } from '@/types';
import { PostcardCardProps } from '@/types/props';

export const PostcardCard: FC<PostcardCardProps> = ({
  card,
  index,
  expandedIndex,
  selectedCardsIds,
  checkedCards,
  onCardClick,
  onAddButtonClick,
}) => {
  const { t } = useTranslation();

  const isExpanded = expandedIndex.includes(index);
  const isSelected = selectedCardsIds.includes(card.id);
  const isChecked = checkedCards[index];

  const variants =
    window.innerWidth <= 768
      ? { expanded: { width: '300px' }, collapsed: { width: '250px' } }
      : { expanded: { width: '500px' }, collapsed: { width: '300px' } };

  return (
    <motion.div
      key={card.id}
      className="card h-[300px] cursor-pointer rounded-[20px] bg-cover bg-center select-none md:h-[600px]"
      variants={variants}
      initial="collapsed"
      animate={isExpanded || isSelected ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.5 }}
      onClick={() => onCardClick(index)}
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.0)), url(${card.imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {isChecked && (
        <div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow-md">
          <p className="text-layout-dark-green h-6 w-6" />
        </div>
      )}
      <div className="card-content flex h-full flex-col justify-end">
        <div className="card-footer bg-opacity-75 flex min-h-[100px] flex-col items-center justify-center rounded-b-[20px]">
          {!isExpanded && !isSelected && (
            <h4 className="text-xl font-extrabold text-white">
              {t(`postcards.cards.${card.name}.name`)}
            </h4>
          )}
          {(isExpanded || isSelected) && (
            <div className="flex flex-col text-white">
              <h4 className="text-center text-xl font-extrabold">
                {`${t(`postcards.cards.${card.name}.name`)} - ${card.price} AMD`}
              </h4>
              <span className="mt-2 text-center font-medium">
                {t(`postcards.cards.${card.description}.description`)}
              </span>
            </div>
          )}
          <button
            className={`bg-layout-dark-green my-8 self-center rounded-full p-2 px-4 text-base font-bold tracking-wider md:p-4 md:px-8 md:text-xl ${
              isSelected ? 'text-layout-dark-green bg-white' : 'bg-layout-dark-green text-white'
            }`}
            onClick={() => onAddButtonClick(card.id)}
          >
            {isSelected ? t(`postcards.${card.addedButton}`) : t(`postcards.${card.addButton}`)}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
