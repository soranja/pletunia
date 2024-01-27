import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import backgroundVideo from "../data/animations/postcards-bg-video.mp4";
import backgroundVideoPoster from "../data/animations/postcards-bg-poster.jpg";

// PostcardSlider
import { motion } from "framer-motion";
import { CardType } from "../types/cardType";
import { SelectedCards } from "../types/postcardTypes";
import i18n from "../i18n";
// import { cardsArray } from "../../constants/cardsArray";
import postcards from "../data/postcards.json";

const Postcards: React.FC<SelectedCards> = ({ selectedIds }) => {
  // Translation function
  const { t }: any = useTranslation("translation", { i18n });
  // 'any' for reason t func errors -- 'For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.'

  // Expanded cards, not selected; Default is set by screen size
  const initialSize = window.innerWidth;
  const [expandedIndex, setExpandedIndex] = useState<number[]>([
    initialSize <= 768 ? 0 : 1,
  ]);

  // Selected cards arrays
  // const [selectedCards, setSelectedCards] = useState<SelectedCards>({
  //   selectedIds: new Array(postcards.length).fill(9999),
  //   areSelected: new Array(postcards.length).fill(false),
  // });

  // Handles cards expansion and collapse
  const handleCardClick = (index: number) => {
    if (selectedIds.includes(postcards[index].id)) {
      return;
    }
    setExpandedIndex((prevIndecies) =>
      prevIndecies.includes(index)
        ? prevIndecies.filter((prevIndex) => prevIndex !== index)
        : [...prevIndecies, index]
    );
  };

  // Handles cards selections and syncs them to ORDER
  const handleAddButtonClick = (id: number) => {
    // setSelectedCards((prevSelected: SelectedCards) => {
    //   const updatedSelectedIds = prevSelected.selectedIds.includes(id)
    //     ? prevSelected.selectedIds.map((value: number, i: number) =>
    //         i === id ? 9999 : value
    //       )
    //     : prevSelected.selectedIds.map((value: number, i: number) =>
    //         i === id ? id : value
    //       );
    //   const updatedAreSelected = prevSelected.selectedIds.includes(id)
    //     ? prevSelected.areSelected.map((value: boolean, i: number) =>
    //         i === id ? false : value
    //       )
    //     : prevSelected.areSelected.map((value: boolean, i: number) =>
    //         i === id ? true : value
    //       );
    //   const selectionMap: Record<number, boolean> = {};
    //   updatedSelectedIds
    //     .filter((value) => typeof value === "number")
    //     .forEach((selectedId) => {
    //       selectionMap[selectedId] = true;
    //     });
    //   prevSelected.selectedIds
    //     .filter((prevId) => !updatedSelectedIds.includes(prevId))
    //     .forEach((deselectedId) => {
    //       if (typeof deselectedId === "number") {
    //         selectionMap[deselectedId] = false;
    //       }
    //     });
    //   updateCardsData(prevSelected.areSelected);
    //   return {
    //     selectedIds: updatedSelectedIds,
    //     areSelected: updatedAreSelected,
    //   };
    // });
  };

  // Cards size - expanded / collapsed for desktop
  const cardSizesDesktop = {
    expanded: { width: "500px" },
    collapsed: { width: "300px" },
  };

  // Cards size - expanded / collapsed for mobile
  const cardSizesMobile = {
    expanded: { width: "300px" },
    collapsed: { width: "250px" },
  };

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
        <div className="py-16">
          <div className="max-w-7xl">
            <div className="flex flex-col xl:flex-row justify-center xl:items-center px-10 gap-6">
              {postcards.map((card: CardType, index: number) => (
                <motion.div
                  key={card.id}
                  className={`card cursor-pointer h-[300px] md:h-[600px] bg-cover bg-center rounded-[20px] select-none`}
                  variants={
                    initialSize <= 768 ? cardSizesMobile : cardSizesDesktop
                  }
                  initial="collapsed"
                  animate={
                    expandedIndex.includes(index) ||
                    selectedIds.includes(card.id)
                      ? "expanded"
                      : "collapsed"
                  }
                  transition={{ duration: 0.5 }}
                  onClick={() => handleCardClick(index)}
                  style={{
                    background: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.0)), url(${card.imgUrl})`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`,
                  }}
                >
                  <div className="card-content h-full flex flex-col justify-end">
                    <div className="card-footer rounded-b-[20px] bg-opacity-75 min-h-[100px] flex flex-col items-center justify-center">
                      {!expandedIndex.includes(index) &&
                        !selectedIds.includes(card.id) && (
                          <h4 className="text-xl font-extrabold text-white">
                            {t(`postcards.cards.${card.name}.name` as const)}
                          </h4>
                        )}

                      {(selectedIds.includes(card.id) ||
                        expandedIndex.includes(index)) && (
                        <div className="text-white flex flex-col">
                          <h4 className="text-xl font-extrabold text-center">
                            {`${t(
                              `postcards.cards.${card.name}.name` as const
                            )} - ${card.price} AMD`}
                          </h4>
                          <span className="mt-2 text-center font-medium">
                            {t(
                              `postcards.cards.${card.description}.description` as const
                            )}
                          </span>
                          <span className="mb-8 text-center font-medium"></span>
                        </div>
                      )}
                      <button
                        className={`
                        rounded-full p-2 px-4 tracking-wider font-bold text-base my-8 self-center
                        md:text-xl md:p-4 md:px-8 bg-layout-dark-green
                        ${
                          selectedIds.includes(card.id)
                            ? "text-layout-dark-green bg-white"
                            : "bg-layout-dark-green text-white"
                        }
                        `}
                        onClick={() => handleAddButtonClick(card.id)}
                      >
                        {selectedIds.includes(card.id)
                          ? t(`postcards.${card.addedButton}` as const)
                          : t(`postcards.${card.addButton}` as const)}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Postcards;
