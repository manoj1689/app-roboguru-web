'use client'
import React from 'react'
import Link from 'next/link';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
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
                        <span><FaArrowLeft size={16} /></span><span>Back</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">{t("privacyPolicy.title")}</h1>
                        <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium">
                            {t("privacyPolicy.description")}
                        </p>
                    </div>
                </section>

                <main className="container mx-auto p-4">

                    {/* Introduction Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("privacyPolicy.sections.introduction.title")}</h2>
                        <p className="text-md">{t("privacyPolicy.sections.introduction.content")}</p>
                    </section>

                    {/* Information Collection Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("privacyPolicy.sections.informationCollection.title")}</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[0, 1, 2].map(index => (
                                <li key={index}>
                                    <span className='font-semibold'>{t(`privacyPolicy.sections.informationCollection.points.${index}.label`)}:</span> 
                                    {t(`privacyPolicy.sections.informationCollection.points.${index}.description`)}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* How We Use Your Information Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("privacyPolicy.sections.howWeUse.title")}</h2>
                        <p className="text-sm mb-4">{t("privacyPolicy.sections.howWeUse.intro")}</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[0, 1, 2, 3].map(index => (
                                <li key={index}>{t(`privacyPolicy.sections.howWeUse.points.${index}`)}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Data Protection Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("privacyPolicy.sections.dataProtection.title")}</h2>
                        <p className="text-md">{t("privacyPolicy.sections.dataProtection.content")}</p>
                    </section>

                    {/* Third-Party Sharing Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t("privacyPolicy.sections.thirdPartySharing.title")}</h2>
                        <p className="text-md">{t("privacyPolicy.sections.thirdPartySharing.content")}</p>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">{t("privacyPolicy.sections.contactUs.title")}</h2>
                        <p className="text-md">{t("privacyPolicy.sections.contactUs.intro")}</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                            <li>
                                {t("privacyPolicy.sections.contactUs.contacts.email.label")}: 
                                <Link href={`mailto:${t("privacyPolicy.sections.contactUs.contacts.email.value")}`} className="text-sky-600 text-semibold hover:underline">
                                    {t("privacyPolicy.sections.contactUs.contacts.email.value")}
                                </Link>
                            </li>
                            <li>
                                {t("privacyPolicy.sections.contactUs.contacts.phone.label")}: 
                                <Link href={`tel:${t("privacyPolicy.sections.contactUs.contacts.phone.value")}`} className="text-sky-600 text-semibold hover:underline">
                                    {t("privacyPolicy.sections.contactUs.contacts.phone.value")}
                                </Link>
                            </li>
                            <li>
                                {t("privacyPolicy.sections.contactUs.contacts.address.label")}: {t("privacyPolicy.sections.contactUs.contacts.address.value")}
                            </li>
                        </ul>
                    </section>
                </main>
            </Layout>
        </div>
    );
}

export default PrivacyPolicy;
