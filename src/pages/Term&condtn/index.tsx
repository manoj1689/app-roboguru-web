'use client'
import React from 'react';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div>
            <Layout>
                <section className="px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                    <div
                        onClick={() => handleNavigation("/Landing")}
                        className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span>
                        <span>{t("termAndCondition.back")}</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t("termAndCondition.title")}
                        </h1>
                        <p className="text-md md:text-lg leading-relaxed text-white font-medium">
                            {t("termAndCondition.description")}
                        </p>
                    </div>
                </section>

                <main className="container mx-auto p-4">
                    {/* General Terms Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("termAndCondition.sections.generalTerms.title")}</h2>
                        <ul className="list-disc list-inside space-y-4 ml-4">
                            <li>{t("termAndCondition.sections.generalTerms.points.0")}</li>
                            <li>{t("termAndCondition.sections.generalTerms.points.1")}</li>
                            <li>{t("termAndCondition.sections.generalTerms.points.2")}</li>
                        </ul>
                    </section>

                    {/* User Responsibilities Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("termAndCondition.sections.userResponsibilities.title")}</h2>
                        <ul className="list-disc list-inside space-y-4 ml-4">
                            <li>{t("termAndCondition.sections.userResponsibilities.points.0")}</li>
                            <li>{t("termAndCondition.sections.userResponsibilities.points.1")}</li>
                            <li>{t("termAndCondition.sections.userResponsibilities.points.2")}</li>
                        </ul>
                    </section>

                    {/* Privacy and Security Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("termAndCondition.sections.privacyAndSecurity.title")}</h2>
                        <ul className="list-disc list-inside space-y-4 ml-4">
                            <li>
                                {t("termAndCondition.sections.privacyAndSecurity.points.0")}
                                <Link href={t("termAndCondition.sections.privacyAndSecurity.privacyPolicyLink")}>
                                    <span className="text-[#418BBB] hover:underline px-2">{t("termAndCondition.sections.privacyAndSecurity.privacyPolicyLink")}</span>
                                </Link>
                            </li>
                        </ul>
                    </section>

                    {/* Limitation of Liability Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("termAndCondition.sections.limitationOfLiability.title")}</h2>
                        <ul className="list-disc list-inside space-y-4 ml-4">
                            <li>{t("termAndCondition.sections.limitationOfLiability.points.0")}</li>
                            <li>{t("termAndCondition.sections.limitationOfLiability.points.1")}</li>
                            <li>{t("termAndCondition.sections.limitationOfLiability.points.2")}</li>
                        </ul>
                    </section>

                    {/* Governing Law Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("termAndCondition.sections.governingLaw.title")}</h2>
                        <ul className="list-disc list-inside space-y-4 ml-4">
                            <li>{t("termAndCondition.sections.governingLaw.points.0")}</li>
                            <li>{t("termAndCondition.sections.governingLaw.points.1")}</li>
                        </ul>
                    </section>
                </main>

            </Layout>
        </div>
    );
};

export default TermsAndConditions;
