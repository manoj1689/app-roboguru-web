import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

function LandingFooter() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {/* ========== LANDING FOOTER ========== */}
      <footer className="mt-4 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1 - Product */}
          <div>
            <span className="font-bold mb-3 text-lg">
              {mounted ? t("landingFooter.product.title") : "Loading..."}
            </span>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold">
                <Link href="/Careers" className="hover:underline">
                  {mounted ? t("landingFooter.product.careers") : "Loading..."}
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="/Contactus" className="hover:underline">
                  {mounted ? t("landingFooter.product.contact") : "Loading..."}
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="/Community" className="hover:underline">
                  {mounted ? t("landingFooter.product.community") : "Loading..."}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Resources */}
          <div>
            <span className="font-bold mb-3 text-lg">
              {mounted ? t("landingFooter.resources.title") : "Loading..."}
            </span>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold">
                <Link href="/FAQ" className="hover:underline">
                  {mounted ? t("landingFooter.resources.faq") : "Loading..."}
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="/Disclaimer" className="hover:underline">
                  {mounted ? t("landingFooter.resources.disclaimer") : "Loading..."}
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="#resources" className="hover:underline">
                  {mounted ? t("landingFooter.resources.blog") : "Loading..."}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <span className="font-bold mb-3 text-lg">
              {mounted ? t("landingFooter.company.title") : "Loading..."}
            </span>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold">
                <Link href="/Aboutus" className="hover:underline">
                  {mounted ? t("landingFooter.company.about") : "Loading..."}
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="/Term&condtn" className="hover:underline">
                  {mounted ? t("landingFooter.company.terms") : "Loading..."}
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="/Privacypolicy" className="hover:underline">
                  {mounted ? t("landingFooter.company.privacy") : "Loading..."}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <span className="font-bold mb-3 text-lg">
              {mounted ? t("landingFooter.contact.title") : "Loading..."}
            </span>
            <p className="text-sm text-gray-700 mb-2">
              <span className="text-md font-semibold">
                {mounted ? t("landingFooter.contact.email") : "Loading..."}: 
              </span>
              <Link
                href="mailto:admin@eramlabs.com"
                className="text-cyan-500 italic text-lg font-semibold hover:underline"
              >
                admin@eramlabs.com
              </Link>
            </p>
            <p className="text-sm text-gray-700 mb-2 font-semibold">
              {mounted ? t("landingFooter.contact.phone") : "Loading..."}: +91-8750860676
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              {mounted ? t("landingFooter.contact.address") : "Loading..."}: 163 - GF Pocket 2 Jasola, New Delhi 1100025
            </p>
          </div>

        </div>

        <div className="bg-[#418BBB] text-sm text-center py-3">
          <p className="text-white">
            {mounted ? `© 2024 RoboGuru. ${t("landingFooter.copyright")}` : "Loading..."}
          </p>
          <p className="text-white">
            {mounted ? t("landingFooter.slogan") : "Loading..."}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingFooter;
