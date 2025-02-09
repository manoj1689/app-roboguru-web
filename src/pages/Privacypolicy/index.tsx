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
                <section className="  px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] " >
                    {/* Gradient overlay */}

                    <div
                        onClick={() => handleNavigation("/Landing")}
                        className="flex  container mx-auto hover:text-pink-300 font-bold  gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span><span>Back</span>
                    </div>
                    <div className="container mx-auto text-center rounded">
                        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Privacy Policy</h1>
                        <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium ">
                            Your privacy is important to us. Learn about how we collect, use, and protect your personal data.
                        </p>
                    </div>
                </section>
                <main className="container mx-auto  p-4">

                    {/* Introduction Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-md">
                            At RoboGuru, we are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and the measures we take to ensure its security.
                        </p>
                    </section>

                    {/* Information Collection Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><span className='font-semibold'>Personal Information:</span> Name, email address, phone number, etc.</li>
                            <li><span className='font-semibold'>Usage Data: </span> Information about how you use our platform, including interactions and preferences.</li>
                            <li><span className='font-semibold'>Device Information: </span>  Device type, operating system, and browser details.</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <p className="text-sm mb-4">
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>To provide and improve our services.</li>
                            <li>To personalize your learning experience.</li>
                            <li>To communicate with you about updates and new features.</li>
                            <li>To ensure the security and functionality of our platform.</li>
                        </ul>
                    </section>

                    {/* Data Protection Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">How We Protect Your Data</h2>
                        <p className="text-md">
                            We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. This includes encryption, access controls, and regular security audits.
                        </p>
                    </section>

                    {/* Third-Party Sharing Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Third-Party Sharing</h2>
                        <p className="text-md">
                            We do not sell your personal information to third parties. However, we may share data with trusted partners to improve our services, comply with legal obligations, or protect our users' safety.
                        </p>
                    </section>

                    {/* Your Rights Section */}
                    {/* <section className="text-left bg-white py-8 px-12 mt-12">
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <p className="text-sm mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Access your personal information.</li>
                            <li>Request correction or deletion of your data.</li>
                            <li>Opt-out of receiving marketing communications.</li>
                            <li>File a complaint with a data protection authority.</li>
                        </ul>
                    </section> */}

                    {/* Contact Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 ">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-md">
                            If you have any questions or concerns about our Privacy Policy, please contact us at:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                            <li>Email: <Link href="mailto:privacy@roboguru.com" className="text-sky-600 text-semibold hover:underline">privacy@roboguru.com</Link></li>
                            <li>Phone: <Link href="tel:+1234567890" className="text-sky-600 text-semibold  hover:underline">+1 234 567 890</Link></li>
                            <li>Address: 123 RoboGuru Lane, AI City, Techland</li>
                        </ul>
                    </section>
                </main>
            </Layout>
        </div>

    );
}

export default index
