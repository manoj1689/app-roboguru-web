import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUserProfile } from "@/redux/slices/profileSlice";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [className, setClassName] = useState<string>("");

  const { profile } = useSelector((state: RootState) => state.profile);
  const { selectedEducationLevel } = useSelector((state: RootState) => state.educationLevels);
  const { classDetails } = useSelector((state: RootState) => state.class);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.user_class && classDetails?.data?.length > 0) {
      const foundClass = classDetails.data.find((cls: any) => cls.id === profile.user_class);
      setClassName(foundClass ? foundClass.name : "Unknown Class");
    }
  }, [classDetails, profile]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleNavigation = (path: string) => {
    if (path === "/ChatSessionsList") {
      router.push(path);
    } else {
      toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <button onClick={toggleSidebar} className="lg:hidden text-2xl fixed top-5 left-5 z-50">
        <span className="block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </span>
      </button>

      <div id="sidebar" className={`${isSidebarVisible ? "block" : "hidden"} lg:block max-lg:fixed ml-4 top-20 w-64 bg-white rounded-lg shadow-xl lg:shadow-lg z-10 overflow-y-auto h-[calc(100vh-10rem)]`}>
        <div className="flex h-20 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE] rounded-t-lg"></div>

        <div className="relative flex h-32 w-full ">
          <div className="absolute inset-0 flex-col flex">
            <div className="h-1/2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE]"></div>
            <div className="h-1/2"></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={profile?.profile_image || "./images/robo-logo.png"}
              alt="Profile"
              className={`rounded-full object-cover ${profile?.profile_image ? "w-20 h-20 md:w-28 md:h-28 border-gray-100 border-4 " : "w-12 md:w-24  "}`}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-3xl">{profile?.name || "User"}</p>
          <span className="text-lg text-neutral-800">
            {selectedEducationLevel?.name}-{className}
          </span>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-4 text-sm overflow-y-auto">
          <div onClick={() => handleNavigation("/ChatSessionsList")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/feedback.png" alt="chat history" className="w-[24px]" /></span> <span>{t("sidebar.chatHistory")}</span>
          </div>
          <div onClick={() => handleNavigation("/JoinCommunity")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/community.png" alt="community" className="w-[24px]" /></span> <span>{t("sidebar.joinCommunity")}</span>
          </div>
          <div onClick={() => handleNavigation("/Feedback")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/feedback.png" alt="feedback" className="w-[24px]" /></span> <span>{t("sidebar.feedback")}</span>
          </div>
          <div onClick={() => handleNavigation("/RequestSubject")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/reqSubject.png" alt="request subject" className="w-[24px]" /></span> <span>{t("sidebar.requestSubject")}</span>
          </div>
          <div onClick={() => handleNavigation("/RequestTopic")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/reqTopic.png" alt="request topic" className="w-[24px]" /></span> <span>{t("sidebar.requestTopic")}</span>
          </div>
          <div onClick={() => handleNavigation("/Subscriptiondetail")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/subscription.png" alt="subscription details" className="w-[24px]" /></span> <span>{t("sidebar.subscriptionDetails")}</span>
          </div>
          <div onClick={() => handleNavigation("/FAQ")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/FAQ.png" alt="faq" className="w-[24px]" /></span> <span>{t("sidebar.faq")}</span>
          </div>
          <div onClick={() => handleNavigation("/AppSetting")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/appSetting.png" alt="app setting" className="w-[24px]" /></span> <span>{t("sidebar.appSetting")}</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
