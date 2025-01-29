'use client'
import React from 'react'
import HomeNavbar from "../../components/HomeNavbar"
import HomeFooter from '@/components/HomeFooter'
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
            <div>
                <HomeNavbar />
            </div>
            <main className="container mx-auto py-8 px-4 mt-20">
                <div
                    onClick={() => handleNavigation("/Landing")}
                    className="flex hover:text-red-500 font-bold mb-4 gap-3 items-center text-red-400 cursor-pointer"
                >
                    <span>
                        <FaArrowLeft size={16} />
                    </span>
                    <span>Back</span>
                </div>
                <h1 className="text-3xl font-bold text-center mb-6">Community Leaderboard</h1>
                <p className="text-lg leading-relaxed text-center mb-8">
                    Celebrate the top contributors in the RoboGuru community. See who’s earning the most badges and providing top answers.
                </p>

                {/* Leaderboard Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Contributor 1 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">AlgebraNerd007</h3>
                            <p className="text-sm mt-2">Points: 1200</p>
                            <p className="text-sm mt-1">Achievements: 10 Badges</p>
                        </div>
                        {/* Contributor 2 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">PhysicsPro99</h3>
                            <p className="text-sm mt-2">Points: 1100</p>
                            <p className="text-sm mt-1">Achievements: 8 Badges</p>
                        </div>
                        {/* Contributor 3 */}
                        <div className="p-4 border rounded shadow-sm bg-gray-100">
                            <h3 className="text-lg font-semibold">BiologyBuff</h3>
                            <p className="text-sm mt-2">Points: 950</p>
                            <p className="text-sm mt-1">Achievements: 7 Badges</p>
                        </div>
                    </div>
                </section>

                {/* Full Leaderboard Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Full Leaderboard</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b px-4 py-2">Rank</th>
                                    <th className="border-b px-4 py-2">Username</th>
                                    <th className="border-b px-4 py-2">Points</th>
                                    <th className="border-b px-4 py-2">Badges</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-b px-4 py-2">1</td>
                                    <td className="border-b px-4 py-2">AlgebraNerd007</td>
                                    <td className="border-b px-4 py-2">1200</td>
                                    <td className="border-b px-4 py-2">10</td>
                                </tr>
                                <tr>
                                    <td className="border-b px-4 py-2">2</td>
                                    <td className="border-b px-4 py-2">PhysicsPro99</td>
                                    <td className="border-b px-4 py-2">1100</td>
                                    <td className="border-b px-4 py-2">8</td>
                                </tr>
                                <tr>
                                    <td className="border-b px-4 py-2">3</td>
                                    <td className="border-b px-4 py-2">BiologyBuff</td>
                                    <td className="border-b px-4 py-2">950</td>
                                    <td className="border-b px-4 py-2">7</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <div className='mt-12 '>
                <HomeFooter />
            </div>

        </div>

    );
}

export default index
