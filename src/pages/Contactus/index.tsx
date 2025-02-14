'use client'
import React from 'react';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    
    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div>
            <Layout>
                <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                    <div
                        onClick={() => handleNavigation('/Landing')}
                        className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span><span>{t('back')}</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contactUs.title')}</h1>
                        <p className="text-md md:text-lg leading-relaxed text-white font-medium">
                            {t('contactUs.description')}
                        </p>
                    </div>
                </section>

                <main className="container mx-auto py-8 px-4">
                    {/* Contact Form Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('contactUs.form.title')}</h2>
                        <form action="/submit_contact" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contactUs.form.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 px-4 py-2 block w-full rounded-md outline-cyan-400 border-gray-300 shadow-sm focus:ring-[#418BBB] focus:border-[#418BBB]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contactUs.form.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-4 py-2 rounded-md outline-cyan-400 border-gray-300 shadow-sm focus:ring-[#418BBB] focus:border-[#418BBB]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contactUs.form.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-1 px-4 py-2 block w-full rounded-md outline-cyan-400 border-gray-300 shadow-sm focus:ring-[#418BBB] focus:border-[#418BBB]"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                    {t('contactUs.form.submit')}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Contact Information Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('contactUs.details.title')}</h2>
                        <div className="text-lg">
                            <p>{t('contactUs.details.email')}: <a href="mailto:support@roboguru.com" className="text-[#418BBB] hover:underline">support@roboguru.com</a></p>
                            <p>{t('contactUs.details.phone')}: <a href="tel:+1234567890" className="text-[#418BBB] hover:underline">+1 234 567 890</a></p>
                            <p>{t('contactUs.details.address')}: 123 RoboGuru Lane, AI City, Techland</p>
                        </div>
                    </section>

                    {/* Social Media Section */}
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{t('contactUs.social.title')}</h2>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/roboguru" target="_blank" className="text-blue-600 hover:underline">{t('contactUs.social.facebook')}</a>
                            <a href="https://twitter.com/roboguru" target="_blank" className="text-blue-400 hover:underline">{t('contactUs.social.twitter')}</a>
                            <a href="https://linkedin.com/company/roboguru" target="_blank" className="text-blue-700 hover:underline">{t('contactUs.social.linkedin')}</a>
                            <a href="https://instagram.com/roboguru" target="_blank" className="text-[#418BBB] hover:underline">{t('contactUs.social.instagram')}</a>
                        </div>
                    </section>
                </main>
            </Layout>
        </div>
    );
};

export default ContactPage;
