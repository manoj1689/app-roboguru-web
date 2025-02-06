import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUserProfile } from "@/redux/slices/profileSlice"; // Import the thunk


const Sidebar: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [className, setClassName] = useState<string>("");

  // Fetch user profile from Redux store
  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile
  );
  const { selectedEducationLevel, loading: educationLoading } = useSelector(
    (state: RootState) => state.educationLevels
  );
  const { classDetails, loading: classesLoading } = useSelector(
    (state: RootState) => state.class
  );
  console.log("user profile fetch user ", profile)
  // Load user profile on component mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);


  console.log("education level list", selectedEducationLevel?.name)
  // Set class name after class details are loaded
  useEffect(() => {
    if (profile?.user_class && classDetails?.data?.length > 0) {
      const foundClass = classDetails.data.find(
        (cls: any) => cls.id === profile.user_class
      );
      setClassName(foundClass ? foundClass.name : "Unknown Class");
    }
  }, [classDetails, profile]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  console.log("education level & clss name", className)
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
          } lg:block max-lg:fixed  ml-4 top-20 w-64 bg-white rounded-lg shadow-xl lg:shadow-lg z-10`}
      >
        <div className="flex h-20 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE] rounded-t-lg"></div>
        {/* top Circular Image */}
        <div className="relative flex h-40 w-full ">
          <div className="absolute inset-0 flex-col flex">
            <div className="h-1/2  bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE]"></div>
            <div className="h-1/2  "></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={profile?.profile_image || "./images/robo-logo.png"}
              alt="RoboGuru Logo"
              className={`rounded-full object-cover ${profile?.profile_image
                ? "w-16 h-16 md:w-32 md:h-32 border-gray-100 border-8 " // If image exists
                : "w-12 md:w-24  " // If image does not exist
                }`}
            />
          </div>

        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-3xl">{profile?.name || "User"}</p>

          <span className="text-lg text-neutral-800">
            {selectedEducationLevel?.name}-{className}
          </span>

        </div>
        {/* Side Navigation */}
        <nav className="flex flex-col p-4 text-sm my-4">
          <div
            onClick={() => handleNavigation("/ChatSessionsList")}
            className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center "
          >
             <span><img src="/images/sidebar/feedback.png" alt="feedback" className="w-[24px]" /></span> <span>Chat History</span>
          </div>
          <div onClick={() => handleNavigation("/JoinCommunity")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center ">
            <span ><img src="/images/sidebar/community.png" alt="community" className="w-[24px]" /></span> <span>Join Our Community</span>
          </div>
          <div onClick={() => handleNavigation("/Feedback")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center ">
            <span><img src="/images/sidebar/feedback.png" alt="feedback" className="w-[24px]" /></span> <span>Feedback</span>
          </div>
          <div onClick={() => handleNavigation("/RequestSubject")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/reqSubject.png" alt="request subject" className="w-[24px]" /></span> <span>Request Subject</span>
          </div>
          <div onClick={() => handleNavigation("/RequestTopic")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/reqTopic.png" alt="request topic" className="w-[24px]" /></span> <span>Request Topic</span>
          </div>
          <div onClick={() => handleNavigation("/Subscriptiondetail")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/subscription.png" alt="subscription details" className="w-[24px]" /></span> <span>Subscription Details</span>
          </div>
          <div onClick={() => handleNavigation("/FAQ")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/FAQ.png" alt="faq" className="w-[24px]" /></span> <span>FAQ</span>
          </div>
          <div onClick={() => handleNavigation("/AppSetting")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal  mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/appSetting.png" alt="app setting" className="w-[24px]" /></span> <span>App Setting</span>
          </div>
        </nav>
      </div>

    </>
  );
};

export default Sidebar;
