'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/HomeLayout';
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
            <section className="relative bg-center mt-20 px-4 text-white py-8" style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-90"></div>
                <div
                    onClick={() => handleNavigation("/Home")}
                    className="flex relative z-10 container mx-auto hover:text-stone-700 font-bold mb-4 gap-3 items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span>
                    <span>{mounted ? t("feedback.back") : "Loading..."}</span>
                </div>
                <div className="relative z-10 container mx-auto text-center rounded">
                    <h1 className="text-5xl font-bold text-center mb-6">{mounted ? t("feedback.title") : "Loading..."}</h1>
                    <p className="text-lg leading-relaxed text-center text-black font-medium mb-8">
                        {mounted ? t("feedback.description") : "Loading..."}
                    </p>
                </div>
            </section>

            <main className="container mx-auto py-8 px-4 mt-20">
                {/* Feedback Form Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("feedback.form.title") : "Loading..."}</h2>
                    <form action="/submit_feedback" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{mounted ? t("feedback.form.name") : "Loading..."}</label>
                            <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{mounted ? t("feedback.form.email") : "Loading..."}</label>
                            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600" required />
                        </div>
                        <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">{mounted ? t("feedback.form.message") : "Loading..."}</label>
                            <textarea id="feedback" name="feedback" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600" required></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500">
                                {mounted ? t("feedback.form.submit") : "Loading..."}
                            </button>
                        </div>
                    </form>
                </section>

                {/* User Reviews Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("feedback.reviews.title") : "Loading..."}</h2>
                    <div className="space-y-6">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="p-4 border rounded shadow-sm bg-gray-100">
                                <p className="text-sm italic">{mounted ? t(`feedback.reviews.${index}.message`) : "Loading..."}</p>
                                <p className="text-sm mt-2 font-semibold">- {mounted ? t(`feedback.reviews.${index}.author`) : "Loading..."}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Index;
