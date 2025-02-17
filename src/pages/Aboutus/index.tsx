'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
        <div
          onClick={() => router.push('/Landing')}
          className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
        >
          <FaArrowLeft size={16} />
          <span>{mounted ? t('aboutUs.back') : 'Loading...'}</span>
        </div>
        <div className="container mx-auto text-center rounded">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {mounted ? t('aboutUs.title') : 'Loading...'}
          </h1>
          <p className="text-md md:text-lg leading-relaxed text-white font-medium">
            {mounted ? t('aboutUs.description') : 'Loading...'}
          </p>
        </div>
      </section>

      <main className="container mx-auto py-8">
        {/* Our Mission */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold">{mounted ? t('aboutUs.ourMission.title') : 'Loading...'}</h2>
          <p className="text-lg leading-relaxed">{mounted ? t('aboutUs.ourMission.description') : 'Loading...'}</p>
        </section>

        {/* Our Impact */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold mb-6">{mounted ? t('aboutUs.ourImpact.title') : 'Loading...'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-red-600">
                {mounted ? t('aboutUs.ourImpact.courses') : 'Loading...'}
              </h3>
              <p className="text-gray-600">{mounted ? t('aboutUs.ourImpact.coursesLabel') : 'Loading...'}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600">
                {mounted ? t('aboutUs.ourImpact.learners') : 'Loading...'}
              </h3>
              <p className="text-gray-600">{mounted ? t('aboutUs.ourImpact.learnersLabel') : 'Loading...'}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">
                {mounted ? t('aboutUs.ourImpact.instructors') : 'Loading...'}
              </h3>
              <p className="text-gray-600">{mounted ? t('aboutUs.ourImpact.instructorsLabel') : 'Loading...'}</p>
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold">{mounted ? t('aboutUs.ourValues.title') : 'Loading...'}</h2>
          <p className="text-lg leading-relaxed">{mounted ? t('aboutUs.ourValues.description') : 'Loading...'}</p>
        </section>

        {/* Meet Our Team */}
        <section className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold">{mounted ? t('aboutUs.ourTeam.title') : 'Loading...'}</h2>
          <p className="text-lg leading-relaxed">{mounted ? t('aboutUs.ourTeam.description') : 'Loading...'}</p>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
