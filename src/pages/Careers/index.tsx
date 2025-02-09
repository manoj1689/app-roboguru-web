'use client'
import React from 'react'
import Link from 'next/link';
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";

const index = () => {
    const router = useRouter();
    const handleNavigation = (path: string) => {
        // Navigate to the selected page
        router.push(path);
    };

    return (
        <div>
            <Layout>

                <section className=" mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] " >
                    {/* Gradient overlay */}

                    <div
                        onClick={() => handleNavigation("/Landing")}
                        className="flex  container mx-auto hover:text-pink-300 font-bold  gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span><span>Back</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Careers</h1>
                        <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium ">
                            Join RoboGuru and be a part of the team that’s transforming education with cutting-edge AI technologies. Explore our current openings below.
                        </p>
                    </div>
                </section>
                <main className="container mx-auto py-8">


                    {/* Job Openings Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold ">Current Openings</h2>
                        <div className="space-y-6">
                            {/* Job Opening 1 */}
                            <div className="p-4 border rounded shadow-sm bg-gray-100">
                                <h3 className="text-lg font-semibold">Software Engineer - AI/ML</h3>
                                <p className="text-sm mt-2">
                                    Location: Remote | Experience: 3+ Years
                                </p>
                                <p className="text-sm mt-1">
                                    Work on advanced AI models and improve our learning platform with cutting-edge algorithms.
                                </p>
                                <div className="mt-4">
                                    <a href="apply.html" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                        Apply Now
                                    </a>
                                </div>
                            </div>

                            {/* Job Opening 2 */}
                            <div className="p-4 border rounded shadow-sm bg-gray-100">
                                <h3 className="text-lg font-semibold">UI/UX Designer</h3>
                                <p className="text-sm mt-2">
                                    Location: Onsite | Experience: 2+ Years
                                </p>
                                <p className="text-sm mt-1">
                                    Design intuitive and engaging interfaces for our learning platform.
                                </p>
                                <div className="mt-4">
                                    <a href="apply.html" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                        Apply Now
                                    </a>
                                </div>
                            </div>

                            {/* Job Opening 3 */}
                            <div className="p-4 border rounded shadow-sm bg-gray-100">
                                <h3 className="text-lg font-semibold">Content Specialist</h3>
                                <p className="text-sm mt-2">
                                    Location: Hybrid | Experience: 4+ Years
                                </p>
                                <p className="text-sm mt-1">
                                    Create engaging and effective learning content tailored for our AI-driven platform.
                                </p>
                                <div className="mt-4">
                                    <a href="apply.html" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                        Apply Now
                                    </a>
                                </div>
                            </div>

                            {/* Job Opening 4 */}
                            <div className="p-4 border rounded shadow-sm bg-gray-100">
                                <h3 className="text-lg font-semibold">Data Scientist</h3>
                                <p className="text-sm mt-2">
                                    Location: Remote | Experience: 5+ Years
                                </p>
                                <p className="text-sm mt-1">
                                    Analyze and interpret complex data to enhance our AI solutions and learning analytics.
                                </p>
                                <div className="mt-4">
                                    <a href="apply.html" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                        Apply Now
                                    </a>
                                </div>
                            </div>

                            {/* Job Opening 5 */}
                            <div className="p-4 border rounded shadow-sm bg-gray-100">
                                <h3 className="text-lg font-semibold">Marketing Specialist</h3>
                                <p className="text-sm mt-2">
                                    Location: Hybrid | Experience: 3+ Years
                                </p>
                                <p className="text-sm mt-1">
                                    Develop and execute marketing strategies to promote RoboGuru’s offerings and drive user engagement.
                                </p>
                                <div className="mt-4">
                                    <a href="apply.html" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Why Join Us Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Why Join RoboGuru?</h2>
                        <p className="text-lg leading-relaxed">
                            At RoboGuru, we believe in creating a dynamic and inclusive workplace that fosters innovation and creativity. As part of our team, you’ll:
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li>Work on cutting-edge AI technologies.</li>
                            <li>Collaborate with talented professionals from diverse backgrounds.</li>
                            <li>Enjoy opportunities for growth and learning.</li>
                            <li>Be part of a mission-driven organization that’s making a difference in education.</li>
                        </ul>
                    </section>

                    {/* Perks & Benefits Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Perks & Benefits</h2>
                        <ul className="list-disc list-inside mt-4 space-y-2">
                            <li>Flexible working hours and remote work options.</li>
                            <li>Health insurance and wellness programs.</li>
                            <li>Competitive salary and performance bonuses.</li>
                            <li>Training and development opportunities.</li>
                            <li>Inclusive and supportive work environment.</li>
                        </ul>
                    </section>

                    {/* How to Apply Section */}
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
                        <p className="text-lg leading-relaxed">
                            Interested candidates can follow these steps to apply:
                        </p>
                        <ol className="list-decimal list-inside mt-4 space-y-2">
                            <li>Visit the job opening section and click on "Apply Now" for your desired position.</li>
                            <li>Fill out the application form with your details and upload your resume.</li>
                            <li>Our HR team will review your application and contact you for further steps.</li>
                        </ol>
                        <p className="text-sm mt-4">
                            For any queries, feel free to reach out to us at <a href="mailto:hr@roboguru.com" className="text-red-400 hover:underline">hr@roboguru.com</a>.
                        </p>
                    </section>
                </main>

            </Layout>
        </div>
    );
}

export default index;
