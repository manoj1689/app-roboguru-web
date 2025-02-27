"use client";
import React, { useEffect, useState } from 'react';
import LandingLayout from '@/components/LandingLayout';
import HomeLayout from '@/components/HomeLayout';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const JoinCommunity = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    
    const token = useSelector((state: RootState) => state.firebaseAuth.token); // Get token from Redux

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = () => {
        if (token) {
            router.push('/Home');
        } else {
            router.push('/');
        }
    };

    const LayoutComponent = token ? HomeLayout : LandingLayout;

    return (
        <LayoutComponent>
            <section className='flex w-full flex-col'>
                <section className="px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                    <div
                        onClick={handleNavigation}
                        className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span>
                        <span>{mounted ? t("community.back") : "Loading..."}</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {mounted ? t("community.header.title") : "Loading..."}
                        </h1>
                        <p className="text-md md:text-lg leading-relaxed text-white font-medium">
                            {mounted ? t("community.header.description") : "Loading..."}
                        </p>
                    </div>
                </section>

                <main className="container mx-auto py-8">
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{mounted ? t("community.benefits.heading") : "Loading..."}</h2>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li>{mounted ? t("community.benefits.reasons.0") : "Loading..."}</li>
                            <li>{mounted ? t("community.benefits.reasons.1") : "Loading..."}</li>
                            <li>{mounted ? t("community.benefits.reasons.2") : "Loading..."}</li>
                            <li>{mounted ? t("community.benefits.reasons.3") : "Loading..."}</li>
                        </ul>
                    </section>

                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{mounted ? t("community.howToJoin.heading") : "Loading..."}</h2>
                        <ol className="list-decimal list-inside mt-4 space-y-2">
                            <li>{mounted ? t("community.howToJoin.steps.0") : "Loading..."}</li>
                            <li>{mounted ? t("community.howToJoin.steps.1") : "Loading..."}</li>
                            <li>{mounted ? t("community.howToJoin.steps.2") : "Loading..."}</li>
                            <li>{mounted ? t("community.howToJoin.steps.3") : "Loading..."}</li>
                        </ol>
                    </section>

                    <section className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">{mounted ? t("community.cta.text") : "Loading..."}</h2>
                        <button className="bg-[#418BBB] text-white px-6 py-2 rounded hover:bg-[#4080aa]">
                            {mounted ? t("community.cta.button") : "Loading..."}
                        </button>
                    </section>

                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{mounted ? t("community.contact.heading") : "Loading..."}</h2>
                        <p className="text-sm mt-4">
                            {mounted ? t("community.contact.text") : "Loading..."} {" "}
                            <a href={mounted ? `mailto:${t("community.contact.email")}` : "#"} className="text-red-400 hover:underline">
                                {mounted ? t("community.contact.email") : "Loading..."}
                            </a>.
                        </p>
                    </section>
                </main>
            </section>
        </LayoutComponent>
    );
};

export default JoinCommunity;
