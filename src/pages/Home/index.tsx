import React, { useEffect, useState } from "react";
import Layout from "@/components/HomeLayout";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUserProfile } from "../../redux/slices/profileSlice";
import { fetchEducationLevels } from "../../redux/slices/educationLevelSlice";
import { fetchClasses } from "../../redux/slices/classSlice";

import { FaInfoCircle } from "react-icons/fa";
import TrendingTopicsSection from "./TrendingTopic";
import SubjectList from "./SubjectList";
import GreetingBar from "@/components/GreetingBar";
import ImageChat from "../ImageChat";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamPicker from "../ExamModal/subjectPicker";
import "../modal/custom-styling.css"
const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
 
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      // Fetch data only if the user is logged in
      dispatch(fetchUserProfile());
      
    }
  }, [dispatch]);
 
  return (
    <div>
      <Layout>
        <div >
          {/* Left Menu */}
          <ToastContainer />
          {/* Right Sections */}
          <div className=' '>
            <GreetingBar />
            <section>
              <TrendingTopicsSection />
            </section>
            <section>
              <SubjectList />
            </section>
            <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold lg:text-2xl">{t("homePage.smartGrader.title")}</h3>
              <p className="text-md mb-4 leading-relaxed">{t("homePage.smartGrader.description")}</p>

              <h4 className="text-lg font-bold text-[#418BBB] lg:text-lg">{t("homePage.smartGrader.howItWorks")}</h4>

              <ul className="list-disc list-inside text-gray-600 italic mb-2">
                <li>{t("homePage.smartGrader.steps.0")}</li>
                <li>{t("homePage.smartGrader.steps.1")}</li>
                <li>{t("homePage.smartGrader.steps.2")}</li>
                <li>{t("homePage.smartGrader.steps.3")}</li>
              </ul>

              <div className="flex w-full justify-center items-center">
                <button
                  className="mt-4 px-4 py-2 bg-[#418BBB] text-white font-semibold rounded-lg self-center hover:bg-[#3a7ba7] transition-all"
                  onClick={() => setOpen(true)}
                >
                  {t("homePage.smartGrader.startAiGrading")}
                </button>
              </div>

              {/* Modal for ExamPicker */}
              <Modal open={open} onClose={() => setOpen(false)} classNames={{ modal: 'customModalGoogle' }} center>
                <ExamPicker />
              </Modal>
            </section>
            <ImageChat />


            {/* <!-- RECOMMENDED (5 items) --> */}
            {/* <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-2xl font-bold ">Recommended for You</h3>
              <p className="text-base mb-4 leading-relaxed">Based on your recent activity:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               
                <div className="border rounded-lg p-4 hover:shadow transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-lg mb-1">Trigonometry Basics</h4>
                    <p className="text-md text-neutral-700 italic">Math | Class X</p>
                    <p className="text-sm text-neutral-800 mt-2 font-semibold line-clamp-2">
                      Complete your last practice set on angles and identities.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="mt-3 inline-block px-8 py-2 text-xs lg:text-sm font-semibold bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa] self-start"
                    >
                      Resume
                    </Link>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:shadow transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-lg mb-1">Poetry Analysis</h4>
                    <p className="text-md text-neutral-700 italic">English | Class IX</p>
                    <p className="text-sm text-neutral-800 mt-2 font-semibold line-clamp-2">
                      Dive deeper into classic poems and improve your literary insights.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="mt-3 inline-block px-8 py-2 text-xs lg:text-sm font-semibold bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa] self-start"
                    >
                      Explore
                    </Link>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:shadow transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-lg mb-1">Electrostatics</h4>
                    <p className="text-md text-neutral-700 italic">Physics | Class XI</p>
                    <p className="text-sm text-neutral-800 mt-2 font-semibold line-clamp-2">
                      Review Coulomb’s law and solve new practice questions.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="mt-3 inline-block px-8 py-2 text-xs lg:text-sm font-semibold bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa] self-start"
                    >
                      Continue
                    </Link>
                  </div>
                </div>

              
                <div className="border rounded-lg p-4 hover:shadow transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-lg mb-1">Chemical Bonds</h4>
                    <p className="text-md text-neutral-700 italic">Chemistry | Class IX</p>
                    <p className="text-sm text-neutral-800 mt-2 font-semibold line-clamp-2">
                      Learn about ionic, covalent, and metallic bonds.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="mt-3 inline-block px-8 py-2 text-xs lg:text-sm font-semibold bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa] self-start"
                    >
                      Resume
                    </Link>
                  </div>
                </div>

               
                <div className="border rounded-lg p-4 hover:shadow transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-lg mb-1">Programming Basics</h4>
                    <p className="text-md text-neutral-700 italic">Coding | Class X</p>
                    <p className="text-sm text-neutral-800 mt-2 font-semibold line-clamp-2">
                      Finish the array exercises and debug sample programs.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="mt-3 inline-block px-8 py-2 text-xs lg:text-sm font-semibold bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa] self-start"
                    >
                      Resume
                    </Link>
                  </div>
                </div>

               
                <div className="flex   border rounded-lg p-4 hover:shadow transition-shadow  justify-center items-center bg-gradient-to-r  from-[#63A7D4] to-[#F295BE] ">
                  <h4 className="font-semibold text-sm lg:text-2xl text-neutral-800">Explore More</h4>
                </div>
              </div>


            </section> */}

            {/* <!-- WEEKLY MISSIONS & VIRTUAL NOTEPAD --> */}
            {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
             
              <div className="bg-white rounded shadow p-5 ">
                <h3 className="text-lg font-bold mb-3 lg:text-xl">Your Goals</h3>
            
                <ul className="space-y-2 text-sm lg:text-lg">
                  <li className="p-3 border rounded flex justify-between items-center">
                    <span>Complete 2 chapters or 30 mins practice</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">1/2</span>
                  </li>
                  <li className="p-3 border rounded flex justify-between items-center">
                    <span>Score 80%+ in 2 quizzes</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">0/2</span>
                  </li>
                  <li className="p-3 border rounded flex justify-between items-center">
                    <span>Review 1 old chapter</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">0/1</span>
                  </li>
                  <li className="p-3 border rounded flex justify-between items-center">
                    <span>Daily reading: 15 mins English</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">0/1</span>
                  </li>
                  <li className="p-3 border rounded flex justify-between items-center">
                    <span>Finish 1 practice test</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">0/1</span>
                  </li>
                </ul>
            
                <div className="mt-4 p-3 bg-sky-50 rounded">
                  <p className="text-sm font-semibold mb-1 lg:text-lg">Weekly Streak</p>
                  <p className="text-xs text-gray-700 lg:text-sm">You’ve studied for 4 days in a row!</p>
                  <p className="text-xs text-gray-700 lg:text-sm">Streak: 4 days</p>
                </div>
              </div>
            
              <div className="bg-white rounded shadow p-5 ">
                <h3 className="text-lg font-bold mb-3 lg:text-xl">Quick Notepad</h3>
                <textarea
                  className="w-full h-28 border border-gray-300 rounded p-2 text-sm lg:text-lg"
                  placeholder="Draft your notes here..."
                ></textarea>
                <button
                  className="mt-3 px-4 py-2 text-sm lg:text-lg bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                >
                  Save Notes
                </button>

              </div>
            </section> */}
            {/* <!-- ACHIEVEMENTS (5 badges) --> */}
            <section className="container mx-auto bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold lg:text-xl">{t("homePage.achievements.title")}</h3>
              <p className="text-lg mb-4 leading-relaxed font-semibold">
                {t("homePage.achievements.description")}
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
                      alt={t(`homePage.achievements.badges.${badge.alt}.alt`)}
                      className="mx-auto mb-2 w-20 lg:w-28 rounded-full border-8 border-gray-100 shadow"
                    />
                    <p className="text-xs font-semibold lg:text-sm">{t(`homePage.achievements.badges.${badge.alt}.label`)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex   flex-col xl:flex-row gap-3  ">
              {/* <!-- DAILY TRIVIA --> */}
              <section className="flex flex-col bg-white rounded shadow p-5 xl:w-1/3 h-auto ">
                <div className="flex w-full justify-between items-center">
                  <div>
                    <img src="/images/dailyTrivia.png" alt="daily-Trivia" className="w-20 h-20" />
                  </div>
                  <div>
                    <FaInfoCircle size={20} color="gray" />
                  </div>
                </div>
                <h3 className="text-lg font-bold lg:text-xl">{t("homePage.dailyTrivia.title")}</h3>
                <p className="text-base mb-4 leading-relaxed">{t("homePage.dailyTrivia.description")}</p>

                <div className="flex py-4 px-4 rounded-lg">
                  <div className="w-full">
                    <p className="text-sm font-semibold mb-2 lg:text-lg">
                      {t("homePage.dailyTrivia.question")}
                    </p>

                    <div className="flex flex-col space-y-1 text-sm lg:text-md font-semibold">
                      <div className="flex w-full ">
                        {/* Sydney Option */}
                        <div className="flex items-center w-1/2">
                          <input type="radio" name="trivia" className="mr-2" />
                          {t("homePage.dailyTrivia.options.sydney.label")}
                        </div>

                        {/* Canberra Option (Left Radio, Right Text) */}
                        <div className="flex items-center  w-1/2 ">
                          <input type="radio" name="trivia" className="mr-2" />
                          <span >{t("homePage.dailyTrivia.options.canberra.label")}</span>
                        </div>
                      </div>

                      <div className="flex w-full  ">
                        {/* Melbourne Option */}
                        <div className="flex items-center w-1/2">
                          <input type="radio" name="trivia" className="mr-2" />
                          {t("homePage.dailyTrivia.options.melbourne.label")}
                        </div>

                        {/* Perth Option */}
                        <div className="flex items-center w-1/2">
                          <input type="radio" name="trivia" className="mr-2" />
                          {t("homePage.dailyTrivia.options.perth.label")}
                        </div>
                      </div>

                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className="mt-8 px-8 py-2 text-md lg:text-sm font-medium bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa]"
                        type="button"
                        onClick={() => alert(t("homePage.dailyTrivia.alertMessage"))}
                      >
                        {t("homePage.dailyTrivia.buttonText")}
                      </button>
                    </div>

                  </div>
                  {/* <div className="w-1/4">
                    <img src="/images/dailyTriva.png" alt="daily Trivia" />
                  </div> */}
                </div>
              </section>

              {/* <!-- TEAM / CLAN LEADERBOARD (5 items) --> */}
              <section className="bg-white rounded shadow p-5 xl:w-1/3">
                <div className="flex w-full justify-between items-center">
                  <div>
                    <img src="/images/communityLeader.png" alt="community-Leader" className="w-20 h-20" />
                  </div>
                  <div>
                    <FaInfoCircle size={20} color="gray" />
                  </div>
                </div>
                <h3 className="text-lg font-bold lg:text-2xl">{t("homePage.leaderboard.title")}</h3>
                <p className="text-base mb-4 leading-relaxed">{t("homePage.leaderboard.description")}</p>

                <ul className="list-disc list-inside text-sm space-y-1 lg:text-lg ">
                  <li>
                    <span className="font-sans font-medium">{t("homePage.leaderboard.users.user1.name")}</span> –
                    {t("homePage.leaderboard.users.user1.points")}
                  </li>
                  <li>
                    <span className="font-sans font-medium">{t("homePage.leaderboard.users.user2.name")}</span> –
                    {t("homePage.leaderboard.users.user2.points")}
                  </li>
                  <li>
                    <span className="font-sans font-medium">{t("homePage.leaderboard.users.user3.name")}</span> –
                    {t("homePage.leaderboard.users.user3.points")}
                  </li>
                  <li>
                    <span className="font-sans font-medium">{t("homePage.leaderboard.users.user4.name")}</span> –
                    {t("homePage.leaderboard.users.user4.points")}
                  </li>
                  <li>
                    <span className="font-sans font-medium">{t("homePage.leaderboard.users.user5.name")}</span> –
                    {t("homePage.leaderboard.users.user5.points")}
                  </li>
                </ul>
                <div className="flex w-full justify-end">
                  <a href="#" className="text-sm text-[#418BBB] font-semibold underline mt-8 inline-block lg:text-sm right-0">
                    {t("homePage.leaderboard.viewFullLeaderboard")}
                  </a>
                </div>

              </section>
              {/* <!-- UPCOMING QUIZZES (5 items) --> */}
              <section className="bg-white rounded shadow p-5  xl:w-1/3 ">
                <div className="flex w-full justify-between items-center">
                  <div>
                    <img src="/images/quiz.png" alt="quiz" className="w-20 h-20" />
                  </div>
                  <div>
                    <FaInfoCircle size={20} color="gray" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 lg:text-2xl">{t("homePage.upcomingQuizzes.title")}</h3>
                <ul className="space-y-4 text-sm lg:text-lg">
                  <li className="flex flex-row  justify-between bg-gray-100 p-3 rounded-md">
                    <div className="flex flex-col w-2/3 ">
                      <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz1.dateTime")}:</span>{' '}
                      <span className="italic">{t("homePage.upcomingQuizzes.quizzes.quiz1.title")}</span>
                    </div>
                    <div className="flex justify-center items-start w-1/3  ">
                      <button className=" text-xs lg:text-sm text-[#418BBB] underline font-semibold px-2 py-1 rounded-lg hover:text-[#4080aa]" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                        {t("homePage.upcomingQuizzes.remindMe")}
                      </button>
                    </div>
                  </li>

                  <li className="flex flex-row  justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex flex-col w-2/3 ">
                      <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz2.dateTime")}:</span>{' '}
                      <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz2.title")}</span>
                    </div>
                    <div className="flex justify-center items-start w-1/3  ">
                      <button className=" text-xs lg:text-sm text-[#418BBB] underline font-semibold px-2 py-1 rounded-lg hover:text-[#4080aa]" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                        {t("homePage.upcomingQuizzes.remindMe")}
                      </button>
                    </div>
                  </li>

                  <li className="flex flex-row justify-between bg-gray-100 p-3 rounded-md">
                    <div className="flex flex-col w-2/3 ">
                      <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz3.dateTime")}:</span>{' '}
                      <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz3.title")}</span>
                    </div>
                    <div className="flex justify-center items-start w-1/3  ">
                      <button className=" text-xs lg:text-sm text-[#418BBB] underline font-semibold px-2 py-1 rounded-lg hover:text-[#4080aa]" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                        {t("homePage.upcomingQuizzes.remindMe")}
                      </button>
                    </div>
                  </li>

                  {/* <li className="flex justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex max-sm:flex-col w-2/3">
                      <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz4.dateTime")}:</span>{' '}
                      <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz4.title")}</span>
                    </div>
                    <div className="flex justify-center items-center w-1/3 ">
                      <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                        {t("homePage.upcomingQuizzes.remindMe")}
                      </button>
                    </div>
                  </li>

                  <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                    <div className="flex max-sm:flex-col w-2/3">
                      <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz5.dateTime")}:</span>{' '}
                      <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz5.title")}</span>
                    </div>
                    <div className="flex justify-center items-center w-1/3 ">
                      <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                        {t("homePage.upcomingQuizzes.remindMe")}
                      </button>
                    </div>

                  </li> */}
                </ul>
              </section>
            </section>





            {/* <!-- DAILY TRIVIA --> */}
            {/* <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold lg:text-2xl">{t("homePage.dailyTrivia.title")}</h3>
              <p className="text-base mb-4 leading-relaxed">{t("homePage.dailyTrivia.description")}</p>

              <div className="flex py-4 px-8 border border-neutral-600 rounded-lg">
                <div className="w-3/4">
                  <p className="text-sm font-semibold mb-2 lg:text-lg">{t("homePage.dailyTrivia.question")}</p>
                  <ul className="space-y-1 text-sm lg:text-lg">
                    <li>
                      <input type="radio" name="trivia" className="mr-2" />
                      {t("homePage.dailyTrivia.options.sydney.label")}
                    </li>
                    <li>
                      <input type="radio" name="trivia" className="mr-2" />
                      {t("homePage.dailyTrivia.options.canberra.label")}
                    </li>
                    <li>
                      <input type="radio" name="trivia" className="mr-2" />
                      {t("homePage.dailyTrivia.options.melbourne.label")}
                    </li>
                    <li>
                      <input type="radio" name="trivia" className="mr-2" />
                      {t("homePage.dailyTrivia.options.perth.label")}
                    </li>
                  </ul>
                  <button
                    className="mt-3 px-8 py-2 text-md lg:text-sm font-medium bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa]"
                    type="button"
                    onClick={() => alert(t("homePage.dailyTrivia.alertMessage"))}
                  >
                    {t("homePage.dailyTrivia.buttonText")}
                  </button>
                </div>
                <div className="w-1/4">
                  <img src="/images/dailyTriva.png" alt="daily Trivia" />
                </div>
              </div>
            </section> */}


            {/* <!-- UPCOMING QUIZZES (5 items) --> */}
            {/* <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-3 lg:text-2xl">{t("homePage.upcomingQuizzes.title")}</h3>
              <ul className="space-y-1 text-sm lg:text-lg">
                <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                  <div className="flex max-sm:flex-col w-2/3">
                    <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz1.dateTime")}:</span>{' '}
                    <span className="italic">{t("homePage.upcomingQuizzes.quizzes.quiz1.title")}</span>
                  </div>
                  <div className="flex justify-center items-center w-1/3 ">
                  <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={()=> toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                    {t("homePage.upcomingQuizzes.remindMe")}
                  </button>
                  </div>
                </li>

                <li className="flex justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex max-sm:flex-col w-2/3">
                    <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz2.dateTime")}:</span>{' '}
                    <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz2.title")}</span>
                  </div>
                  <div className="flex justify-center items-center w-1/3">
                  <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={()=> toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                    {t("homePage.upcomingQuizzes.remindMe")}
                  </button>
                  </div>
                </li>

                <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                  <div className="flex max-sm:flex-col w-2/3">
                    <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz3.dateTime")}:</span>{' '}
                    <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz3.title")}</span>
                  </div>
                  <div className="flex justify-center items-center w-1/3 ">
                  <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={()=> toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                    {t("homePage.upcomingQuizzes.remindMe")}
                  </button>
                  </div>
                </li>

                <li className="flex justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex max-sm:flex-col w-2/3">
                    <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz4.dateTime")}:</span>{' '}
                    <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz4.title")}</span>
                  </div>
                  <div className="flex justify-center items-center w-1/3 ">
                  <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={()=> toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                    {t("homePage.upcomingQuizzes.remindMe")}
                  </button>
                  </div>
                </li>

                <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                  <div className="flex max-sm:flex-col w-2/3">
                    <span className="font-sans font-medium">{t("homePage.upcomingQuizzes.quizzes.quiz5.dateTime")}:</span>{' '}
                    <span className="italic line-clamp-1">{t("homePage.upcomingQuizzes.quizzes.quiz5.title")}</span>
                  </div>
                  <div className="flex justify-center items-center w-1/3 ">
                  <button className=" text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded-lg hover:bg-[#4080aa]" onClick={()=> toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                    {t("homePage.upcomingQuizzes.remindMe")}
                  </button>
                  </div>
               
                </li>
              </ul>
            </section> */}


            {/* <!-- TEAM / CLAN LEADERBOARD (5 items) --> */}
            {/* <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold lg:text-2xl">{t("homePage.leaderboard.title")}</h3>
              <p className="text-base mb-4 leading-relaxed">{t("homePage.leaderboard.description")}</p>

              <ol className="list-decimal list-inside text-sm space-y-1 lg:text-lg">
                <li>
                  <span className="font-sans font-medium">{t("homePage.leaderboard.users.user1.name")}</span> –
                  {t("homePage.leaderboard.users.user1.points")}
                </li>
                <li>
                  <span className="font-sans font-medium">{t("homePage.leaderboard.users.user2.name")}</span> –
                  {t("homePage.leaderboard.users.user2.points")}
                </li>
                <li>
                  <span className="font-sans font-medium">{t("homePage.leaderboard.users.user3.name")}</span> –
                  {t("homePage.leaderboard.users.user3.points")}
                </li>
                <li>
                  <span className="font-sans font-medium">{t("homePage.leaderboard.users.user4.name")}</span> –
                  {t("homePage.leaderboard.users.user4.points")}
                </li>
                <li>
                  <span className="font-sans font-medium">{t("homePage.leaderboard.users.user5.name")}</span> –
                  {t("homePage.leaderboard.users.user5.points")}
                </li>
              </ol>

              <a href="#" className="text-sm text-[#418BBB] font-semibold underline mt-2 inline-block lg:text-sm">
                {t("homePage.leaderboard.viewFullLeaderboard")}
              </a>
            </section> */}

            {/* <!-- COLLABORATION / STUDY GROUPS --> */}
            {/* <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-3 lg:text-xl">Collaboration & Study Groups</h3>
              <p className="text-sm text-gray-600 mb-4 lg:text-lg">
                Learn with friends or classmates in real time. Share notes, quizzes, and achievements.
              </p>
              <button
                className="px-4 py-2 text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa] lg:text-sm"
              >
                Create / Join a Group
              </button>

            </section> */}
            {/* <!-- QUIZ ME QUICK LAUNCH --> */}
            {/* <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-3 lg:text-xl">Quiz Me Quick Launch</h3>
              <div className="flex items-center space-x-2 mb-3">
                <select className="border border-gray-300 rounded px-2 py-1 text-sm lg:text-lg">
                  <option>Math</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>History</option>
                  <option>Programming</option>
                </select>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm lg:text-lg">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <button
                className="px-4 py-2 text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa] lg:text-sm"
                onClick={() => router.push("/Quizme")}
              >
                Start Quiz
              </button>

            </section> */}
            {/* <!-- TEACHER TOOLS --> */}
            {/* <section id="teacher-tools" className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-3 lg:text-xl">Teacher Tools</h3>
              <p className="text-sm text-gray-600 mb-4 lg:text-lg">
                Assign chapters, post quizzes, and monitor class progress—ideal for educators.
              </p>
              <button
                className="px-4 py-2 text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa] lg:text-sm"
              >
                Assign New Lesson
              </button>

            </section> */}
            {/* <!-- PROMO / INFO CARDS (Pro upgrade, limited offer) --> */}
            <section className="flex flex-col md:flex-row md:space-x-4 my-4">
              <div className="bg-pink-50 border justify-between border-pink-100 rounded-lg p-4 shadow-sm w-full md:w-1/2 hover:shadow-md transition-shadow mb-4 md:mb-0">
                <div>
                  <h4 className="text-sm font-bold text-pink-600 mb-2 lg:text-2xl">{t("homePage.upgradePro.title")}</h4>
                  <p className="text-gray-700 mb-3 lg:text-md">{t("homePage.upgradePro.description")}</p>
                </div>
                <button className="bg-pink-500 text-white text-md font-semibold mt-4 px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors lg:text-sm" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                  {t("homePage.upgradePro.buttonText")}
                </button>
              </div>

              <div className="flex flex-col bg-purple-50 border justify-between border-purple-100 rounded-lg p-4 shadow-sm w-full md:w-1/2 hover:shadow-md transition-shadow" onClick={() => toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                <div>
                  <h4 className="text-sm font-bold text-[#418BBB] mb-2 lg:text-2xl">{t("homePage.limitedTimeOffer.title")}</h4>
                  <p className="text-gray-700 lg:text-md text-semibold">{t("homePage.limitedTimeOffer.description")}</p>
                  <p className="text-gray-600 italic font-semibold lg:text-md">{t("homePage.limitedTimeOffer.offerEndsSoon")}</p>
                </div>

                <div>
                  <button className="bg-[#418BBB] text-white text-md font-semibold mt-4 px-4 py-2 rounded-lg hover:bg-[#3776a0] transition-colors lg:text-sm">
                    {t("homePage.limitedTimeOffer.buttonText")}
                  </button>
                </div>
              </div>
            </section>

            {/* <!-- ========== REFERRAL / AFFILIATE SECTION ========== --> */}
            {/* <section id="referral" className="bg-red-50 p-6 rounded shadow my-4">
              <h2 className="text-2xl font-bold mb-2">Referral & Affiliate Program</h2>
              <p className="text-sm mb-4 leading-relaxed">
                Spread the word and earn rewards! Share your unique link and get free premium days when friends sign up.
              </p>
              <ul className="list-decimal list-inside text-sm space-y-1">
                <li>Earn 7 days of Pro for each friend who subscribes</li>
                <li>Friends get 20% off their first month</li>
                <li>No limit—invite as many as you want!</li>
              </ul>
              <button
                onClick={handleReferralClick}
                className="bg-[#418BBB] text-white px-4 py-2 text-sm rounded hover:bg-[#4080aa] mt-4 hover:scale-105"
              >
                Get Your Referral Link
              </button>

            </section> */}
          </div>

        </div>
      </Layout>


    </div>
  );
};

export default HomePage;
