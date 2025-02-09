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
             <section className="  px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] " >
                                {/* Gradient overlay */}
            
                                <div
                                    onClick={() => handleNavigation("/Landing")}
                                    className="flex  container mx-auto hover:text-pink-300 font-bold  gap-3 items-center text-white cursor-pointer"
                                >
                                    <span><FaArrowLeft size={16} /></span><span>Back</span>
                                </div>
                                <div className="container mx-auto text-center rounded">
                                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Terms and Conditions</h1>
                                    <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium ">
                                    Please read these terms and conditions carefully before using RoboGuru.
                                    </p>
                                </div>
                            </section>
            <main className="container mx-auto  p-4">



                {/* Terms Section */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-4">General Terms</h2>
                    <ul className="list-disc list-inside space-y-4 ml-4">
                        <li>By using RoboGuru, you agree to comply with these terms and conditions.</li>
                        <li>RoboGuru reserves the right to update these terms at any time without prior notice.</li>
                        <li>All content and materials provided by RoboGuru are for personal and educational use only.</li>
                    </ul>
                </section>

                {/* User Responsibilities Section */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-4 ml-4">
                        <li>Users must provide accurate and up-to-date information during registration.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>Any misuse of the platform, including unauthorized access or distribution of content, is prohibited.</li>
                    </ul>
                </section>

                {/* Privacy and Security Section */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Privacy and Security</h2>
                    <ul className="list-disc list-inside space-y-4 ml-4">
                        <li>Your privacy and data security are important to us. Please refer to our
                            <Link href="/Privacypolicy">
                            <span className="text-[#418BBB] hover:underline px-2">Privacy Policy</span>
                            </Link>
                            for more details on how we handle your information.
                        </li>
                    </ul>
                </section>

                {/* Limitation of Liability Section */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                    <ul className="list-disc list-inside space-y-4 ml-4">
                        <li>RoboGuru is not liable for any indirect, incidental, or consequential damages arising from the use of the platform.</li>
                        <li>The platform is provided "as is," without any warranties of any kind, express or implied.</li>
                        <li>RoboGuru does not guarantee uninterrupted or error-free access to the platform.</li>
                    </ul>
                </section>

                {/* Governing Law Section */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                    <ul className="list-disc list-inside space-y-4 ml-4">
                        <li>These terms and conditions are governed by the laws of the jurisdiction in which RoboGuru operates.
                                    Any disputes arising from these <br /> <span className='ml-6'>terms will be resolved in accordance with applicable laws.</span>
                        </li>
                    </ul>
                </section>
            </main>
            

          </Layout>
        
        

        </div>

    );
}

export default index
