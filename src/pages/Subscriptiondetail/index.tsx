'use client';

import React from 'react';
import Layout from '@/components/HomeLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

const SubscriptionManagement = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div>
            <Layout>
                {/* Header Section */}
                <section
                    className="relative bg-center mt-20 px-4 text-white py-8"
                    style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}
                >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-90"></div>
                    <div
                        onClick={() => handleNavigation('/Home')}
                        className="flex relative z-10 container mx-auto hover:text-stone-700 font-bold mb-4 gap-3 items-center text-white cursor-pointer"
                    >
                        <span>
                            <FaArrowLeft size={16} />
                        </span>
                        <span>Back</span>
                    </div>
                    <div className="relative z-10 container mx-auto text-center rounded">
                        <h1 className="text-5xl font-bold text-center mb-6">Subscription Management</h1>
                        <p className="text-lg leading-relaxed text-center text-black font-medium mb-8">
                            Manage your subscription plans, view payment history, and update billing details.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <main className="container mx-auto py-8 px-4 mt-20">
                    {/* Current Plan Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Your Current Plan</h2>
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <p className="text-sm font-semibold">Plan: Premium</p>
                            <p className="text-sm">Start Date: January 1, 2025</p>
                            <p className="text-sm">Next Billing Date: February 1, 2025</p>
                            <p className="text-sm">Price: $29.99/month</p>
                            <div className="mt-4 text-right">
                                <button className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600">
                                    Change Plan
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Payment History Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border-b px-4 py-2">Date</th>
                                        <th className="border-b px-4 py-2">Amount</th>
                                        <th className="border-b px-4 py-2">Status</th>
                                        <th className="border-b px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-b px-4 py-2">January 1, 2025</td>
                                        <td className="border-b px-4 py-2">$29.99</td>
                                        <td className="border-b px-4 py-2 text-green-600">Paid</td>
                                        <td className="border-b px-4 py-2">
                                            <a href="receipt.html" className="text-sky-600 hover:underline">
                                                View Receipt
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-b px-4 py-2">December 1, 2024</td>
                                        <td className="border-b px-4 py-2">$29.99</td>
                                        <td className="border-b px-4 py-2 text-green-600">Paid</td>
                                        <td className="border-b px-4 py-2">
                                            <a href="receipt.html" className="text-sky-600 hover:underline">
                                                View Receipt
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Billing Information Section */}
                    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Update Billing Information</h2>
                        <form action="/update_billing" method="POST" className="space-y-4">
                            <div>
                                <label
                                    htmlFor="card_number"
                                    className="block text-sm font-semibold my-2 text-gray-700"
                                >
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="card_number"
                                    name="card_number"
                                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:ring-red-400 focus:border-red-400"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="expiry_date"
                                        className="block text-sm font-semibold my-2 text-gray-700"
                                    >
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        id="expiry_date"
                                        name="expiry_date"
                                        placeholder="MM/YY"
                                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:ring-red-400 focus:border-red-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-sm my-2 font-bold text-gray-700">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:ring-red-400 focus:border-red-400"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                                >
                                    Update Billing Info
                                </button>
                            </div>
                        </form>
                    </section>

                </main>
            </Layout>
        </div>
    );
};

export default SubscriptionManagement;
