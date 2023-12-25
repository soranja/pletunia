import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import backgroundVideo from "../../data/animations/postcards-bg-video.mp4";
import backgroundVideoPoster from "../../data/animations/postcards-bg-poster.jpg";

// PostcardSlider
import { motion } from "framer-motion";
import { postcardImages } from "../../constants/postcardImages";
import { CardType } from "../../types/cardType";

// import { PostcardSlider } from "../../components/PostcardSlider/PostcardSlider";

interface PostcardProps {
  updateCardsData: (selectionMap: Record<number, boolean>) => void;
}

const Postcards: React.FC<PostcardProps> = ({ updateCardsData }) => {
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
    setSelectCard((prevSelected) => {
      const updatedSelected = prevSelected.includes(id)
        ? prevSelected.filter((prevId) => prevId !== id)
        : [...prevSelected, id];

      const selectionMap: Record<number, boolean> = {};
      updatedSelected.forEach((selectedId) => {
        selectionMap[selectedId] = true;
      });

      prevSelected
        .filter((prevId) => !updatedSelected.includes(prevId))
        .forEach((deselectedId) => {
          selectionMap[deselectedId] = false;
        });

      updateCardsData(selectionMap);
      return updatedSelected;
    });
  };

  useEffect(() => {
    const selectionMap: Record<number, boolean> = {};
    selectCard.forEach((id) => {
      selectionMap[id] = true;
    });
    updateCardsData(selectionMap);
  }, [selectCard]);

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
    <section
      className={`${initialSize <= 1280 ? "bg-postcards bg-cover" : ""}`}
    >
      {initialSize >= 1280 && (
        <video
          src={backgroundVideo}
          poster={backgroundVideoPoster}
          autoPlay
          loop
          muted
          className="object-cover absolute h-screen w-screen -z-10"
        ></video>
      )}

      <div
        className="pt-16 flex flex-col bg-white/[0.1]  
        lg:items-center"
        id="postcards"
      >
        <h3
          className="text-white text-4xl pl-10 font-extrabold my-5 mb-12
        md:text-6xl md:mb-10 mt-0
        lg:pl-0"
        >
          {t("postcards.headline")}
        </h3>
        <span
          className="text-white text-xl text-justify lg:text-center px-10 
        lg:px-0 md:text-2xl
        lg:font-semibold"
        >
          {t("postcards.sectionDescription")}
        </span>
        {/* <PostcardSlider></PostcardSlider> */}
        <div className="py-16">
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
                        {!expandedIndex.includes(index) &&
                          !selectCard.includes(card.itemNo) && (
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
                console.log("POSTCARD:", selectCard)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Postcards;
