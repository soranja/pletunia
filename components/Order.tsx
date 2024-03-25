/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from "react";
import { initialSize } from "@/constants/initialSize";

// translation
import { useTranslation } from "react-i18next";

// data
import postcards from "../data/postcards.json";
import { CardType } from "../types/cardType";

// redux
import { useAppSelector } from "../hooks/selector";
import { useActions } from "../hooks/actions";

// ui
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import Image from "next/image";

// local storage
import { useLocalStorage } from "@/hooks/useLocalStorage";

// id generator
import { customAlphabet } from "nanoid";

// type safety and guards
function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e;
}

interface FormDataType {
  selectedPostcards: string[];
  name: string;
  email: string;
  comment: string;
}

// the component
function OrderForm() {
  // ========================================

  // Data fetching, localStorage, and ID generating*
  const [state, setState] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  // formData for getItem (noId and address)
  const [formData, setFormData] = useState<FormDataType>();
  const localStorageKey = "formData";
  const { setItem, getItem, removeItem } = useLocalStorage(localStorageKey);

  // Click event: triggers submission, reset, localStorage; updates setState.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    // Collect data and send it to POST API
    await submitFormData();
    setState("ready");
    resetForm();
  }

  // Collect data from form, send it to POST API, and add it to localStorage
  async function submitFormData() {
    // formData for POST API and setItem
    const formData: Record<string, string | string[] | number[]> = {};

    Array.from(formRef.current?.elements || [])
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return;
        if (field.type === "checkbox") {
          if (!formData[field.name]) {
            formData[field.name] = [];
          }
          if ((field as HTMLInputElement).checked) {
            (formData[field.name] as string[]).push(field.value);
          }
        } else {
          formData[field.name] = field.value;
        }
      });

    // ID generating
    // * nano id is used temporarily, while we don't have a proper database
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nanoid = customAlphabet(alphabet, 10);

    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        selectedPostcards: selectedPostcards.map(
          (postcard: string) =>
            // Extra space at the beginning
            " " + postcard.charAt(0).toUpperCase() + postcard.slice(1)
        ),
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        lang: navigator.language,
        orderId: nanoid(),
        userAddress: formData.userAddress,
      }),
    });

    console.log(formData, selectedPostcards);

    // Add form data to local storage
    setItem(formData);
  }

  // Reset form
  function resetForm() {
    if (formRef.current) {
      formRef.current.reset();
    }

    // Clear selected postcards and their checkboxes (update Redux state)
    setSelectedCardsIds([]);
    setCheckedCards(new Array(postcards.length).fill(false));
  }

  useEffect(() => {
    // Retrieve form data from localStorage
    const formDataFromLocalStorage = getItem();
    setFormData(formDataFromLocalStorage);
    console.log(formDataFromLocalStorage);
    // if (formDataFromLocalStorage) {
    //
    // }
  }, [state]);

  // ========================================

  // Postcards updation
  const { checkedCards, selectedCardsIds } = useAppSelector(
    (state) => state.selector
  );
  const { setSelectedCardsIds, setCheckedCards } = useActions();

  // Duplicate handleAddButtonClick, so both components can update the same state
  const handleTick = (id: number) => {
    // Add cards Ids to an array, Ids are sorted
    setSelectedCardsIds(
      selectedCardsIds.includes(id)
        ? selectedCardsIds
            .filter((prevId) => prevId !== id)
            .sort(function (a, b) {
              return a - b;
            })
        : [...selectedCardsIds, id].sort(function (a, b) {
            return a - b;
          })
    );

    // Update checkedCards array
    function updatedCheckedCards(prevCheckedCards: boolean[]) {
      const updatedCheckedCardsArray = [...prevCheckedCards];
      const indexToUpdate = postcards.findIndex((card) => card.id === id);

      if (indexToUpdate !== -1) {
        updatedCheckedCardsArray[indexToUpdate] =
          !updatedCheckedCardsArray[indexToUpdate];
      }
      return updatedCheckedCardsArray;
    }

    setCheckedCards(updatedCheckedCards(checkedCards));
  };

  // Print names of selected postcards (relies on user's browser)
  const selectedPostcards = postcards
    .filter((card) => selectedCardsIds.includes(card.id))
    .map((card) =>
      navigator.language.includes("ru") ? card.nameRu : card.nameEn
    );

  // ========================================

  // Translation
  const { t }: any = useTranslation(["home", "common", "order"]);
  // 'any' for reason t func errors -- 'For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.'

  // ========================================

  // Email copying
  const [copied, setCopiedId] = useState<string>();

  return (
    <section
      className="order
      text-white flex flex-col pt-20 pb-20 px-10 pr-28
      lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:items-start"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url("/images/pages/green_girl.jpg")`,
        backgroundSize: `${initialSize <= 1168 ? "17%" : "14%"}`,
        backgroundPositionY: `67%`,
        backgroundPositionX: `49%`,
      }}
      id="order"
    >
      <div
        className="left-column 
        flex flex-col 
        lg:items-end lg:pr-24"
      >
        <h3
          className="text-3xl font-extrabold mb-12 
          md:pr-0 
          lg:text-5xl lg:text-right"
        >
          {t("orderForm.headline")}
        </h3>

        <img
          className="
          hidden rounded-r-3xl
          lg:block lg:w-5/12 xl:w-4/12"
          src="/images/pages/green_girl.jpg"
          alt="Green Girl"
        />
      </div>
      <div className="center-column lg:pl-24 flex flex-col gap-4 items-start justify-start">
        <h4 className="text-2xl lg:text-3xl font-bold">
          {t("orderForm.choose")}
        </h4>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="flex gap-x-6 flex-col md:flex-row">
            {postcards.map((card: CardType, index: number) => (
              <div key={card.id} className="flex gap-2 checked:bg-black">
                <input
                  type="checkbox"
                  className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
                  id={`${card.id}`}
                  name="selectedPostcards"
                  value={card.name}
                  checked={checkedCards[index]}
                  onChange={() => handleTick(card.id)}
                />
                <label htmlFor={`${card.id}`}>
                  {t(`postcards.cards.${card.name}.name` as const)}
                </label>
              </div>
            ))}
          </div>
          <Label htmlFor="name">{t("orderForm.name")}</Label>
          <Input id="name" name="name" />
          <Label htmlFor="email">{t("orderForm.email")}</Label>
          <Input id="email" name="email" />
          <Label htmlFor="userAddress">{t("orderForm.address")}</Label>
          <Input id="userAddress" name="userAddress" />
          <Label htmlFor="comment">{t("orderForm.comment")}</Label>
          <textarea
            id="comment"
            name="comment"
            className="text-black px-5 lg:w-80 py-5 rounded-xl"
          ></textarea>
          <button
            className="mt-8 rounded-2xl p-5 w-40 lg:w-80 tracking-wider bg-layout-blue-gray font-bold text-xl cursor-pointer"
            disabled={state === "loading"}
            onClick={getItem() && removeItem}
          >
            {state === "loading"
              ? `${t("common:buttons.orderInProgress")}`
              : `${t("common:buttons.orderButton")}!`}
          </button>
        </form>
      </div>
      {state === "ready" && (
        <div className="right-column flex flex-col gap-y-3 items-center text-center">
          <Image
            className="inline"
            src="/images/svgs-icons/email.svg"
            height={24}
            width={24}
            alt="email-icon"
          ></Image>
          <h4>
            {t("order:emailConfirmation.greeting", { user: formData?.name })}
          </h4>
          <h3>{t("order:emailConfirmation.thanks")}</h3>
          <p>
            {t("order:emailConfirmation.message", { email: formData?.email })}
          </p>
          <p>{t("order:emailConfirmation.notReceived")}</p>
          <span className="my-5 font-bold cursor-pointer">
            pletunia.orders@gmail.com
          </span>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText("pletunia.orders@gmail.com");
              setCopiedId("write-text");
            }}
          >
            {copied === "write-text"
              ? "Copied!"
              : t("order:emailConfirmation.copyEmailButton")}
          </button>
        </div>
      )}
    </section>
  );
}

export default OrderForm;
