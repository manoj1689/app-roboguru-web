'use client'
import React, { useState } from "react";
import Layout from "@/components/HomeLayout";
import Link from 'next/link';
import { MdCloudDownload } from "react-icons/md";
import { useRouter } from "next/router";
import TrendingTopicsSection from "./TrendingTopic";
import SubjectList from "./SubjectList";
import GreetingBar from "@/components/GreetingBar";
const HomePage = () => {
  const router = useRouter()
  const handleReferralClick = () => {
    // Logic for generating or copying the referral link
    console.log("Get Your Referral Link button clicked");
    alert("Your referral link has been generated!");
  };
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log("File uploaded:", file);
    alert(`File "${file.name}" uploaded successfully!`);
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleAvatarSelection = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleChatStart = () => {
    if (!selectedAvatar) {
      alert("Please select an AI Avatar to proceed!");
    } else if (!uploadedFile) {
      alert("Please upload a file or image to proceed!");
    } else {
      router.push("/Chat")
    }
  };


  return (
    <div>
      <Layout>
        <div >
          {/* Left Menu */}
          
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
              <h3 className="text-lg font-bold mb-3">Scan & Pick Image → AI Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a file or image, then ask AI about it. Choose an AI avatar/personality for a unique experience.
              </p>

              {/* Drag-and-Drop Box */}
              {uploadedFile ? (
                <div className="text-center">
                  {uploadedFile.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Uploaded Preview"
                      className="w-full max-w-sm mx-auto rounded mb-4 "
                    />
                  )}
                  <p className="text-sm text-gray-700 mb-2">File: {uploadedFile.name}</p>
                  <button
                    onClick={handleFileRemove}
                    className="text-xs bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 mr-2"
                  >
                    Remove File
                  </button>
                  <button
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className="text-xs bg-[#418BBB] text-white px-3 py-1 rounded hover:bg-[#4080aa]"
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div
                  className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition-all ${dragging ? "border-[#418BBB] bg-white" : "border-gray-300 bg-white"
                    }`}
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById("fileInput")?.click()}
                ><div className="flex w-full justify-center">
                    <MdCloudDownload size={40} color="gray" />
                  </div>

                  <p className="text-sm text-gray-600">
                    {dragging
                      ? "Drop your file here..."
                      : "Drag & Drop your file here, or click to select"}
                  </p>
                </div>
              )}

              <input
                id="fileInput"
                type="file"
                accept="image/*,.pdf,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              {/* Quick Question */}
              <label className="block text-sm font-bold text-gray-700 mb-1 mt-4">
                Quick question (optional):
              </label>
              <input
                type="text"
                placeholder="Any specific query about this file?"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none mb-3"
              />

              {/* AI Avatar / Personality Checkboxes */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose AI Avatar:
              </label>
              <div className="max-lg:flex-col flex max-lg:space-y-2 items-center lg:space-x-2">
                {["Friendly Tutor", "Strict Coach", "Playful Robot"].map((avatar) => (
                  <label
                    key={avatar}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAvatar === avatar}
                      onChange={() => handleAvatarSelection(avatar)}
                      className="mr-2"
                    />
                    {avatar}
                  </label>
                ))}
              </div>

              {/* Start AI Chat Button */}
              <div className="flex w-full items-center">
                <button
                  onClick={handleChatStart}
                  className="mt-4 px-4 py-2 text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa] mx-auto transition-colors"
                >
                  Start AI Chat
                </button>
              </div>
            </section>
            {/* <!-- RECOMMENDED (5 items) --> */}
            <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-4">Recommended for You</h3>
              <p className="text-sm text-gray-600 mb-4">Based on your recent activity:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Card 1 - Trigonometry Basics */}
                <div className="border rounded-lg p-4 hover:shadow transition-shadow">
                  <h4 className="font-semibold text-sm lg:text-lg mb-1">Trigonometry Basics</h4>
                  <p className="text-xs lg:text-sm text-gray-500">Math | Class X</p>
                  <p className="text-xs lg:text-sm text-gray-700 mt-2 line-clamp-2">
                    Complete your last practice set on angles and identities.
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-block px-3 py-1 text-xs lg:text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                  >
                    Resume
                  </Link>
                </div>

                {/* Card 2 - Poetry Analysis */}
                <div className="border rounded-lg p-4 hover:shadow transition-shadow">
                  <h4 className="font-semibold text-sm lg:text-lg mb-1">Poetry Analysis</h4>
                  <p className="text-xs lg:text-sm text-gray-500">English | Class IX</p>
                  <p className="text-xs lg:text-sm text-gray-700 mt-2 line-clamp-2">
                    Dive deeper into classic poems and improve your literary insights.
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-block px-3 py-1 text-xs lg:text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                  >
                    Explore
                  </Link>
                </div>

                {/* Card 3 - Electrostatics */}
                <div className="border rounded-lg p-4 hover:shadow transition-shadow">
                  <h4 className="font-semibold text-sm lg:text-lg mb-1">Electrostatics</h4>
                  <p className="text-xs lg:text-sm text-gray-500">Physics | Class XI</p>
                  <p className="text-xs lg:text-sm text-gray-700 mt-2 line-clamp-2">
                    Review Coulomb’s law and solve new practice questions.
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-block px-3 py-1 text-xs lg:text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                  >
                    Continue
                  </Link>
                </div>

                {/* Card 4 - Chemical Bonds */}
                <div className="border rounded-lg p-4 hover:shadow transition-shadow">
                  <h4 className="font-semibold text-sm lg:text-lg mb-1">Chemical Bonds</h4>
                  <p className="text-xs lg:text-sm text-gray-500">Chemistry | Class IX</p>
                  <p className="text-xs lg:text-sm text-gray-700 mt-2 line-clamp-2">
                    Learn about ionic, covalent, and metallic bonds.
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-block px-3 py-1 text-xs lg:text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                  >
                    Resume
                  </Link>
                </div>

                {/* Card 5 - Programming Basics */}
                <div className="border rounded-lg p-4 hover:shadow transition-shadow">
                  <h4 className="font-semibold text-sm lg:text-lg mb-1">Programming Basics</h4>
                  <p className="text-xs lg:text-sm text-gray-500">Coding | Class X</p>
                  <p className="text-xs lg:text-sm text-gray-700 mt-2 line-clamp-2">
                    Finish the array exercises and debug sample programs.
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-block px-3 py-1 text-xs lg:text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            </section>


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
            <section className="bg-white rounded shadow p-5">
              <h3 className="text-lg font-bold mb-3 lg:text-xl">Achievements & Badges</h3>
              <p className="text-sm text-gray-600 mb-4 lg:text-lg">
                Keep up the good work—collect badges as you master new concepts.
              </p>
              <div className="flex flex-wrap justify-around">
                {/* Achievement 1 */}
                <div className="text-center">
                  <img
                    src="/images/badge-award1.png"
                    alt="Math Whiz Badge"
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">Math Whiz</p>
                </div>
                {/* Achievement 2 */}
                <div className="text-center">
                  <img
                    src="/images/badge-award2.png"
                    alt="Science Star Badge"
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">Science Star</p>
                </div>
                {/* Achievement 3 */}
                <div className="text-center">
                  <img
                    src="/images/badge-award3.png"
                    alt="Literature Lover Badge"
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">Literature Lover</p>
                </div>
                {/* Achievement 4 */}
                <div className="text-center">
                  <img
                    src="/images/badge-award4.png"
                    alt="History Buff Badge"
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">History Buff</p>
                </div>
                {/* Achievement 5 */}
                <div className="text-center">
                  <img
                    src="/images/badge-award5.png"
                    alt="Coding Guru Badge"
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">Maths Whiz</p>
                </div>
                {/* Achievement 6 */}
                <div className="text-center">
                  <img
                    src="/images/badge-award6.png"
                    alt="Coding Guru Badge"
                    className="mx-auto mb-2 w-20 lg:w-32 rounded-full shadow"
                  />
                  <p className="text-xs font-semibold lg:text-sm">Physics Champ</p>
                </div>

              </div>
            </section>
            {/* <!-- DAILY TRIVIA --> */}
            <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-4 lg:text-xl">Daily Trivia</h3>
              <p className="text-sm text-gray-600 mb-4 lg:text-lg">
                Boost your knowledge with a quick question! Earn points for correct answers.
              </p>
              <div className="border rounded-lg p-4 hover:shadow transition-shadow">
                <p className="text-sm font-semibold mb-2 lg:text-lg">
                  Question: What is the capital of Australia?
                </p>
                <ul className="space-y-1 text-sm lg:text-lg">
                  <li>
                    <input type="radio" name="trivia" className="mr-2" /> Sydney
                  </li>
                  <li>
                    <input type="radio" name="trivia" className="mr-2" /> Canberra
                  </li>
                  <li>
                    <input type="radio" name="trivia" className="mr-2" /> Melbourne
                  </li>
                  <li>
                    <input type="radio" name="trivia" className="mr-2" /> Perth
                  </li>
                </ul>
                <button
                  className="mt-3 px-3 py-1 text-xs lg:text-sm bg-[#418BBB] text-white rounded hover:bg-[#4080aa]"
                  type="button"
                  onClick={() => alert('Answer submitted!')}
                >
                  Submit
                </button>

              </div>
            </section>
            {/* <!-- UPCOMING QUIZZES (5 items) --> */}
            <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-3 lg:text-xl">Upcoming Quizzes & Tests</h3>
              <ul className="space-y-1 text-sm lg:text-lg">
                <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                  <div><strong>Mar 15, 4 PM:</strong>{' '}
                  <span className="italic">Algebra Quiz (Ch. 5-7)</span>{' '}</div>
                  <button className="text-xs mr-4 lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded hover:bg-[#4080aa]">
                    Remind Me
                  </button>
                </li>
                <li className="flex justify-between bg-gray-50 p-3 rounded-md">
                  <div><strong>Mar 18, 2 PM:</strong>{' '}
                  <span className="italic">Biology: Cell Structure Test</span>{' '}</div>
                  <button className="mr-4 text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded hover:bg-[#4080aa]">
                    Remind Me
                  </button>
                </li>
                <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                  <div><strong>Mar 20, 10 AM:</strong>{' '}
                  <span className="italic">Geography: Maps & Regions Quiz</span>{' '}</div>
                  <button className="mr-4 text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded hover:bg-[#4080aa]">
                    Remind Me
                  </button>
                </li>
                <li className="flex justify-between bg-gray-50 p-3 rounded-md">
                  <div><strong>Mar 25, 1 PM:</strong>{' '}
                  <span className="italic">Programming: Array Challenges</span>{' '}</div>
                  <button className="mr-4 text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded hover:bg-[#4080aa]">
                    Remind Me
                  </button>
                </li>
                <li className="flex justify-between bg-gray-100 p-3 rounded-md">
                  <div><strong>Mar 28, 11 AM:</strong>{' '}
                  <span className="italic">History: Medieval Era Test</span>{' '}</div>
                  <button className="mr-4 text-xs lg:text-sm bg-[#418BBB] text-white px-2 py-1 rounded hover:bg-[#4080aa]">
                    Remind Me
                  </button>
                </li>
              </ul>
            </section>

            {/* <!-- TEAM / CLAN LEADERBOARD (5 items) --> */}
            <section className="bg-white rounded shadow p-5 my-4">
              <h3 className="text-lg font-bold mb-3 lg:text-xl">Community Leaderboard</h3>
              <p className="text-sm text-gray-600 mb-4 lg:text-lg">
                Top contributors in the forum this week:
              </p>
              <ol className="list-decimal list-inside text-sm space-y-1 lg:text-lg">
                <li><strong>AlgebraNerd007</strong> – 1200 points</li>
                <li><strong>PhysicsPro99</strong> – 1100 points</li>
                <li><strong>BioWizard</strong> – 950 points</li>
                <li><strong>CodingGuru</strong> – 900 points</li>
                <li><strong>LiteratureLover</strong> – 850 points</li>
              </ol>
              <a href="#" className="text-xs text-[#418BBB] font-semibold underline mt-2 inline-block lg:text-sm">
                View Full Leaderboard
              </a>
            </section>
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
            <section className="flex flex-col md:flex-row md:space-x-4 my-4 ">
              <div className="bg-pink-50 border border-pink-100 rounded-lg p-4 shadow-sm w-full md:w-1/2 hover:shadow-md transition-shadow mb-4 md:mb-0">
                <h4 className="text-sm font-bold text-pink-600 mb-2 lg:text-lg">Upgrade to Pro</h4>
                <p className="text-xs text-gray-700 mb-3 lg:text-sm">
                  Get unlimited AI queries, voice mode, advanced analytics, and more with our Pro plan.
                </p>
                <button
                  className="bg-[#418BBB] text-white text-xs px-3 py-1 rounded hover:bg-[#4080aa] transition-colors lg:text-sm"
                >
                  Upgrade
                </button>

              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 shadow-sm w-full md:w-1/2 hover:shadow-md transition-shadow">
                <h4 className="text-sm font-bold text-purple-600 mb-2 lg:text-lg">Limited Time Offer</h4>
                <p className="text-xs text-gray-700 mb-3 lg:text-sm">
                  Use code <strong>STUDY20</strong> at checkout to get 20% off your first 3 months.
                </p>
                <p className="text-xs text-gray-600 italic lg:text-sm">Hurry—offer ends soon!</p>
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
