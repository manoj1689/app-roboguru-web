import React, { useEffect, useState } from 'react'
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducationLevelById } from "@/redux/slices/educationLevelSlice"; // Thunk to fetch education levels
import { fetchClassDetails } from "@/redux/slices/classSlice"; // Thunk to fetch classes
function TestBar() {
    const dispatch: AppDispatch = useDispatch();
    const [profileData, setProfileData] = useState<any>(null);


    // Load profile data from localStorage
    useEffect(() => {
        const userData = localStorage.getItem("user_profile");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setProfileData(parsedData);

            // Dispatch actions after setting profile data
            if (parsedData.education_level) {
                dispatch(fetchEducationLevelById(parsedData.education_level));
            }
            if (parsedData.user_class) {
                dispatch(fetchClassDetails(parsedData.education_level));
            }
        }
    }, [dispatch]);
    return (
        <div>
            {/* <!-- GREETING BANNER + QUICK STATS --> */}
            <section className="flex w-full rounded bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white p-5  transition-transform">
                <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between px-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Hello, {profileData?.name || "User"}!</h2>
                        <p className="text-sm text-black">Keep up the momentum with your daily goals and new topics!</p>
                    </div>
                    {/* Quick Stats Example */}
                    <div>
                        <button className="px-4 py-2 font-medium text-gray-200 rounded-lg bg-gradient-to-t from-[#7A4F9F] to-[#F15A97] transition-all duration-300 hover:opacity-80">
                            Take a Test
                        </button>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default TestBar