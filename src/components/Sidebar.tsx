
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../redux/store";
import { fetchEducationLevelById } from "@/redux/slices/educationLevelSlice"; // Thunk to fetch education levels
import { fetchClassDetails } from "@/redux/slices/classSlice"; // Thunk to fetch classes

const Sidebar: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [className, setClassName] = useState<string>('');
  // Redux state
  const { selectedEducationLevel, loading: educationLoading } = useSelector(
    (state: RootState) => state.educationLevels
  );
  const { classDetails, loading: classesLoading } = useSelector(
    (state: RootState) => state.class
  );

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

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

  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.user_class && classDetails?.data?.length > 0) {
        const foundClass = classDetails.data.find(
          (cls: any) => cls.id === parsedData.user_class
        );
        setClassName(foundClass ? foundClass.name : "Unknown Class");
      }
    }
  }, [classDetails]);

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };
console.log("class Details",classDetails)
  return (
    <>
      {/* Hamburger button for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-2xl fixed top-5 left-5 z-50"
      >
        <span className="block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </span>
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`${isSidebarVisible ? "block" : "hidden"
          } lg:block max-lg:fixed ml-4   top-20  w-56 bg-white rounded-lg shadow-xl lg:shadow-lg z-10 `}

      >
        <div className="flex flex-col items-center jus space-x-4 bg-[#F5F5F5] py-4  rounded-t-lg ">
          <img
            src={profileData?.profile_image || "./images/user.webp"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-lg">Hello, {profileData?.name || "User"}!</p>
            {selectedEducationLevel && classDetails && (
              <span className="text-sm text-gray-600">
                {selectedEducationLevel.name}-{className}
              </span>
            )}
          
          
          </div>
        </div>

        {/* Side Navigation */}
        <nav className="flex flex-col p-4 full  text-sm">
          <div
            onClick={() => handleNavigation("/ChatSessionsList")}
            className="block hover:text-[#4080aa] text-md font-normal mb-4 cursor-pointer"
          >
            Chat History
          </div>
          <div
            onClick={() => handleNavigation("/Quizme")}
            className="block hover:text-[#4080aa] text-md font-normal mb-4 cursor-pointer"
          >
            Quiz Me
          </div>
          <div
            onClick={() => handleNavigation("/Smartgrader")}
            className="block hover:text-[#4080aa] text-md  font-medium mb-4 cursor-pointer"
          >
            Smart Grading
          </div>
          <div
            onClick={() => handleNavigation("/Intelliquest")}
            className="block hover:text-[#4080aa] text-md  font-medium mb-4 cursor-pointer"
          >
            IntelliQuest
          </div>
          <div
            onClick={() => handleNavigation("/Feedback")}
            className="block hover:text-[#4080aa] text-md  font-medium mb-4 cursor-pointer"
          >
            Feedback
          </div>
          <div
            onClick={() => handleNavigation("/Subscriptiondetail")}
            className="block hover:text-[#4080aa] text-md font-medium mb-4 cursor-pointer"
          >
            Subscription Details
          </div>
          <div
            onClick={() => handleNavigation("/FAQ")}
            className="block hover:text-[#4080aa] text-md font-medium mb-4 cursor-pointer"
          >
            FAQ
          </div>
          <div
            onClick={() => handleNavigation("/AppSetting")}
            className="block hover:text-[#4080aa] text-md font-medium mb-4 cursor-pointer"
          >
            App Setting
          </div>
          <div
            onClick={() => handleNavigation("#teacher-tools")}
            className="block hover:text-[#4080aa] text-md font-normal mb-8 cursor-pointer"
          >
            Teacher Tools
          </div>

        </nav>
        <div className="flex w-full">
          {/* <button
          onClick={handleLogout}
          className="bg-red-400 text-white py-2 w-4/5 mx-auto px-4 rounded mt-4"
        >
          Logout
        </button> */}

        </div>

      </div>
    </>
  );
};

export default Sidebar;

