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
                <section className="relative  bg-center mt-20 px-4 text-white py-8" style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-300 opacity-90"></div>
                    <div
                        onClick={() => handleNavigation("/Landing")}
                        className="flex relative z-10 container mx-auto  hover:text-stone-700 font-bold mb-4 gap-3 items-center text-white cursor-pointer"
                    >
                        <span><FaArrowLeft size={16} /></span><span>Back</span>

                    </div>
                    <div className="relative z-10  container mx-auto text-center  rounded">
                        <h1 className="text-5xl font-bold text-center mb-6">Privacy Policy</h1>
                        <p className="text-lg leading-relaxed text-center text-medium  text-black mb-8">
                            Your privacy is important to us. Learn about how we collect, use, and protect your personal data.
                        </p>

                    </div>
                </section>
                <main className="container mx-auto py-8">

                    {/* Introduction Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-sm">
                            At RoboGuru, we are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and the measures we take to ensure its security.
                        </p>
                    </section>

                    {/* Information Collection Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Personal Information: Name, email address, phone number, etc.</li>
                            <li>Usage Data: Information about how you use our platform, including interactions and preferences.</li>
                            <li>Device Information: Device type, operating system, and browser details.</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <p className="text-sm mb-4">
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>To provide and improve our services.</li>
                            <li>To personalize your learning experience.</li>
                            <li>To communicate with you about updates and new features.</li>
                            <li>To ensure the security and functionality of our platform.</li>
                        </ul>
                    </section>

                    {/* Data Protection Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">How We Protect Your Data</h2>
                        <p className="text-sm">
                            We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. This includes encryption, access controls, and regular security audits.
                        </p>
                    </section>

                    {/* Third-Party Sharing Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Third-Party Sharing</h2>
                        <p className="text-sm">
                            We do not sell your personal information to third parties. However, we may share data with trusted partners to improve our services, comply with legal obligations, or protect our users' safety.
                        </p>
                    </section>

                    {/* Your Rights Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <p className="text-sm mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Access your personal information.</li>
                            <li>Request correction or deletion of your data.</li>
                            <li>Opt-out of receiving marketing communications.</li>
                            <li>File a complaint with a data protection authority.</li>
                        </ul>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-sm">
                            If you have any questions or concerns about our Privacy Policy, please contact us at:
                        </p>
                        <ul className="list-none space-y-2 mt-4">
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
