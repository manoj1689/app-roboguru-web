import React from "react";
import { useTranslation } from "react-i18next";

function HomeFooter() {
  const { t } = useTranslation();

  return (
    <section className="flex w-full flex-col justify-center mt-8 bg-[#418BBB] border-t">
      <div className="flex flex-col px-4 py-8 text-center text-lg font-medium text-white">
        <p>{t("homeFooter.copyright")}</p>
        <p>{t("homeFooter.tagline")}</p>
      </div>
    </section>
  );
}

export default HomeFooter;
