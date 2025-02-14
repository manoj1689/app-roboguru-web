"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchEducationLevelById } from "@/redux/slices/educationLevelSlice"; 
import { fetchClassDetails } from "@/redux/slices/classSlice"; 
import { useTranslation } from "react-i18next"; // Import translation hook

const GreetingBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation(); // Hook for translations
  const [profileData, setProfileData] = useState<any>(null);

  // Load profile data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setProfileData(parsedData);

      if (parsedData.education_level) {
        dispatch(fetchEducationLevelById(parsedData.education_level));
      }
      if (parsedData.user_class) {
        dispatch(fetchClassDetails(parsedData.education_level));
      }
    }
  }, [dispatch]);

  return (
    <section className="flex w-full rounded bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white p-5 transition-transform">
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {t("greeting.title")} {profileData?.name || "User" }
          </h2>
          <p className="text-sm text-white font-medium">{t("greeting.subtitle")}</p>
        </div>

        {/* Quick Stats */}
        <div className="flex space-x-8 mt-4 md:mt-0">
          <div className="text-center">
            <p className="text-2xl font-medium font-mono">
              {t("greeting.stats.chaptersCompleted.value")}
            </p>
            <p className="text-sm text-white font-medium">
              {t("greeting.stats.chaptersCompleted.label")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium font-mono">
              {t("greeting.stats.overallProgress.value")}
            </p>
            <p className="text-sm text-white font-medium">
              {t("greeting.stats.overallProgress.label")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium font-mono">
              {t("greeting.stats.subjectsActive.value")}
            </p>
            <p className="text-sm text-white font-medium">
              {t("greeting.stats.subjectsActive.label")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreetingBar;
