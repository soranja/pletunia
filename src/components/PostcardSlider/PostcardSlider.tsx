import React, { useState } from "react";
import { motion } from "framer-motion";
import { postcardImages } from "../../constants/postcardImages";
import { useTranslation } from "react-i18next";
import { CardType } from "../../types/cardType";

function PostcardSlider() {
  const [t, i18n] = useTranslation();
  const initialSize = window.innerWidth;
  const [expandedIndex, setExpandedIndex] = useState<null | number>(
    initialSize <= 768 ? 0 : 1
  );
  const [addButtonText, toggleAddButtonText] = useState(true);
  const [selectCard, setSelectCard] = useState(0);

  const handleCardClick = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  // const handleAddedCard = () => {
  // setExpandedIndex(expandedIndex);
  // toggleAddButtonText(!addButtonText);
  // () => toggleAddButtonText(!addButtonText)
  // };

  const handleAddButtonClick = (id: number) => {
    setSelectCard(id);
    toggleAddButtonText(!addButtonText);

    // ??? how to make it work ???
    // - keep the crad expanded, select several cards
    setExpandedIndex(id === expandedIndex ? id : -1);

    console.log(id, addButtonText, expandedIndex);
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
                className={`card cursor-pointer h-[300px] md:h-[600px] bg-cover bg-center rounded-[20px] select-none ${
                  index === expandedIndex ? "expanded" : ""
                }`}
                variants={
                  initialSize <= 768 ? cardSizesMobile : cardSizesDesktop
                }
                initial="collapsed"
                animate={index === expandedIndex ? "expanded" : "collapsed"}
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
                    {index !== expandedIndex && (
                      <h4 className="text-xl font-extrabold text-white">
                        {card.name}
                      </h4>
                    )}

                    {index === expandedIndex && (
                      <div className="text-white flex flex-col">
                        <h4 className="text-xl font-extrabold text-center">
                          {`
              ${card.name} - ${card.price}`}
                        </h4>
                        <span className="mt-2 text-center font-medium">
                          {card.description}
                        </span>
                        <span className="mb-8 text-center font-medium"></span>
                        <button
                          className={`
                        rounded-full p-2 px-4 tracking-wider font-bold text-base mb-8 self-center
                        md:text-xl md:p-4 md:px-8 bg-layout-dark-green
                        ${
                          selectCard === card.itemNo
                            ? "text-layout-dark-green bg-white"
                            : "bg-layout-dark-green"
                        }
                        `}
                          onClick={() => handleAddButtonClick(card.itemNo)}
                        >
                          {selectCard === card.itemNo
                            ? card.addedButton
                            : card.addButton}
                          {/* {addButtonText ? card.addButton : card.addedButton} */}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ),
            console.log(cardsArray)
          )}
        </div>
      </div>
    </section>
  );
}

export default PostcardSlider;

/*

                        ${
                          addButtonText
                            ? "bg-layout-dark-green"
                            : "text-layout-dark-green bg-white"
                        }

onClick={handleAddedCard}
{addButtonText ? t("addButton") : t("addedButton")}

how to choose particular card, change it to "added" and keep the other intact + the expanded card

 */
