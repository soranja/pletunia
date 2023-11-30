import React, { useState } from "react";
import { motion } from "framer-motion";
// import translation from "../../../public/locales/en/translation.json";

import { postcardImages } from "../../constants/postcardImages";
import { postcardPrices } from "../../constants/postcardPrices";
import { postcardNames } from "../../constants/postcardNames";
import { cardDescriptions } from "../../constants/postcardDesctiptions";
import { postcardNumbers } from "../../constants/itemNumbers";

import { useTranslation } from "react-i18next";
import { title } from "process";

type CardType = {
  name: string;
  description: string;
  itemNo: string;
  price: string;
};

// names, prices, middle index are hadrcoded, is it ok if i dont plan to expand the slider, or...

function PostcardSlider() {
  const [t, i18n] = useTranslation();
  const initialSize = window.innerWidth;
  const [expandedIndex, setExpandedIndex] = useState<null | number>(
    initialSize <= 768 ? 0 : 1
  );
  // 0 and 1 is for the middle card expanded, LAZY I KNOW, but OK FOR NOW
  const handleCardClick = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const cardSizesDesktop = {
    expanded: { width: "500px" },
    collapsed: { width: "300px" },
  };

  const cardSizesMobile = {
    expanded: { width: "300px" },
    collapsed: { width: "250px" },
  };

  // const cards = t("postcards.cards" as unknown as TemplateStringsArray);
  // const cards = JSON.stringify(t("postcards.cards", { returnObjects: true }));
  // const cardsArray = [JSON.parse(cards)];
  const cardsArray = t("postcards.cards", { returnObjects: true });

  return (
    <section className="py-16">
      <div className="max-w-7xl">
        <div className="flex flex-col xl:flex-row justify-center items-center gap-6">
          {/* {postcardNames.map((cardName: string, index: number) => (
            <motion.div
              key={cardName}
              className={`card cursor-pointer h-[300px] md:h-[600px] bg-cover bg-center rounded-[20px] ${
                index === expandedIndex ? "expanded" : ""
              }`}
              variants={initialSize <= 768 ? cardSizesMobile : cardSizesDesktop}
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
                      {postcardNames[index]}
                    </h4>
                  )}

                  {index === expandedIndex && (
                    <div className="text-white flex flex-col">
                      <h4 className="text-xl font-extrabold text-center">
                        {`
                        ${postcardNames[index]} - ${postcardPrices[index]}`}
                      </h4>
                      <span className="mt-2 text-center font-medium">
                        {cardDescriptions[index]}
                      </span>
                      <span className="mb-4 text-center font-medium">
                        {postcardNumbers[index]}
                      </span>
                      <button
                        className="rounded-full p-2 px-4 tracking-wider bg-layout-dark-green font-bold text-base mb-8 self-center
                        md:text-xl md:p-4 md:px-8"
                      >
                        Odrer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))} */}

          {cardsArray.map((card: CardType, index: number) => (
            <motion.div
              key={card.itemNo}
              className={`card cursor-pointer h-[300px] md:h-[600px] bg-cover bg-center rounded-[20px] ${
                index === expandedIndex ? "expanded" : ""
              }`}
              variants={initialSize <= 768 ? cardSizesMobile : cardSizesDesktop}
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
                      <span className="mb-4 text-center font-medium">
                        {card.itemNo}
                      </span>
                      <button
                        className="rounded-full p-2 px-4 tracking-wider bg-layout-dark-green font-bold text-base mb-8 self-center
              md:text-xl md:p-4 md:px-8"
                      >
                        Odrer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* {t("postcards.cards" as unknown as TemplateStringsArray).map((item :) => (
            t("postcards.cards" as unknown as TemplateStringsArray)
          ))} */}
          {/* {(
            t("cards", {
              returnObjects: true,
            }) as string[]
          ).map((card: string, index: number) => (
            <motion.div
              key={cards.name}
              className={`card cursor-pointer h-[300px] md:h-[600px] bg-cover bg-center rounded-[20px] ${
                index === expandedIndex ? "expanded" : ""
              }`}
              variants={initialSize <= 768 ? cardSizesMobile : cardSizesDesktop}
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
                      {cards[index].name}
                    </h4>
                  )}

                  {index === expandedIndex && (
                    <div className="text-white flex flex-col">
                      <h4 className="text-xl font-extrabold text-center">
                        {`
                        ${postcardNames[index]} - ${postcardPrices[index]}`}
                      </h4>
                      <span className="mt-2 text-center font-medium">
                        {cardDescriptions[index]}
                      </span>
                      <span className="mb-4 text-center font-medium">
                        {postcardNumbers[index]}
                      </span>
                      <button
                        className="rounded-full p-2 px-4 tracking-wider bg-layout-dark-green font-bold text-base mb-8 self-center
                        md:text-xl md:p-4 md:px-8"
                      >
                        Odrer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))} */}
        </div>
      </div>
    </section>
  );
}

export default PostcardSlider;
