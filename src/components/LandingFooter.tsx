import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

function LandingFooter() {
  const { t } = useTranslation();

  return (
    <div>
      {/* ========== LANDING FOOTER ========== */}
      <footer className="mt-4 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1 - Product */}
          <div>
            <span className="font-bold mb-3 text-lg">{t("landingFooter.product.title")}</span>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold"><Link href="/Careers" className="hover:underline">{t("landingFooter.product.careers")}</Link></li>
              <li className="font-semibold"><Link href="/Contactus" className="hover:underline">{t("landingFooter.product.contact")}</Link></li>
              <li className="font-semibold"><Link href="/Community" className="hover:underline">{t("landingFooter.product.community")}</Link></li>
            </ul>
          </div>

          {/* Column 2 - Resources */}
          <div>
            <span className="font-bold mb-3 text-lg">{t("landingFooter.resources.title")}</span>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold"><Link href="/FAQ" className="hover:underline">{t("landingFooter.resources.faq")}</Link></li>
              <li className="font-semibold"><Link href="/Disclaimer" className="hover:underline">{t("landingFooter.resources.disclaimer")}</Link></li>
              <li className="font-semibold"><Link href="#resources" className="hover:underline">{t("landingFooter.resources.blog")}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <span className="font-bold mb-3 text-lg">{t("landingFooter.company.title")}</span>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold"><Link href="/Aboutus" className="hover:underline">{t("landingFooter.company.about")}</Link></li>
              <li className="font-semibold"><Link href="/Term&condtn" className="hover:underline">{t("landingFooter.company.terms")}</Link></li>
              <li className="font-semibold"><Link href="/Privacypolicy" className="hover:underline">{t("landingFooter.company.privacy")}</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <span className="font-bold mb-3 text-lg">{t("landingFooter.contact.title")}</span>
            <p className="text-sm text-gray-700 mb-2">
              <span className="text-md font-semibold">{t("landingFooter.contact.email")}: </span>
              <Link href="mailto:admin@eramlabs.com" className="text-cyan-500 italic text-lg font-semibold hover:underline">
                admin@eramlabs.com
              </Link>
            </p>
            <p className="text-sm text-gray-700 mb-2 font-semibold">{t("landingFooter.contact.phone")}: +91-8750860676</p>
            <p className="text-sm text-gray-700 font-semibold">{t("landingFooter.contact.address")}: 163 - GF Pocket 2 Jasola, New Delhi 1100025</p>
          </div>

        </div>

        <div className="bg-[#418BBB] text-sm text-center py-3">
          <p className="text-white">© 2024 RoboGuru. {t("landingFooter.copyright")}</p>
          <p className="text-white">{t("landingFooter.slogan")}</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingFooter;
