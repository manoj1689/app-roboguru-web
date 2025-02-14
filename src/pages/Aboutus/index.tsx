'use client';
import React from 'react';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
        <div
          onClick={() => router.push('/Landing')}
          className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
        >
          <FaArrowLeft size={16} />
          <span>{t('aboutUs.back')}</span>
        </div>
        <div className="container mx-auto text-center rounded">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('aboutUs.title')}</h1>
          <p className="text-md md:text-lg leading-relaxed text-white font-medium">{t('aboutUs.description')}</p>
        </div>
      </section>

      <main className="container mx-auto py-8">
        {/* Our Mission */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold">{t('aboutUs.ourMission.title')}</h2>
          <p className="text-lg leading-relaxed">{t('aboutUs.ourMission.description')}</p>
        </section>

        {/* Our Impact */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold mb-6">{t('aboutUs.ourImpact.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-red-600">{t('aboutUs.ourImpact.courses')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourImpact.coursesLabel')}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600">{t('aboutUs.ourImpact.learners')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourImpact.learnersLabel')}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">{t('aboutUs.ourImpact.instructors')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourImpact.instructorsLabel')}</p>
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold">{t('aboutUs.ourValues.title')}</h2>
          <p className="text-lg leading-relaxed">{t('aboutUs.ourValues.description')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mt-10">
            <div className="text-left border border-gray-400 rounded-md px-4 py-2 bg-[#DFF3FF]">
              <img src={t('aboutUs.ourValues.innovation.image')} alt="Innovation" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{t('aboutUs.ourValues.innovation.title')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourValues.innovation.description')}</p>
            </div>

            <div className="text-left border border-gray-400 rounded-md px-4 py-2 bg-[#FBFFDC]">
              <img src={t('aboutUs.ourValues.accessibility.image')} alt="Accessibility" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{t('aboutUs.ourValues.accessibility.title')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourValues.accessibility.description')}</p>
            </div>

            <div className="text-left border border-gray-400 rounded-md px-4 py-2">
              <img src={t('aboutUs.ourValues.excellence.image')} alt="Excellence" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{t('aboutUs.ourValues.excellence.title')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourValues.excellence.description')}</p>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold">{t('aboutUs.ourTeam.title')}</h2>
          <p className="text-lg leading-relaxed">{t('aboutUs.ourTeam.description')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-[#F3F3F3] p-4 rounded-tl-3xl rounded-br-3xl">
              <img src={t('aboutUs.ourTeam.members.member1.image')} alt="Asly Roe" className="w-20 h-20 rounded-full mb-4 shadow-lg" />
              <h3 className="text-xl font-bold">{t('aboutUs.ourTeam.members.member1.name')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourTeam.members.member1.role')}</p>
              <p className="text-sm text-gray-500">{t('aboutUs.ourTeam.members.member1.description')}</p>
            </div>

            <div className="bg-[#F3F3F3] p-4 rounded-tl-3xl rounded-br-3xl">
              <img src={t('aboutUs.ourTeam.members.member2.image')} alt="Jane Smith" className="w-20 h-20 rounded-full mb-4 shadow-lg" />
              <h3 className="text-xl font-bold">{t('aboutUs.ourTeam.members.member2.name')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourTeam.members.member2.role')}</p>
              <p className="text-sm text-gray-500">{t('aboutUs.ourTeam.members.member2.description')}</p>
            </div>

            <div className="bg-[#F3F3F3] p-4 rounded-tl-3xl rounded-br-3xl">
              <img src={t('aboutUs.ourTeam.members.member3.image')} alt="Michael Brown" className="w-20 h-20 rounded-full mb-4 shadow-lg" />
              <h3 className="text-xl font-bold">{t('aboutUs.ourTeam.members.member3.name')}</h3>
              <p className="text-gray-600">{t('aboutUs.ourTeam.members.member3.role')}</p>
              <p className="text-sm text-gray-500">{t('aboutUs.ourTeam.members.member3.description')}</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
