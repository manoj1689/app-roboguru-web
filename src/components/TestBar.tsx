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
            <section className="">
                <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between px-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Hello, {profileData?.name || "User"}!</h2>
                        <p className="text-sm text-white font-medium">Keep up the momentum with your daily goals and new topics!</p>
                    </div>
                    {/* Quick Stats Example */}
                   
                </div>
            </section>

        </div>
    )
}

export default TestBar