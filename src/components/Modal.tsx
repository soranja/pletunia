import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Modal({
  open,
  children,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation("translation", { i18n });
  return (
    <div className={open ? "" : "hidden"}>
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                {t("modals.close")}
              </button>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col items-center gap-y-4">
              <div className="flex items-center justify-center">
                <img
                  className="rounded-full h-24 w-24 sm:h-36 sm:w-36"
                  src="https://ferret-pet.ru/wp-content/uploads/6/b/5/6b5f022448da0963245cbf3e0878dd0d.jpeg"
                  alt=""
                />
              </div>
              <div className="sm:flex sm:items-start pb-2">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <p className="text-sm text-justify text-gray-500">
                    {children}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
