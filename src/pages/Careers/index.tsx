'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                <div
                    onClick={() => handleNavigation("/Landing")}
                    className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span>
                    <span>{mounted ? t("careers.back") : "Loading..."}</span>
                </div>
                <div className="container mx-auto text-center rounded">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {mounted ? t("careers.header.title") : "Loading..."}
                    </h1>
                    <p className="text-md md:text-lg leading-relaxed text-white font-medium">
                        {mounted ? t("careers.header.description") : "Loading..."}
                    </p>
                </div>
            </section>

            <main className="container mx-auto py-8">
                {/* Job Openings Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("careers.jobs.heading") : "Loading..."}</h2>

                    {/* Job 1 */}
                    <div className="p-4 border rounded shadow-sm bg-gray-100">
                        <h3 className="text-lg font-semibold">{mounted ? t("careers.jobs.0.title") : "Loading..."}</h3>
                        <p className="text-sm mt-2">
                            {mounted ? `${t("careers.jobs.location")}: ${t("careers.jobs.0.location")} | ${t("careers.jobs.experience")}: ${t("careers.jobs.0.experience")}` : "Loading..."}
                        </p>
                        <p className="text-sm mt-1">{mounted ? t("careers.jobs.0.description") : "Loading..."}</p>
                        <div className="mt-4">
                            <a href={mounted ? t("careers.jobs.0.apply_link") : "#"} className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                {mounted ? t("careers.jobs.apply_now") : "Loading..."}
                            </a>
                        </div>
                    </div>

                    {/* Job 2 */}
                    <div className="p-4 border rounded shadow-sm bg-gray-100 mt-6">
                        <h3 className="text-lg font-semibold">{mounted ? t("careers.jobs.1.title") : "Loading..."}</h3>
                        <p className="text-sm mt-2">
                            {mounted ? `${t("careers.jobs.location")}: ${t("careers.jobs.1.location")} | ${t("careers.jobs.experience")}: ${t("careers.jobs.1.experience")}` : "Loading..."}
                        </p>
                        <p className="text-sm mt-1">{mounted ? t("careers.jobs.1.description") : "Loading..."}</p>
                        <div className="mt-4">
                            <a href={mounted ? t("careers.jobs.1.apply_link") : "#"} className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                {mounted ? t("careers.jobs.apply_now") : "Loading..."}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Why Join Us Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("careers.whyJoin.heading") : "Loading..."}</h2>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li>{mounted ? t("careers.whyJoin.reasons.0") : "Loading..."}</li>
                        <li>{mounted ? t("careers.whyJoin.reasons.1") : "Loading..."}</li>
                        <li>{mounted ? t("careers.whyJoin.reasons.2") : "Loading..."}</li>
                        <li>{mounted ? t("careers.whyJoin.reasons.3") : "Loading..."}</li>
                    </ul>
                </section>

                {/* Perks & Benefits Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("careers.perks.heading") : "Loading..."}</h2>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li>{mounted ? t("careers.perks.list.0") : "Loading..."}</li>
                        <li>{mounted ? t("careers.perks.list.1") : "Loading..."}</li>
                        <li>{mounted ? t("careers.perks.list.2") : "Loading..."}</li>
                        <li>{mounted ? t("careers.perks.list.3") : "Loading..."}</li>
                        <li>{mounted ? t("careers.perks.list.4") : "Loading..."}</li>
                    </ul>
                </section>

                {/* How to Apply Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("careers.howToApply.heading") : "Loading..."}</h2>
                    <ol className="list-decimal list-inside mt-4 space-y-2">
                        <li>{mounted ? t("careers.howToApply.steps.0") : "Loading..."}</li>
                        <li>{mounted ? t("careers.howToApply.steps.1") : "Loading..."}</li>
                        <li>{mounted ? t("careers.howToApply.steps.2") : "Loading..."}</li>
                    </ol>
                    <p className="text-sm mt-4">
                        {mounted ? t("careers.contactText") : "Loading..."}{" "}
                        <a href={mounted ? `mailto:${t("careers.contactEmail")}` : "#"} className="text-red-400 hover:underline">
                            {mounted ? t("careers.contactEmail") : "Loading..."}
                        </a>.
                    </p>
                </section>
            </main>
        </Layout>
    );
}

export default Index;
