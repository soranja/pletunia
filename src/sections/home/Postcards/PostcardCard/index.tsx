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
  isMobile,
}) => {
  const { t } = useTranslation('postcards');

  const isSelected = selectedCardIds.includes(card.id);
  const isChecked = checkedCards[index];

  const variants = {
    expanded: { width: '100%', maxWidth: isMobile ? undefined : 520 },
    collapsed: { width: isMobile ? 85 : 260 },
  };

  const showMobileDetails = isExpanded;
  const showDesktopNameAlways = true;
  const showDesktopButtonAlways = true;

  return (
    <AnimatePresence>
      <motion.div
        key={card.id}
        className="relative cursor-pointer overflow-hidden border-[2px] border-white bg-black/10 select-none"
        variants={variants}
        initial="collapsed"
        style={{ flexBasis: 0, minWidth: 0 }}
        animate={{ flexGrow: flexGrowTarget }}
        layout
        transition={{ layout: { type: 'spring', stiffness: 260, damping: 30 } }}
        onClick={() => onCardClick(index)}
      >
        {/* Card Image (shorter on mobile) */}
        <div
          className="h-[300px] w-full bg-cover bg-center md:h-[450px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.38), rgba(0,0,0,0.12)), url(${card.imgUrl})`,
          }}
        />

        {/* Checked Dot — centered on mobile, top-right on desktop */}
        {isChecked && (
          <div
            className="absolute top-2 left-1/2 h-6 w-6 -translate-x-1/2 bg-white p-1 shadow-md md:right-2 md:left-auto md:translate-x-0"
            aria-label="Added"
          />
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
          <motion.div className="blur-cap pointer-events-auto flex flex-col items-center justify-center pt-16 pb-6 text-white md:pt-18 md:pb-8">
            <div className="mb-3 flex flex-col items-center justify-center gap-y-1 md:mb-4">
              <AnimatePresence initial={false} mode="wait">
                {(showMobileDetails || showDesktopNameAlways) && (
                  <motion.h4
                    key={`name-${isExpanded ? 'expanded' : 'collapsed'}`}
                    initial={{ opacity: 0, y: isExpanded ? 4 : -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: isExpanded ? -4 : 4 }}
                    transition={{ duration: 0.18 }}
                    className={`text-base font-extrabold md:text-xl ${
                      // mobile: hide when not expanded
                      isExpanded ? '' : 'hidden md:block'
                    }`}
                  >
                    {t(`cards.${card.name}.name`)}
                  </motion.h4>
                )}
              </AnimatePresence>

              {/* Expanded-only details (mobile & desktop) */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, delay: 0.08 }}
                  className="flex flex-col items-center gap-y-1"
                >
                  <h4 className="text-center text-lg font-extrabold md:text-xl">{`${card.price} AMD`}</h4>
                  <span className="px-3 text-center text-sm font-light italic md:px-4 md:text-base">
                    {t(`cards.${card.name}.description`)}
                  </span>
                </motion.div>
              )}
            </div>

            {/* ADD / ADDED button:
                - Mobile: show only for expanded
                - Desktop: always show  */}
            {(showMobileDetails || showDesktopButtonAlways) && (
              <button
                className={` ${isExpanded ? 'block' : 'hidden md:block'} min-w-full py-2 text-sm md:py-2 md:text-lg ${isSelected ? 'text-dark-green bg-white' : 'bg-dark-green text-white'} `}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddButtonClick(card.id);
                }}
              >
                {isSelected ? t(`${card.addedButton}`) : t(`${card.addButton}`)}
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
