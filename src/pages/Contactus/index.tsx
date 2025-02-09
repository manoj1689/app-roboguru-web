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
                        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Contact Us</h1>
                        <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium ">
                            We’d love to hear from you! Reach out to us for any questions, feedback, or assistance.
                        </p>
                    </div>
                </section>

                <main className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold text-center mb-4"></h1>
                    <p className="text-lg leading-relaxed text-center mb-8"></p>

                    {/* Contact Form Section */}
                    <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                        <form action="/submit_contact" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 px-4 py-2 block w-full rounded-md outline-cyan-400 border-gray-300 shadow-sm focus:ring-[#418BBB] focus:border-[#418BBB]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-fullpx-4 py-2  w-full rounded-md outline-cyan-400  border-gray-300 shadow-sm focus:ring-[#418BBB] focus:border-[#418BBB]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-1  px-4 py-2 block w-full rounded-md outline-cyan-400 border-gray-300 shadow-sm focus:ring-[#418BBB] focus:border-[#418BBB]"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-[#418BBB] text-white px-4 py-2 rounded hover:bg-[#4080aa]">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Contact Information Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Contact Details</h2>
                        <div className="text-lg">
                            <p>Email: <a href="mailto:support@roboguru.com" className="text-[#418BBB] hover:underline">support@roboguru.com</a></p>
                            <p>Phone: <a href="tel:+1234567890" className="text-[#418BBB] hover:underline">+1 234 567 890</a></p>
                            <p>Address: 123 RoboGuru Lane, AI City, Techland</p>
                        </div>
                    </section>

                    {/* Social Media Section */}
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Connect with Us on Social Media</h2>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/roboguru" target="_blank" className="text-blue-600 hover:underline">Facebook</a>
                            <a href="https://twitter.com/roboguru" target="_blank" className="text-blue-400 hover:underline">Twitter</a>
                            <a href="https://linkedin.com/company/roboguru" target="_blank" className="text-blue-700 hover:underline">LinkedIn</a>
                            <a href="https://instagram.com/roboguru" target="_blank" className="text-[#418BBB] hover:underline">Instagram</a>
                        </div>
                    </section>
                </main>
            </Layout>
        </div>
    );
}

export default index;
