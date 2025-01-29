import React, { useState } from 'react'
import Layout from '@/components/LandingLayout';
import Link from 'next/link';

function index() {
  const [question, setQuestion] = useState("");     
  const [response, setResponse] = useState<string | null>(null);

  const discussions = [
    {
      title: "Most Discussed: Algebra Basics",
      description: "45 replies, last updated 1 hr ago.",
      link: "/Discussion",
    },
    {
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
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-8 ">
              {/* Hero Text */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl text-white md:text-5xl font-bold mb-4">Empowering Learning with AI Excellence</h1>
                <p className="text-sm  md:text-lg mb-6 text-gray-950 font-normal leading-relaxed">
                  Learn anytime, anywhere with instant AI guidance. Master any subject through
                  interactive lessons and personalized tracking.
                </p>
                <a href="#features" className="inline-block text-[#63A7D4] bg-white px-6 py-2 text-sm font-medium rounded hover:text-[#427699] hover:bg-neutral-100 hover:scale-105">
                  Get Started for Free
                </a>
              </div>
              {/* Hero Image */}
              <div className="md:w-1/2">
                <img src="/images/leftbanner.png" alt="Header-banner" />
              </div>
            </div>
          </section>
          {/* <!-- END HERO SECTION --> */}

          {/* <!-- KEY FEATURE SECTION --> */}

          <section id="features" className="container mx-auto bg-white p-6 rounded my-4 shadow">
            <h2 className="text-2xl font-bold mb-2">Key Features</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Explore our AI-driven tools that make learning faster, smarter, and more interactive.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="flex flex-col p-4 items-center hover:shadow-lg hover:rounded-lg transition-shadow hover:scale-105 hover:bg-gray-50">
                <img
                  src="/images/chatAi.png"
                  alt="AI Chat Icon"
                  className="mb-3 w-20 h-20 "
                />
                <h3 className="font-semibold">AI Chat & Voice Mode</h3>
                <p className="text-sm mt-2 text-gray-600 leading-relaxed text-center">
                  Ask questions via text or voice and get instant, step-by-step explanations.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col p-4 items-center hover:shadow-lg hover:rounded-lg transition-shadow hover:scale-105 hover:bg-gray-50">
                <img
                  src="/images/dashboard.png"
                  alt="Dashboard Icon"
                  className="mb-3 w-20 h-20 rounded"
                />
                <h3 className="font-semibold">Personalized Dashboard</h3>
                <p className="text-sm mt-2 text-gray-600 leading-relaxed text-center">
                  Track your progress, see completed chapters, and get custom study suggestions.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col p-4 items-center hover:shadow-lg hover:rounded-lg transition-shadow hover:scale-105 hover:bg-gray-50">
                <img
                  src="/images/subjectNavigation.png"
                  alt="Navigation Icon"
                  className="mb-3 w-20 h-20 rounded"
                />
                <h3 className="font-semibold">Subject & Chapter Navigation</h3>
                <p className="text-sm mt-2 text-gray-600 leading-relaxed text-center">
                  Find topics by class/grade. Each chapter has key concepts, practice, and tips.
                </p>
              </div>
            </div>
            {/* Accessibility Section */}
            <div className="mt-6 p-4 bg-sky-50 rounded">
              <h4 className="font-semibold text-[#418BBB]">Accessibility Features</h4>
              <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                Our platform supports screen readers, voice input, and large-text modes
                to accommodate diverse learners.
              </p>
            </div>
          </section>

          {/* <!--END KEY FEATURE SECTION --> */}

          {/* <!--HOW IT WORKS SECTION --> */}
          <section id="how-it-works" className="container mx-auto bg-white p-6 mb-4 rounded shadow">
            {/* Section Header */}
            <h2 className="text-2xl font-bold mb-2 ">How It Works</h2>
            <p className="text-sm mb-4 leading-relaxed ">
              Get started in just a few simple steps to supercharge your learning with AI.
            </p>

            {/* Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
              {/* Step 1: Sign Up / Create Profile */}
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="/images/img1.png"
                  alt="Sign Up Icon"
                  className="mb-3 p-2"
                />
                <h3 className="font-semibold text-lg">Sign Up / Create Profile</h3>
                <p className="text-sm mt-2 text-gray-700">
                  Use your email or phone to create an account, then set your class or grade level.
                </p>
              </div>

              {/* Step 2: Select Subjects */}
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="/images/img2.png"
                  alt="Select Subjects Icon"
                  className="mb-3 p-2"
                />
                <h3 className="font-semibold text-lg">Select Subjects</h3>
                <p className="text-sm mt-2 text-gray-700">
                  Choose topics you want to learn, like Math, Science, or Languages.
                </p>
              </div>

              {/* Step 3: Ask AI or Explore Chapters */}
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="/images/img3.png"
                  alt="Ask AI Icon"
                  className="mb-3 p-2"
                />
                <h3 className="font-semibold text-lg"> Ask AI or Explore Chapters</h3>
                <p className="text-sm mt-2 text-gray-700">
                  Use text or voice mode to ask questions, or browse structured lessons.
                </p>
              </div>

              {/* Step 4: Track Progress & Get Suggestions */}
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="/images/img4.png"
                  alt="Track Progress Icon"
                  className="mb-3 p-2"
                />
                <h3 className="font-semibold text-lg"> Track Progress & Get Suggestions</h3>
                <p className="text-sm mt-2 text-gray-700">
                  Monitor your learning stats, see recommended next steps, and stay motivated.
                </p>
              </div>
            </div>

          </section>
          {/* <!--END HOW IT WORKS SECTION --> */}

          {/* <!-- ========== SAMPLE AI CHAT ========== --> */}
          <section id="sample-chat" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Preview a Sample AI Chat</h2>
            <p className="text-sm mb-4 leading-relaxed">
              See a quick example of RoboGuru in action.
            </p>
            <div className="p-4 border rounded space-y-3 bg-gray-50">
              <div>
                <p className="text-red-500 font-semibold">User:</p>
                <p className="text-sm italic bg-white p-2 rounded mt-1">
                  Explain the Pythagorean theorem with an example.
                </p>
              </div>
              <div>
                <p className="text-purple-600 font-semibold">RoboGuru AI:</p>
                <p className="text-sm bg-white p-2 rounded mt-1">
                  The Pythagorean theorem states that in a right triangle, c² = a² + b².
                  For example, if a = 3 and b = 4, then c = 5.
                </p>
              </div>
            </div>
          </section>
          {/* <!-- END SAMPLE AI CHAT --> */}

          {/* <!-- ========== COMMUNITY SECTION ========== --> */}
          <section id="community" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Connect with peers, get tips, and share insights on our discussion forums.
            </p>
            {/* Discussion Cards */}
            <div className="grid grid-cols-1  gap-4">
              {discussions.map((discussion, index) => (
                <div
                  key={index}
                  className="p-4 border rounded hover:shadow-lg transition-shadow hover:border-stone-400"
                >
                  <h4 className="font-semibold">{discussion.title}</h4>
                  <p className="text-sm mt-1">{discussion.description}</p>
                  <a
                    href={discussion.link}
                    className="text-pink-500 text-sm hover:underline mt-2 inline-block"
                  >
                    View Discussion
                  </a>
                </div>
              ))}
            </div>
          </section>
          {/* <!-- END COMMUNITY --> */}

          <section id="leaderboard" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Community Leaderboard</h2>
            <p className="text-sm mb-4 leading-relaxed">
              See who’s earning the most badges or providing top answers in the forum.
            </p>
            {/* Leaderboard List */}
            <ol className="list-decimal list-inside text-sm space-y-2">
              {leaderboard.map((user, index) => (
                <li key={index}>
                  <strong>{user.name}</strong> – {user.points} points
                </li>
              ))}
            </ol>
            {/* View Full Leaderboard Link */}
            <Link
              href="/Leaderboard"
              className="text-pink-500 hover:underline text-sm block mt-3"
            >
              View Full Leaderboard
            </Link>
          </section>
          {/* <!-- ========== TEACHER / PARENT PORTAL INFO ========== --> */}
          <section id="teacher-portal" className="container relative mx-auto bg-white p-6 rounded shadow my-4">
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 bg-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              Coming Soon...
            </div>
            <h2 className="text-2xl font-bold mb-2">Teacher & Parent Portal</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Manage multiple students, assign chapters, and track progress all in one place.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="md:w-1/2">
                <img
                  src="./images/parentportal.png"
                  alt="Teacher Dashboard Screenshot"
                  className="w-full  "
                />
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 flex flex-col space-y-6">
                {/* Teacher Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Teacher</h3>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>Assign homework or practice quizzes</li>
                    <li>Monitor each student’s AI chat logs</li>
                    <li>Generate performance reports & analytics</li>
                  </ul>
                </div>

                {/* Parent Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Parents</h3>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>Assign homework or practice quizzes</li>
                    <li>Monitor each student’s AI chat logs</li>
                    <li>Generate performance reports & analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- ACHIEVEMENTS (5 badges) --> */}
          <section className="container mx-auto bg-white rounded shadow p-5 my-4">
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
          {/* <!-- ========== CERTIFICATES OF COMPLETION ========== --> */}
          <section id="certificates" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Certificates of Completion</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Earn shareable certificates for completing courses or mastering specific skill sets.
            </p>
            <img
              src="/images/certificate.webp"
              alt="Certificate Example"
              className="md:w-3/4 mx-auto rounded shadow object-cover p-4"
            />
          </section>

          {/* <!-- END CERTIFICATES --> */}

          {/* <!-- ========== SUCCESS STORIES ========== --> */}
          <section id="success-stories" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Success Stories</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Discover how learners improved their scores and gained confidence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Story 1 */}
              <div className="p-4 border rounded hover:shadow transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src="/images/story1.png"
                    alt="Alice"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">Alice W.</p>
                    <p className="text-xs text-gray-600">Math score: 60% → 90%</p>
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  “RoboGuru’s AI Chat cleared my doubts instantly and gave me extra practice questions!”
                </blockquote>
              </div>
              {/* Story 2 */}
              <div className="p-4 border rounded hover:shadow transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src="/images/story2.png"
                    alt="Rahul"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">Rahul G.</p>
                    <p className="text-xs text-gray-600">GPA: 2.8 → 3.5</p>
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  “The personalized dashboard kept me focused on each subject. Highly recommended!”
                </blockquote>
              </div>
              {/* Story 3 */}
              <div className="p-4 border rounded hover:shadow transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src="/images/story3.png"
                    alt="Samantha"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">Samantha K.</p>
                    <p className="text-xs text-gray-600">Science score: 50% → 85%</p>
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  “With RoboGuru’s tailored quizzes, I became more confident in science and aced my exams!”
                </blockquote>
              </div>
            </div>
          </section>

          {/* <!-- END SUCCESS STORIES --> */}

          {/* <!-- ========== PRESS & PARTNERS / AWARDS ========== --> */}
          <section id="press-partners" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Press, Partners & Awards</h2>
            <p className="text-sm mb-4 leading-relaxed">
              We’re honored to be recognized and collaborate with these amazing organizations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-4">
              {/* Partner 1 */}

              <div className='px-4 items-start'>
                <img
                  src="/images/globalAwards.webp"
                  alt="EdTech Global"
                  className=" mb-2 object-cover w-64 h-40 rounded-lg"
                />
                <p className="text-sm font-semibold italic  ">Ed Tech Global
                </p>
                <p className="text-sm font-semibold italic  ">
                  Innovation</p>
              </div>


              {/* Partner 2 */}
              <div className="">
                <img
                  src="/images/awards.enc"
                  alt="Future Learning Awards"
                  className=" mb-2 object-cover w-64 h-40 rounded-lg"
                />
                <p className="text-sm font-semibold italic">Future of Learning </p>
                <p className="text-sm font-semibold italic">Awards 2024</p>
              </div>
              {/* Partner 3 */}
              <div className="">
                <img
                  src="/images/techAwards.jpg"
                  alt="Tech Innovations"
                  className=" mb-2 object-cover w-64 h-40 rounded-lg"
                />
                <p className="text-sm font-semibold italic">Technology Innovations
                </p>
                <p className="text-sm font-semibold italic"> Award 2025</p>
              </div>
            </div>
            {/* Blockquote */}
            <blockquote className="mt-4 border-l-4 border-red-400 pl-4 text-sm italic text-gray-700">
              “RoboGuru is revolutionizing how students learn with AI.” – Tech Education Times
            </blockquote>
          </section>

          {/* <!-- END PRESS & PARTNERS --> */}
          {/* <!-- ========== CTA BLOCK ========== --> */}
          <section id="cta-block" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Ready to Empower Your Learning?</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Sign up now or watch our quick video demo to see RoboGuru in action.
            </p>
            <div className="space-x-3">
              {/* Sign Up Button */}
              <a
                href="#signup"
                className="inline-block bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#397daa] text-sm"
              >
                Sign Up Free
              </a>
              {/* Watch Demo Button */}
              <a
                href="#video-demo"
                className="inline-block border border-[#418BBB] text-[#418BBB] px-4 py-2 rounded hover:text-[#397daa] hover:bg-[#dce9f1] text-sm"
              >
                Watch Demo
              </a>
            </div>
          </section>

          {/* <!-- END CTA BLOCK --> */}
          {/* <!-- ========== WHY CHOOSE ROBOGURU (COMPARISON) ========== --> */}
          <section id="why-choose-roboguru" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Why Choose RoboGuru?</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Here’s how we stack up against other AI or tutoring apps.
            </p>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b font-bold">Feature</th>
                  <th className="p-3 text-left border-b font-bold">RoboGuru</th>
                  <th className="p-3 text-left border-b font-bold">Others</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-semibold">Unlimited AI Queries (Pro)</td>
                  <td className="p-3 border-b text-green-600 font-semibold">Yes</td>
                  <td className="p-3 border-b text-red-600 font-semibold">Limited</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-semibold">24/7 Voice Mode</td>
                  <td className="p-3 border-b text-green-600 font-semibold">Yes</td>
                  <td className="p-3 border-b text-yellow-600 font-semibold">Rare</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-semibold">Advanced Analytics & Progress</td>
                  <td className="p-3 border-b text-green-600 font-semibold">Yes</td>
                  <td className="p-3 border-b text-yellow-600 font-semibold">Basic</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Community Discussion Forum</td>
                  <td className="p-3 text-green-600 font-semibold">Yes</td>
                  <td className="p-3 text-yellow-600 font-semibold">Sometimes</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* <!-- END WHY CHOOSE ROBOGURU --> */}

          {/* <!-- ========== TIME-LIMITED DISCOUNT BANNER ========== --> */}
          <section id="discount-banner" className="container mx-auto bg-sky-50 p-6 rounded shadow my-4 ">
            <h3 className="text-xl font-bold mb-2 text-[#418BBB]">Limited Time Offer!</h3>
            <p className="text-sm leading-relaxed text-gray-800">
              Use code <span className="font-semibold">STUDY20</span> at checkout to get <strong>20% off</strong> your first 3 months.
            </p>
            <p className="text-sm text-gray-700 mt-2 italic">Hurry—offer expires in 7 days!</p>
          </section>


          {/* <!-- END TIME-LIMITED DISCOUNT BANNER --> */}
          {/* <!-- ========== CUSTOM STUDY PLANS ========== --> */}
          <section id="study-plans" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2 ">Custom Study Plans & Bundles</h2>
            <p className="text-sm mb-4 leading-relaxed text-gray-800">
              Focus on exam prep or specific subjects. Choose from curated study paths like SAT Prep, High School Math Mastery, or Language Fluency.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
              <li>SAT Math Bundle (Chapters 1–12, practice quizzes)</li>
              <li>High School Science Pack (Physics, Chem, Bio consolidated)</li>
              <li>Foundations of Programming (Intro to Python, Java basics)</li>
            </ul>
          </section>


          {/* <!-- END CUSTOM STUDY PLANS --> */}
          {/* <!-- ========== PRICING SECTION ========== --> */}
          <section id="pricing" className="container mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Subscription Plans</h2>
            <p className="text-sm mb-6 leading-relaxed">
              Choose the plan that fits your needs and budget.
              <br /><strong>Special Corporate/Institutional pricing</strong> also available—see below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:w-4/5 mx-auto gap-6">
              {/* Free Plan */}
              <div className="p-6 border rounded flex flex-col justify-center items-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-[#418BBB]">Free Plan</h3>
                <p className="text-sm text-gray-700 flex-grow leading-relaxed">
                  Basic AI queries, limited features.
                </p>
                <p className="text-2xl font-bold mt-2">
                  $0<span className="text-base font-normal">/month</span>
                </p>
                <button className="md:w-4/5 mx-auto bg-[#418BBB] text-white px-4 py-2 text-sm rounded hover:bg-[#357AA0] mt-4">
                  Start Free
                </button>
              </div>
              {/* Pro Plan */}
              <div className="p-6 border rounded flex flex-col justify-center items-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-[#418BBB]">Pro Plan</h3>
                <p className="text-sm text-gray-700 flex-grow leading-relaxed">
                  Unlimited AI queries, voice mode, advanced analytics.
                </p>
                <p className="text-2xl font-bold mt-2">
                  $9.99<span className="text-base font-normal">/month</span>
                </p>
                <button className="md:w-4/5 mx-auto bg-[#418BBB] text-white px-4 py-2 text-sm rounded hover:bg-[#357AA0] mt-4">
                  Upgrade
                </button>
              </div>
              {/* Corporate / Institutional Plan */}
              <div className="p-6 border rounded flex flex-col justify-center items-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-[#418BBB]">Enterprise / Schools</h3>
                <p className="text-sm text-gray-700 flex-grow leading-relaxed">
                  Special bulk pricing for classrooms, tutoring centers, or corporate training.
                </p>
                <p className="text-2xl font-bold mt-2">
                  Custom<span className="text-base font-normal">/quote</span>
                </p>
                <button className="md:w-4/5 mx-auto bg-[#418BBB] text-white px-4 py-2 text-sm rounded hover:bg-[#357AA0] mt-4">
                  Contact Sales
                </button>
              </div>

            </div>
          </section>

          {/* <!-- END PRICING --> */}

          {/* <!-- ========== DOWNLOAD THE ROBOGURU APP ========== --> */}
          <section id="download" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Download the RoboGuru App</h2>
            <p className="text-sm mb-4 leading-relaxed">
              Get learning on the go. Our app is available for iOS and Android.
            </p>
            <div className="flex gap-8 my-4">
              <button
                className=" bg-gray-200 text-sm font-medium px-8 py-2 flex gap-4 justify-center items-center rounded-lg shadow hover:bg-gray-300 transition"
              >
                <span>
                  <img
                    src="/images/applestore.png"
                    alt="App Store"
                    className="w-12"
                  />
                </span>
                <span>Apple Store</span>
              </button>
              <button
                className=" bg-gray-200 text-sm font-medium px-8 py-2 flex gap-4 justify-center items-center rounded-lg shadow hover:bg-gray-300 transition"
              >
                <span>
                  <img
                    src="/images/playstore.png"
                    alt="Play Store"
                    className="w-12"
                  />
                </span>
                <span>Play Store</span>
              </button>
            </div>
          </section>

          {/* <!-- END DOWNLOAD THE ROBOGURU APP --> */}

          {/* <!-- ========== FAQ SECTION ========== --> */}
          <section id="faq" className="container mx-auto bg-white p-6 rounded shadow my-4">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4 mt-4">
              {/* FAQ 1 */}
              <div className="p-4 border-l-4 border-[#418BBB] bg-sky-50">
                <p className="font-semibold">1. What is RoboGuru?</p>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  RoboGuru is an AI-driven learning platform that helps you explore academic subjects...
                </p>
              </div>
              {/* FAQ 2 */}
              <div className="p-4 border-l-4 border-[#418BBB] bg-sky-50">
                <p className="font-semibold">2. How do I set up this app?</p>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  Download the RoboGuru app from the App Store or Google Play. Once installed, sign up or log in...
                </p>
              </div>
              {/* FAQ 3 */}
              <div className="p-4 border-l-4 border-[#418BBB] bg-sky-50">
                <p className="font-semibold">3. Does it cost anything?</p>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  We offer a free plan with limited AI queries. You can upgrade to a paid subscription...
                </p>
              </div>
            </div>
          </section>

          {/* <!-- END FAQ --> */}
        </div>


      </Layout>

    </div>
  )
}

export default index