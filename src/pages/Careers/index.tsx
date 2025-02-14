'use client'
import React from 'react'
import Link from 'next/link';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const index = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const handleNavigation = (path: string) => {
        // Navigate to the selected page
        router.push(path);
    };

    return (
        <div>
            <Layout>

                <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                    {/* Gradient overlay */}
                    <div
                        onClick={() => handleNavigation("/Landing")}
                        className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span>
                        <span>{t("careers.back")}</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                            {t("careers.header.title")}
                        </h1>
                        <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium">
                            {t("careers.header.description")}
                        </p>
                    </div>
                </section>

                <main className="container mx-auto py-8">


                    {/* Job Openings Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("careers.jobs.heading")}</h2>

                        {/* Job 1 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">{t("careers.jobs.0.title")}</h3>
                            <p className="text-sm mt-2">
                                {t("careers.jobs.location")}: {t("careers.jobs.0.location")} | {t("careers.jobs.experience")}: {t("careers.jobs.0.experience")}
                            </p>
                            <p className="text-sm mt-1">{t("careers.jobs.0.description")}</p>
                            <div className="mt-4">
                                <a href={t("careers.jobs.0.apply_link")} className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                    {t("careers.jobs.apply_now")}
                                </a>
                            </div>
                        </div>

                        {/* Job 2 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100 mt-6">
                            <h3 className="text-lg font-semibold">{t("careers.jobs.1.title")}</h3>
                            <p className="text-sm mt-2">
                                {t("careers.jobs.location")}: {t("careers.jobs.1.location")} | {t("careers.jobs.experience")}: {t("careers.jobs.1.experience")}
                            </p>
                            <p className="text-sm mt-1">{t("careers.jobs.1.description")}</p>
                            <div className="mt-4">
                                <a href={t("careers.jobs.1.apply_link")} className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                    {t("careers.jobs.apply_now")}
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Why Join Us Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("careers.whyJoin.heading")}</h2>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li>{t("careers.whyJoin.reasons.0")}</li>
                            <li>{t("careers.whyJoin.reasons.1")}</li>
                            <li>{t("careers.whyJoin.reasons.2")}</li>
                            <li>{t("careers.whyJoin.reasons.3")}</li>
                        </ul>
                    </section>

                    {/* Perks & Benefits Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("careers.perks.heading")}</h2>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li>{t("careers.perks.list.0")}</li>
                            <li>{t("careers.perks.list.1")}</li>
                            <li>{t("careers.perks.list.2")}</li>
                            <li>{t("careers.perks.list.3")}</li>
                            <li>{t("careers.perks.list.4")}</li>
                        </ul>
                    </section>

                    {/* How to Apply Section */}
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{t("careers.howToApply.heading")}</h2>
                        <ol className="list-decimal list-inside mt-4 space-y-2">
                            <li>{t("careers.howToApply.steps.0")}</li>
                            <li>{t("careers.howToApply.steps.1")}</li>
                            <li>{t("careers.howToApply.steps.2")}</li>
                        </ol>
                        <p className="text-sm mt-4">
                            {t("careers.contactText")}{" "}
                            <a href={`mailto:${t("careers.contactEmail")}`} className="text-red-400 hover:underline">
                                {t("careers.contactEmail")}
                            </a>
                            .
                        </p>
                    </section>

                </main>

            </Layout>
        </div>
    );
}

export default index;
