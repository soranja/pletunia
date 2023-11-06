import React from "react";
import { useTranslation } from "react-i18next";

function Copyright() {
  const [t, i18n] = useTranslation();
  return (
    <div className="flex flex-col bg-layout-dark-green items-center">
      <hr className="border-b-0 border-black w-[300px] lg:w-[800px]" />
      <span className="text-white  text-sm text-center py-4">
        {t("copyright")} &copy;
      </span>
    </div>
  );
}

export default Copyright;
