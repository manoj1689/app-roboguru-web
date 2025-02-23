'use client';
import React, { useEffect, useState } from 'react';
import LandingLayout from '@/components/LandingLayout';
import HomeLayout from '@/components/HomeLayout';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FAQ = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('access_token');
        setHasToken(!!token);
    }, []);

    const handleNavigation = () => {
        if (hasToken) {
            router.push('/Home');
        } else {
            router.push('/');
        }
    };

    const LayoutComponent = hasToken ? HomeLayout : LandingLayout;

    return (
        <LayoutComponent>
            {/* Hero Section */}
            <section className='flex  w-full flex-col'>
            <section className=" px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                <div
                    onClick={() => handleNavigation()}
                    className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span>
                    <span>{mounted ? t("faq.back") : "Loading..."}</span>
                </div>
                <div className="container mx-auto text-center rounded">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {mounted ? t("faq.header.title") : "Loading..."}
                    </h1>
                    <p className="text-md md:text-lg leading-relaxed text-white font-medium">
                        {mounted ? t("faq.header.description") : "Loading..."}
                    </p>
                </div>
            </section>

            <main className="container mx-auto py-8">
                {/* FAQ Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("faq.heading") : "Loading..."}</h2>
                    <div className="space-y-6">
                        {/* Question 1 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">{mounted ? t("faq.questions.0.question") : "Loading..."}</h3>
                            <p className="text-sm mt-2">{mounted ? t("faq.questions.0.answer") : "Loading..."}</p>
                        </div>

                        {/* Question 2 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">{mounted ? t("faq.questions.1.question") : "Loading..."}</h3>
                            <p className="text-sm mt-2">{mounted ? t("faq.questions.1.answer") : "Loading..."}</p>
                        </div>

                        {/* Question 3 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">{mounted ? t("faq.questions.2.question") : "Loading..."}</h3>
                            <p className="text-sm mt-2">{mounted ? t("faq.questions.2.answer") : "Loading..."}</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{mounted ? t("faq.contact.heading") : "Loading..."}</h2>
                    <p className="text-sm mt-4">
                        {mounted ? t("faq.contact.text") : "Loading..."} {" "}
                        <a href={mounted ? `mailto:${t("faq.contact.email")}` : "#"} className="text-red-400 hover:underline">
                            {mounted ? t("faq.contact.email") : "Loading..."}
                        </a>.
                    </p>
                </section>
            </main>
            </section>
        
        </LayoutComponent>
    );
};

export default FAQ;
