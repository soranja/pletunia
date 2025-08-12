import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { PostcardCardProps } from '@/types/props';

export const PostcardCard: FC<PostcardCardProps> = ({
  card,
  index,
  isExpanded,
  selectedCardIds,
  checkedCards,
  flexGrowTarget,
  onCardClick,
  onAddButtonClick,
}) => {
  const { t } = useTranslation();

  const isSelected = selectedCardIds.includes(card.id);
  const isChecked = checkedCards[index];

  const variants = {
    expanded: { width: '100%', maxWidth: 520 },
    collapsed: { width: 260 },
  };

  return (
    <AnimatePresence>
      <motion.div
        key={card.id}
        className="relative cursor-pointer overflow-hidden rounded-[20px] border-[2px] border-white select-none"
        variants={variants}
        initial="collapsed"
        style={{ flexBasis: 0, minWidth: 0 }}
        animate={{ flexGrow: flexGrowTarget }}
        layout
        transition={{ layout: { type: 'spring', stiffness: 260, damping: 30 } }}
        onClick={() => onCardClick(index)}
      >
        {/* Card Image */}
        <div
          className="h-[450px] w-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0.1)), url(${card.imgUrl})`,
          }}
        />

        {/* Checked Dot */}
        {isChecked && (
          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white p-1 shadow-md"></div>
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
          <motion.div className="blur-cap pointer-events-auto flex flex-col items-center justify-center pt-18 pb-8 text-white">
            <div className="mb-4 flex flex-col items-center justify-center gap-y-1">
              <AnimatePresence initial={false} mode="wait">
                {isExpanded ? (
                  <motion.h4
                    key="name-expanded"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="text-xl font-extrabold"
                  >
                    {t(`postcards.cards.${card.name}.name`)}
                  </motion.h4>
                ) : (
                  <motion.h4
                    key="name-collapsed"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="text-xl font-extrabold"
                  >
                    {t(`postcards.cards.${card.name}.name`)}
                  </motion.h4>
                )}
              </AnimatePresence>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, delay: 0.08 }}
                  className="flex flex-col items-center gap-y-1"
                >
                  <h4 className="text-center text-xl font-extrabold">{`${card.price} AMD`}</h4>
                  <span className="text-center font-light italic">
                    {t(`postcards.cards.${card.name}.description`)}
                  </span>
                </motion.div>
              )}
            </div>
            <button
              className={`min-w-full py-2 text-base font-light md:py-2 md:text-lg ${
                isSelected ? 'text-layout-dark-green bg-white' : 'bg-layout-dark-green text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onAddButtonClick(card.id);
              }}
            >
              {isSelected ? t(`postcards.${card.addedButton}`) : t(`postcards.${card.addButton}`)}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
