import React, { useState } from "react";
import { motion } from "framer-motion";
import { postcardImages } from "../../constants/postcardImages";
import { useTranslation } from "react-i18next";
import { CardType } from "../../types/cardType";

export function PostcardSlider() {
  const [t, i18n] = useTranslation();
  const initialSize = window.innerWidth;
  const [expandedIndex, setExpandedIndex] = useState<number[]>([
    initialSize <= 768 ? 0 : 1,
  ]);
  const [selectCard, setSelectCard] = useState<number[]>([]);


  const handleCardClick = (index: number) => {
    if (selectCard.includes(cardsArray[index].itemNo)) {
      return;
    }
    setExpandedIndex((prevIndecies) =>
      prevIndecies.includes(index)
        ? prevIndecies.filter((prevIndex) => prevIndex !== index)
        : [...prevIndecies, index]
    );
  };

  const handleAddButtonClick = (id: number) => {
    setSelectCard((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((prevId) => prevId !== id)
        : [...prevSelected, id]
    );
  };

  const cardSizesDesktop = {
    expanded: { width: "500px" },
    collapsed: { width: "300px" },
  };

  const cardSizesMobile = {
    expanded: { width: "300px" },
    collapsed: { width: "250px" },
  };

  const cardsArray = t("postcards.cards", { returnObjects: true });

  return (
    <section className="py-16">
      <div className="max-w-7xl">
        <div className="flex flex-col xl:flex-row justify-center xl:items-center px-10 gap-6">
          {cardsArray.map(
            (card: CardType, index: number) => (
              <motion.div
                key={card.itemNo}
                className={`card cursor-pointer h-[300px] md:h-[600px] bg-cover bg-center rounded-[20px] select-none`}
                variants={
                  initialSize <= 768 ? cardSizesMobile : cardSizesDesktop
                }
                initial="collapsed"
                animate={
                  expandedIndex.includes(index) ||
                  selectCard.includes(card.itemNo)
                    ? "expanded"
                    : "collapsed"
                }
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(index)}
                style={{
                  background: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.0)), url(${postcardImages[index]})`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`,
                }}
              >
                <div className="card-content h-full flex flex-col justify-end">
                  <div className="card-footer rounded-b-[20px] bg-opacity-75 min-h-[100px] flex flex-col items-center justify-center">
                    {!expandedIndex.includes(index) && (
                      <h4 className="text-xl font-extrabold text-white">
                        {card.name}
                      </h4>
                    )}
                    {(selectCard.includes(card.itemNo) ||
                      expandedIndex.includes(index)) && (
                      <div className="text-white flex flex-col">
                        <h4 className="text-xl font-extrabold text-center">
                          {`
                        ${card.name} - ${card.price} AMD
                      `}
                        </h4>
                        <span className="mt-2 text-center font-medium">
                          {card.description}
                        </span>
                        <span className="mb-8 text-center font-medium"></span>
                      </div>
                    )}
                    <button
                      className={`
                        rounded-full p-2 px-4 tracking-wider font-bold text-base my-8 self-center
                        md:text-xl md:p-4 md:px-8 bg-layout-dark-green
                        ${
                          selectCard.includes(card.itemNo)
                            ? "text-layout-dark-green bg-white"
                            : "bg-layout-dark-green text-white"
                        }
                        `}
                      onClick={() => handleAddButtonClick(card.itemNo)}
                    >
                      {selectCard.includes(card.itemNo)
                        ? card.addedButton
                        : card.addButton}
                    </button>
                  </div>
                </div>
              </motion.div>
            ),
            console.log(selectCard, expandedIndex)
          )}
        </div>
      </div>
    </section>
  );
}
