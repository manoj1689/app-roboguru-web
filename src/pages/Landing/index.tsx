import React, { useState,useEffect } from 'react'
import Layout from '@/components/LandingLayout';
import Link from 'next/link';
import { useTranslation } from "react-i18next";

function index() {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent rendering until mounted

  const discussions = [
    {
      dis_image: "/images/mathematic1.png",
      title: "Most Discussed: Algebra Basics",
      description: "45 replies, last updated 1 hr ago.",
      link: "/Discussion",
    },
    {
      dis_image: "/images/mathematic2.png",
      title: "Physics: Laws of Motion",
      description: "30 replies, last updated 2 hrs ago.",
      link: "/Discussion",
    }
  ];
  const leaderboard = [
    { name: "AlgebraNerd007", points: 1200 },
    { name: "PhysicsPro99", points: 1100 },
    { name: "BiologyBuff", points: 950 },
  ];
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    // Simulate an AI response (replace with actual API call)
    setResponse(`AI Response for: "${question}"`);
  };
  return (

    <div>
      <Layout>
        <div>
          {/* <!-- ========== HERO SECTION ========== --> */}
          <section className="bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white py-12 mt-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-8">
              {/* Hero Text */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-white text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl font-bold mb-4">
                  {t("landingPage.heroTitle")}
                </h1>
                <p className="text-sm md:text-lg mb-6 text-gray-950 font-medium leading-relaxed">
                  {t("landingPage.heroDescription")}
                </p>
                <a href="#features" className="inline-block text-[#418BBB] bg-white px-6 py-4 text-md font-medium rounded-lg hover:text-[#427699] hover:bg-neutral-100 hover:scale-105">
                  {t("landingPage.getStarted")}
                </a>
              </div>
              {/* Hero Image */}
              <div className="md:w-1/2">
                <img src="/images/leftbanner.png" alt={t("landingPage.heroImageAlt")} />
              </div>
            </div>
          </section>

          {/* <!-- END HERO SECTION --> */}

          {/* <!-- KEY FEATURE SECTION --> */}

          <section id="features" className="container mx-auto bg-white rounded my-4 pb-8 shadow">
            <div className="flex flex-col p-6">
              <h2 className="text-2xl font-bold">{t("landingPage.featuresTitle")}</h2>
              <p className="text-lg mb-4 leading-relaxed font-semibold">{t("landingPage.featuresDescription")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="flex flex-col p-4 items-center hover:shadow-lg hover:rounded-lg transition-shadow hover:scale-105 hover:bg-gray-50">
                  <img src="/images/chatAi.png" alt={t("landingPage.features.0.alt")} className="mb-3 w-20 h-20" />
                  <h3 className="font-semibold">{t("landingPage.features.0.title")}</h3>
                  <p className="text-md font-semibold mt-2 text-neutral-500 leading-relaxed text-center">
                    {t("landingPage.features.0.description")}
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col p-4 items-center hover:shadow-lg hover:rounded-lg transition-shadow hover:scale-105 hover:bg-gray-50">
                  <img src="/images/dashboard.png" alt={t("landingPage.features.1.alt")} className="mb-3 w-20 h-20 rounded" />
                  <h3 className="font-semibold">{t("landingPage.features.1.title")}</h3>
                  <p className="text-md font-semibold mt-2 text-neutral-500 leading-relaxed text-center">
                    {t("landingPage.features.1.description")}
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col p-4 items-center hover:shadow-lg hover:rounded-lg transition-shadow hover:scale-105 hover:bg-gray-50">
                  <img src="/images/subjectNavigation.png" alt={t("landingPage.features.2.alt")} className="mb-3 w-20 h-20 rounded" />
                  <h3 className="font-semibold">{t("landingPage.features.2.title")}</h3>
                  <p className="text-md font-semibold mt-2 text-neutral-500 leading-relaxed text-center">
                    {t("landingPage.features.2.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility Section */}
            <div className="mt-6 px-8 py-4 bg-sky-50 rounded">
              <h4 className="font-semibold text-xl text-[#418BBB]">{t("landingPage.accessibility.title")}</h4>
              <p className="text-lg mb-4 leading-relaxed font-semibold">{t("landingPage.accessibility.description")}</p>
            </div>
          </section>


          {/* <!--END KEY FEATURE SECTION --> */}

          {/* <!--HOW IT WORKS SECTION --> */}
          <section id="how-it-works" className="container mx-auto bg-white p-6 mb-4 rounded shadow">
            {/* Section Header */}
            <div className='flex w-full flex-col md:flex-row justify-between'>
              <div className='md:w-2/3'>
                <h2 className="text-2xl font-bold ">{t("landingPage.howItWorks.title")}</h2>
                <p className="text-lg mb-4 leading-relaxed font-semibold">
                  {t("landingPage.howItWorks.description")}
                </p>
              </div>
              <div className='flex md:w-1/3 justify-end'>
                <div>
                  <button className='p-4 text-white bg-[#418BBB] border border-[#BEBEBE] rounded-lg'>
                    {t("landingPage.howItWorks.buttonText")}
                  </button>
                </div>
              </div>
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
              {/* Step 1: Sign Up / Create Profile */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className='flex justify-center items-center gap-2 px-2'>
                  <img src="/images/img1.png" alt={t("landingPage.howItWorks.steps.0.alt")} className="mb-3 p-2" />
                  <img src="/images/arrow.png" alt="arrow" className='w-20' />
                </div>
                <h3 className="font-semibold text-lg">{t("landingPage.howItWorks.steps.0.title")}</h3>
                <p className="text-md font-semibold mt-2 text-neutral-500">
                  {t("landingPage.howItWorks.steps.0.description")}
                </p>
              </div>

              {/* Step 2: Select Subjects */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className='flex justify-center items-center gap-2 px-2'>
                  <img src="/images/img2.png" alt={t("landingPage.howItWorks.steps.1.alt")} className="mb-3 p-2" />
                  <img src="/images/arrow.png" alt="arrow" className='w-20' />
                </div>
                <h3 className="font-semibold text-lg">{t("landingPage.howItWorks.steps.1.title")}</h3>
                <p className="text-md font-semibold mt-2 text-neutral-500">
                  {t("landingPage.howItWorks.steps.1.description")}
                </p>
              </div>

              {/* Step 3: Ask AI or Explore Chapters */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className='flex justify-center items-center gap-2 px-2'>
                  <img src="/images/img3.png" alt={t("landingPage.howItWorks.steps.2.alt")} className="mb-3 p-2" />
                  <img src="/images/arrow.png" alt="arrow" className='w-20' />
                </div>
                <h3 className="font-semibold text-lg">{t("landingPage.howItWorks.steps.2.title")}</h3>
                <p className="text-md font-semibold mt-2 text-neutral-500">
                  {t("landingPage.howItWorks.steps.2.description")}
                </p>
              </div>

              {/* Step 4: Track Progress & Get Suggestions */}
              <div className="flex flex-col items-center justify-center text-center">
                <img src="/images/img4.png" alt={t("landingPage.howItWorks.steps.3.alt")} className="mb-3 p-2" />
                <h3 className="font-semibold text-lg">{t("landingPage.howItWorks.steps.3.title")}</h3>
                <p className="text-md font-semibold mt-2 text-neutral-500">
                  {t("landingPage.howItWorks.steps.3.description")}
                </p>
              </div>
            </div>
          </section>

          {/* <!--END HOW IT WORKS SECTION --> */}

          {/* <!-- ========== SAMPLE AI CHAT ========== --> */}
          <section id="sample-chat" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.sampleChat.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">{t("landingPage.sampleChat.description")}</p>
            <div className="p-4 border rounded space-y-3 bg-gray-50">
              <div>
                <p className="text-red-500 font-semibold mb-4">{t("landingPage.sampleChat.userLabel")}</p>
                <p className="text-md font-medium bg-white p-4 rounded mt-1">{t("landingPage.sampleChat.userMessage")}</p>
              </div>
              <div>
                <p className="text-purple-600 font-semibold my-4">{t("landingPage.sampleChat.aiLabel")}</p>
                <p className="text-md font-medium bg-white py-8 px-4 rounded mt-1">{t("landingPage.sampleChat.aiResponse")}</p>
              </div>
            </div>
          </section>


          {/* <!-- END SAMPLE AI CHAT --> */}

          <section id="community" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.community.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">{t("landingPage.community.description")}</p>

            {/* Discussion Cards */}
            <div className="flex flex-col md:flex-row justify-around gap-4">
              {discussions.map((discussion, index) => (
                <div
                  key={index}
                  className="p-4 w-full md:w-1/2 flex flex-col items-center border rounded hover:shadow-lg transition-shadow hover:border-stone-400"
                >
                  <img src={discussion.dis_image} alt="img" className="w-32 h-32" />
                  <h4 className="text-2xl font-bold text-[#418BBB]">{t(`landingPage.community.discussions.${index}.title`)}</h4>
                  <p className="text-lg mt-1"><i>{t(`landingPage.community.discussions.${index}.description`)}</i></p>
                  <a
                    href={discussion.link}
                    className="text-[#63A7D4] hover:text-[#3c8ec5] text-lg font-bold border border-gray-300 hover:border-gray-400 px-4 py-2 mt-3 inline-block"
                  >
                    {t("landingPage.community.joinDiscussion")}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* <!-- END COMMUNITY --> */}

          <section id="leaderboard" className="flex container mx-auto bg-white p-6 rounded shadow my-4">
            <div className="w-full sm:w-4/6">
              <h2 className="text-2xl font-bold">{t("landingPage.leaderboard.title")}</h2>
              <p className="text-lg mb-4 leading-relaxed font-semibold">{t("landingPage.leaderboard.description")}</p>

              {/* Leaderboard List */}
              <ol className="list-decimal list-inside text-sm space-y-4">
                {leaderboard.map((user, index) => (
                  <li key={index}>
                    <strong className="text-lg font-medium">{user.name}</strong> –
                    <span className="text-lg">{user.points} pts.</span>
                  </li>
                ))}
              </ol>

              {/* View Full Leaderboard Link */}
              <Link
                href="/Leaderboard"
                className="text-[#63A7D4] hover:text-[#3180b4] underline text-md font-semibold block mt-6 w-fit"
              >
                {t("landingPage.leaderboard.viewFull")}
              </Link>
            </div>
            <div className="w-2/6 hidden sm:block items-end">
              <div className="flex w-full justify-end bottom-0">
                <img src="/images/leader_board.png" alt="Leaderboard Image" className="flex" />
              </div>
            </div>
          </section>

          {/* <!-- ========== TEACHER / PARENT PORTAL INFO ========== --> */}
          <section id="teacher-portal" className="container relative mx-auto bg-white p-6 rounded shadow my-4">
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 bg-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              {t("landingPage.teacherPortal.comingSoon")}
            </div>

            <h2 className="text-2xl font-bold">{t("landingPage.teacherPortal.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.teacherPortal.description")}
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="md:w-1/2">
                <img src="./images/parentportal.png" alt={t("landingPage.teacherPortal.imageAlt")} className="w-full" />
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 flex justify-center flex-col space-y-6">
                {/* Teacher Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("landingPage.teacherPortal.teacher.title")}</h3>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>{t("landingPage.teacherPortal.teacher.features.assignHomework")}</li>
                    <li>{t("landingPage.teacherPortal.teacher.features.monitorChat")}</li>
                    <li>{t("landingPage.teacherPortal.teacher.features.performanceReports")}</li>
                  </ul>
                </div>

                {/* Parent Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("landingPage.teacherPortal.parent.title")}</h3>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>{t("landingPage.teacherPortal.parent.features.assignHomework")}</li>
                    <li>{t("landingPage.teacherPortal.parent.features.monitorChat")}</li>
                    <li>{t("landingPage.teacherPortal.parent.features.performanceReports")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- ACHIEVEMENTS (5 badges) --> */}
          <section className="container mx-auto bg-white rounded shadow p-5 my-4">
            <h3 className="text-lg font-bold lg:text-xl">{t("landingPage.achievements.title")}</h3>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.achievements.description")}
            </p>

            <div className="flex flex-wrap justify-around">
              {[
                { src: "/images/badge-award1.png", alt: "mathWhiz", key: "mathWhiz" },
                { src: "/images/badge-award2.png", alt: "scienceStar", key: "scienceStar" },
                { src: "/images/badge-award3.png", alt: "literatureLover", key: "literatureLover" },
                { src: "/images/badge-award4.png", alt: "historyBuff", key: "historyBuff" },
                { src: "/images/badge-award5.png", alt: "codingGuru", key: "codingGuru" },
                { src: "/images/badge-award6.png", alt: "physicsChamp", key: "physicsChamp" }
              ].map((badge) => (
                <div key={badge.key} className="text-center">
                  <img
                    src={badge.src}
                    alt={t(`landingPage.achievements.badges.${badge.alt}.alt`)}
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full border-8 border-gray-100 shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">{t(`landingPage.achievements.badges.${badge.alt}.label`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* <!-- ========== CERTIFICATES OF COMPLETION ========== --> */}
          <section id="certificates" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.certificates.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.certificates.description")}
            </p>
            <img
              src="/images/certificate.webp"
              alt={t("landingPage.certificates.image.alt")}
              className="md:w-3/4 mx-auto rounded shadow object-cover p-4"
            />
          </section>
          {/* <!-- END CERTIFICATES --> */}

          <section id="success-stories" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.successStories.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.successStories.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Story 1 */}
              <div className="p-4 border rounded hover:shadow transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={t("landingPage.successStories.stories.0.image")}
                    alt={t("landingPage.successStories.stories.0.name")}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t("landingPage.successStories.stories.0.name")}</p>
                    <p className="text-md text-gray-600">{t("landingPage.successStories.stories.0.scoreImprovement")}</p>
                  </div>
                </div>
                <blockquote className="text-md italic">“{t("landingPage.successStories.stories.0.testimonial")}”</blockquote>
              </div>

              {/* Story 2 */}
              <div className="p-4 border rounded hover:shadow transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={t("landingPage.successStories.stories.1.image")}
                    alt={t("landingPage.successStories.stories.1.name")}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t("landingPage.successStories.stories.1.name")}</p>
                    <p className="text-md text-gray-600">{t("landingPage.successStories.stories.1.scoreImprovement")}</p>
                  </div>
                </div>
                <blockquote className="text-md italic">“{t("landingPage.successStories.stories.1.testimonial")}”</blockquote>
              </div>

              {/* Story 3 */}
              <div className="p-4 border rounded hover:shadow transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={t("landingPage.successStories.stories.2.image")}
                    alt={t("landingPage.successStories.stories.2.name")}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t("landingPage.successStories.stories.2.name")}</p>
                    <p className="text-md text-gray-600">{t("landingPage.successStories.stories.2.scoreImprovement")}</p>
                  </div>
                </div>
                <blockquote className="text-md italic">“{t("landingPage.successStories.stories.2.testimonial")}”</blockquote>
              </div>
            </div>
          </section>



          {/* <!-- ========== PRESS & PARTNERS / AWARDS ========== --> */}
          <section id="press-partners" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">{t("landingPage.pressPartners.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.pressPartners.description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Partner 1 */}
              <div className="px-4 items-start">
                <img
                  src={t("landingPage.pressPartners.partners.partner1.image")}
                  alt={t("landingPage.pressPartners.partners.partner1.alt")}
                  className="mb-2 object-cover w-64 h-40 rounded-lg"
                />
                <p className="text-sm font-semibold italic">{t("landingPage.pressPartners.partners.partner1.name")}</p>
                <p className="text-sm font-semibold italic">{t("landingPage.pressPartners.partners.partner1.award")}</p>
              </div>

              {/* Partner 2 */}
              <div className="">
                <img
                  src={t("landingPage.pressPartners.partners.partner2.image")}
                  alt={t("landingPage.pressPartners.partners.partner2.alt")}
                  className="mb-2 object-cover w-64 h-40 rounded-lg"
                />
                <p className="text-sm font-semibold italic">{t("landingPage.pressPartners.partners.partner2.name")}</p>
                <p className="text-sm font-semibold italic">{t("landingPage.pressPartners.partners.partner2.award")}</p>
              </div>

              {/* Partner 3 */}
              <div className="">
                <img
                  src={t("landingPage.pressPartners.partners.partner3.image")}
                  alt={t("landingPage.pressPartners.partners.partner3.alt")}
                  className="mb-2 object-cover w-64 h-40 rounded-lg"
                />
                <p className="text-sm font-semibold italic">{t("landingPage.pressPartners.partners.partner3.name")}</p>
                <p className="text-sm font-semibold italic">{t("landingPage.pressPartners.partners.partner3.award")}</p>
              </div>
            </div>

            {/* Blockquote */}
            <blockquote className="mt-4 border-l-4 border-red-400 pl-4 text-md italic text-gray-700">
              {t("landingPage.pressPartners.quote.text")} – {t("landingPage.pressPartners.quote.source")}
            </blockquote>
          </section>


          {/* <!-- END PRESS & PARTNERS --> */}
          {/* <!-- ========== CTA BLOCK ========== --> */}
          <section id="cta-block" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.ctaBlock.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.ctaBlock.description")}
            </p>
            <div className="space-x-3">
              {/* Sign Up Button */}
              <a
                href={t("landingPage.ctaBlock.buttons.signUp.href")}
                className="inline-block bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#397daa] font-semibold text-md"
              >
                {t("landingPage.ctaBlock.buttons.signUp.text")}
              </a>
              {/* Watch Demo Button */}
              <a
                href={t("landingPage.ctaBlock.buttons.watchDemo.href")}
                className="inline-block border border-[#418BBB] text-[#418BBB] px-4 py-2 rounded hover:text-[#397daa] font-semibold hover:bg-[#dce9f1] text-md"
              >
                {t("landingPage.ctaBlock.buttons.watchDemo.text")}
              </a>
            </div>
          </section>


          {/* <!-- END CTA BLOCK --> */}
          {/* <!-- ========== WHY CHOOSE ROBOGURU (COMPARISON) ========== --> */}
          <section id="why-choose-roboguru" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.whyChooseRoboGuru.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.whyChooseRoboGuru.description")}
            </p>

            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b font-bold">{t("landingPage.whyChooseRoboGuru.comparisonTable.headers.0")}</th>
                  <th className="p-3 text-left border-b font-bold">{t("landingPage.whyChooseRoboGuru.comparisonTable.headers.1")}</th>
                  <th className="p-3 text-left border-b font-bold">{t("landingPage.whyChooseRoboGuru.comparisonTable.headers.2")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.0.feature")}</td>
                  <td className="p-3 border-b text-green-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.0.roboguru")}</td>
                  <td className="p-3 border-b text-red-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.0.others")}</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.1.feature")}</td>
                  <td className="p-3 border-b text-green-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.1.roboguru")}</td>
                  <td className="p-3 border-b text-yellow-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.1.others")}</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.2.feature")}</td>
                  <td className="p-3 border-b text-green-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.2.roboguru")}</td>
                  <td className="p-3 border-b text-yellow-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.2.others")}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.3.feature")}</td>
                  <td className="p-3 text-green-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.3.roboguru")}</td>
                  <td className="p-3 text-yellow-600 font-semibold">{t("landingPage.whyChooseRoboGuru.comparisonTable.rows.3.others")}</td>
                </tr>
              </tbody>
            </table>
          </section>


          {/* <!-- END WHY CHOOSE ROBOGURU --> */}

          {/* <!-- ========== TIME-LIMITED DISCOUNT BANNER ========== --> */}
          <section id="discount-banner" className="container mx-auto bg-sky-50 p-6 rounded shadow my-4">
            <h3 className="text-xl font-bold mb-2 text-[#418BBB]">
              {t("landingPage.discountBanner.title")}
            </h3>
            <p className="text-sm font-medium leading-relaxed text-gray-800">
              {t("landingPage.discountBanner.description.0")}
              <span className="font-semibold">{t("landingPage.discountBanner.code")}</span>
              {t("landingPage.discountBanner.description.1")}
              <strong>{t("landingPage.discountBanner.discount")}</strong>
              {t("landingPage.discountBanner.description.2")}
            </p>
            <p className="text-sm text-gray-700 mt-2 italic">
              {t("landingPage.discountBanner.expiry")}
            </p>
          </section>


          {/* <!-- END TIME-LIMITED DISCOUNT BANNER --> */}
          {/* <!-- ========== CUSTOM STUDY PLANS ========== --> */}
          <section id="study-plans" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.studyPlans.title")}</h2>
            <p className="text-lg mb-4 leading-relaxed font-semibold">
              {t("landingPage.studyPlans.description")}
            </p>
            <ul className="list-disc list-inside text-md font-medium space-y-1 text-gray-700">
              <li>{t("landingPage.studyPlans.items.0")}</li>
              <li>{t("landingPage.studyPlans.items.1")}</li>
              <li>{t("landingPage.studyPlans.items.2")}</li>
            </ul>
          </section>


          {/* <!-- END CUSTOM STUDY PLANS --> */}
          {/* <!-- ========== PRICING SECTION ========== --> */}
          <section id="pricing" className="container mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold">{t("landingPage.pricing.title")}</h2>
            <p className="text-md mb-4 flex flex-col gap-6 leading-relaxed font-medium">
              <span>{t("landingPage.pricing.description.0")}</span>
              <span><strong>{t("landingPage.pricing.description.1")}</strong></span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:w-4/5 mx-auto gap-6">

              {/* Free Plan */}
              <div className="p-6 border rounded flex flex-col justify-between items-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-xl mb-2 text-[#418BBB]">{t("landingPage.pricing.plans.0.title")}</h3>
                <p className="text-lg my-4 leading-relaxed font-semibold text-center">
                  {t("landingPage.pricing.plans.0.features")}
                </p>
                <p className="text-2xl font-bold my-4">
                  {t("landingPage.pricing.plans.0.price")}<span className="text-base font-normal">/month</span>
                </p>
                <button className="md:w-4/5 mx-auto bg-[#418BBB] text-white p-4 text-md rounded font-semibold hover:bg-[#357AA0] mt-4">
                  {t("landingPage.pricing.plans.0.button")}
                </button>
              </div>

              {/* Pro Plan */}
              <div className="p-6 border rounded flex flex-col justify-between items-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-xl mb-2 text-[#418BBB]">{t("landingPage.pricing.plans.1.title")}</h3>
                <p className="text-lg my-4 leading-relaxed font-semibold text-center">
                  {t("landingPage.pricing.plans.1.features")}
                </p>
                <p className="text-2xl font-bold my-4">
                  {t("landingPage.pricing.plans.1.price")}<span className="text-base font-normal">/month</span>
                </p>
                <button className="md:w-4/5 mx-auto bg-[#418BBB] text-white p-4 font-semibold text-md rounded hover:bg-[#357AA0] mt-4">
                  {t("landingPage.pricing.plans.1.button")}
                </button>
              </div>

              {/* Enterprise / Schools Plan */}
              <div className="p-6 border rounded flex flex-col justify-between items-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-xl text-[#418BBB]">{t("landingPage.pricing.plans.2.title")}</h3>
                <p className="text-lg my-4 leading-relaxed font-semibold text-center">
                  {t("landingPage.pricing.plans.2.features")}
                </p>
                <p className="text-2xl font-bold my-4">
                  {t("landingPage.pricing.plans.2.price")}
                </p>
                <button className="md:w-4/5 mx-auto bg-[#418BBB] text-white p-4 text-md font-semibold rounded hover:bg-[#357AA0] mt-4">
                  {t("landingPage.pricing.plans.2.button")}
                </button>
              </div>

            </div>
          </section>


          {/* <!-- END PRICING --> */}

          {/* <!-- ========== DOWNLOAD THE ROBOGURU APP ========== --> */}
          <section id="download" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.download.title")}</h2>
            <p className="text-lg mb-8 leading-relaxed font-semibold">
              {t("landingPage.download.description")}
            </p>
            <div className="flex gap-8 my-4">

              {/* Apple Store Button */}
              <button className="bg-gray-200 text-sm font-medium px-8 py-2 flex gap-4 justify-center items-center rounded-lg shadow hover:bg-gray-300 transition">
                <span>
                  <img src="/images/applestore.png" alt="App Store" className="w-12" />
                </span>
                <span>{t("landingPage.download.buttons.apple")}</span>
              </button>

              {/* Play Store Button */}
              <button className="bg-gray-200 text-sm font-medium px-8 py-2 flex gap-4 justify-center items-center rounded-lg shadow hover:bg-gray-300 transition">
                <span>
                  <img src="/images/playstore.png" alt="Play Store" className="w-12" />
                </span>
                <span>{t("landingPage.download.buttons.play")}</span>
              </button>

            </div>
          </section>


          {/* <!-- END DOWNLOAD THE ROBOGURU APP --> */}

          {/* <!-- ========== FAQ SECTION ========== --> */}
          <section id="faq" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">{t("landingPage.faq.title")}</h2>
            <div className="space-y-4 mt-4">

              {/* FAQ 1 */}
              <div className="p-4 border-l-4 border-[#418BBB] bg-sky-50">
                <p className="font-semibold font-lg">1. {t("landingPage.faq.questions.q1.question")}</p>
                <p className="text-md text-gray-700 mt-1 leading-relaxed">
                  {t("landingPage.faq.questions.q1.answer")}
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="p-4 border-l-4 border-[#418BBB] bg-sky-50">
                <p className="font-semibold font-lg">2. {t("landingPage.faq.questions.q2.question")}</p>
                <p className="text-md text-gray-700 mt-1 leading-relaxed">
                  {t("landingPage.faq.questions.q2.answer")}
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="p-4 border-l-4 border-[#418BBB] bg-sky-50">
                <p className="font-semibold font-lg">3. {t("landingPage.faq.questions.q3.question")}</p>
                <p className="text-md text-gray-700 mt-1 leading-relaxed">
                  {t("landingPage.faq.questions.q3.answer")}
                </p>
              </div>

            </div>
          </section>


          {/* <!-- END FAQ --> */}
          <section id="webinars" className="flex flex-col container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold">{t("landingPage.webinars.title")}</h2>
            <p className="text-lg mb-8 leading-relaxed font-semibold">
              {t("landingPage.webinars.subtitle")}
            </p>

            <div className="flex justify-center flex-col md:flex-row gap-8">

              {/* Webinar 1 */}
              <div className="group w-full md:w-1/3 h-80 bg-[#C8E3FF] hover:bg-[#D8F0FF] flex flex-col justify-center items-center p-6 rounded-md">
                <p className="opacity-60 group-hover:opacity-100 text-lg bg-[url('/images/webinar_headingback.png')] bg-[length:100%_100%] bg-no-repeat w-3/5 text-center text-white font-semibold">
                  {t("landingPage.webinars.event1.date")}
                </p>
                <h2 className="text-3xl text-center mt-4 font-semibold text-[#1F76D0] group-hover:text-[#63A7D4]">
                  {t("landingPage.webinars.event1.title")}
                </h2>
                <p className="mx-4 my-4 text-center font-semibold">
                  {t("landingPage.webinars.event1.description")}
                </p>
                <button className="font-semibold opacity-60 group-hover:opacity-100 bg-[#235D9A] group-hover:bg-[#418BBB] text-md text-gray-100 px-6 py-3 mt-2 rounded-md">
                  {t("landingPage.webinars.event1.button")}
                </button>
              </div>

              {/* Webinar 2 */}
              <div className="group w-full md:w-1/3 h-80 bg-[#C8E3FF] hover:bg-[#D8F0FF] flex flex-col justify-center items-center p-6 rounded-md">
                <p className="opacity-60 group-hover:opacity-100 text-lg bg-[url('/images/webinar_headingback.png')] bg-[length:100%_100%] bg-no-repeat w-3/5 text-center text-white font-semibold">
                  {t("landingPage.webinars.event2.date")}
                </p>
                <h2 className="text-3xl text-center mt-4 font-semibold text-[#1F76D0] group-hover:text-[#63A7D4]">
                  {t("landingPage.webinars.event2.title")}
                </h2>
                <p className="mx-4 my-4 text-center font-semibold">
                  {t("landingPage.webinars.event2.description")}
                </p>
                <button className="font-semibold opacity-60 group-hover:opacity-100 bg-[#235D9A] group-hover:bg-[#418BBB] text-md text-gray-100 px-6 py-3 mt-2 rounded-md">
                  {t("landingPage.webinars.event2.button")}
                </button>
              </div>

            </div>
          </section>

        </div>


      </Layout>

    </div>
  )
}

export default index