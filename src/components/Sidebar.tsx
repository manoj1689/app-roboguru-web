import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../redux/store";
import { fetchEducationLevels } from "@/redux/slices/educationLevelSlice";
import { fetchClasses } from "@/redux/slices/classSlice";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [className, setClassName] = useState<string>("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const { profile } = useSelector((state: RootState) => state.profile);
  const { educationLevels } = useSelector((state: RootState) => state.educationLevels);
  const { classes } = useSelector((state: RootState) => state.class);

  useEffect(() => {
  
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
    dispatch(fetchClasses({ limit: 20, name: "" })); // Provide default arguments
    setMounted(true);
  }, [dispatch]);
 
  useEffect(() => {
    if (profile?.user_class && classes?.length > 0) {
      const foundClass = classes.find((cls: any) => cls.id === profile.user_class);
      setClassName(foundClass ? foundClass.name : "Unknown Class");
    }
  }, [classes, profile]);

  useEffect(() => {
    if (profile?.education_level && educationLevels?.length > 0) {
      const foundEducationLevel = educationLevels.find((edulevel: any) => edulevel.id === profile.education_level);
      setEducationLevel(foundEducationLevel ? foundEducationLevel.name : "Unknown Class");
    }
  }, [classes, profile]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleNavigation = (path: string) => {
    if (path === "/ChatSessionsList" || path ==="/FAQ" || path ==="/Community" || path === "/Feedback") {
      router.push(path);
    } else {
      toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <button onClick={toggleSidebar} className="lg:hidden text-2xl fixed top-5 left-4 z-50">
        {isSidebarVisible ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      <div id="sidebar" className={`${isSidebarVisible ? "block" : "hidden"} lg:block max-lg:fixed top-20 w-64 bg-white rounded-lg shadow-xl lg:shadow-lg z-10 overflow-y-auto h-[calc(100vh-6rem)]`}>
        <div className="flex h-8 md:h-20 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] rounded-t-lg"></div>

        <div className="relative flex h-32 w-full">
          <div className="absolute inset-0 flex-col flex">
            <div className="h-1/2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]"></div>
            <div className="h-1/2"></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={profile?.profile_image || "./images/robo-logo.png"}
              alt="Profile"
              className={`rounded-full object-cover ${profile?.profile_image ? "w-20 h-20 md:w-28 md:h-28 border-gray-100 border-4" : "w-12 md:w-24"}`}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-3xl">{profile?.name || "User"}</p>
          <span className="text-lg text-neutral-800">
            {educationLevel}-{className}
          </span>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-4 text-sm overflow-y-auto">
          <div onClick={() => handleNavigation("/ChatSessionsList")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/feedback.png" alt="chat history" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.chatHistory") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/Community")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/community.png" alt="community" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.joinCommunity") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/Feedback")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/feedback.png" alt="feedback" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.feedback") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/RequestSubject")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/reqSubject.png" alt="request subject" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.requestSubject") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/RequestTopic")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/reqTopic.png" alt="request topic" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.requestTopic") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/Subscriptiondetail")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/subscription.png" alt="subscription details" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.subscriptionDetails") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/FAQ")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/FAQ.png" alt="faq" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.faq") : "Loading..."}</span>
          </div>
          <div onClick={() => handleNavigation("/AppSetting")} className="flex gap-4 hover:text-[#4080aa] text-lg font-normal mb-4 cursor-pointer items-center">
            <span><img src="/images/sidebar/appSetting.png" alt="app setting" className="w-[24px]" /></span>
            <span>{mounted ? t("sidebar.appSetting") : "Loading..."}</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
