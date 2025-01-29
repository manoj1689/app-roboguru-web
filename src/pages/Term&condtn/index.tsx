'use client'
import React from 'react'
import Layout from '@/components/LandingLayout';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
                    <h1 className="text-5xl font-bold text-center mb-6">Terms and Conditions</h1>
                    <p className="text-lg leading-relaxed text-center text-stone-800 font-medium mb-8">
                        Please read these terms and conditions carefully before using RoboGuru.
                    </p>
                </div>
            </section>
            <main className="container mx-auto py-8">



                {/* Terms Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">General Terms</h2>
                    <ul className="list-disc list-inside space-y-4">
                        <li>By using RoboGuru, you agree to comply with these terms and conditions.</li>
                        <li>RoboGuru reserves the right to update these terms at any time without prior notice.</li>
                        <li>All content and materials provided by RoboGuru are for personal and educational use only.</li>
                    </ul>
                </section>

                {/* User Responsibilities Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-4">
                        <li>Users must provide accurate and up-to-date information during registration.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>Any misuse of the platform, including unauthorized access or distribution of content, is prohibited.</li>
                    </ul>
                </section>

                {/* Privacy and Security Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Privacy and Security</h2>
                    <p className="text-sm mb-4">
                        Your privacy and data security are important to us. Please refer to our
                        <Link href="/Privacypolicy">
                            <span className="text-[#418BBB] hover:underline px-2">Privacy Policy</span>
                        </Link>
                        for more details on how we handle your information.
                    </p>
                </section>

                {/* Limitation of Liability Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                    <ul className="list-disc list-inside space-y-4">
                        <li>RoboGuru is not liable for any indirect, incidental, or consequential damages arising from the use of the platform.</li>
                        <li>The platform is provided "as is," without any warranties of any kind, express or implied.</li>
                        <li>RoboGuru does not guarantee uninterrupted or error-free access to the platform.</li>
                    </ul>
                </section>

                {/* Governing Law Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                    <p className="text-sm">
                        These terms and conditions are governed by the laws of the jurisdiction in which RoboGuru operates.
                        Any disputes arising from these terms will be resolved in accordance with applicable laws.
                    </p>
                </section>
            </main>
            

          </Layout>
        
        

        </div>

    );
}

export default index
