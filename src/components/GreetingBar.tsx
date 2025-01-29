import React,{useEffect,useState} from 'react'
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducationLevelById } from "@/redux/slices/educationLevelSlice"; // Thunk to fetch education levels
import {  fetchClassDetails } from "@/redux/slices/classSlice"; // Thunk to fetch classes
function GreetingBar() {
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
            dispatch( fetchClassDetails(parsedData.education_level));
          }
        }
      }, [dispatch]);
  return (
    <div>
  {/* <!-- GREETING BANNER + QUICK STATS --> */}
  <section className="flex w-full rounded bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white p-5  transition-transform">
            <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Hello, {profileData?.name || "User"}!</h2>
                <p className="text-sm text-black">Keep up the momentum with your daily goals and new topics!</p>
              </div>
              {/* Quick Stats Example */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="text-xl font-bold">12</p>
                  <p className="text-xs">Chapters Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">85%</p>
                  <p className="text-xs">Overall Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">3</p>
                  <p className="text-xs">Subjects Active</p>
                </div>
              </div>
            </div>
          </section>

    </div>
  )
}

export default GreetingBar