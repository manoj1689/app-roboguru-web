import React, { useEffect, useState } from "react";
import Link from "next/link";
import Popup from "reactjs-popup";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { TiArrowSortedDown } from "react-icons/ti";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUserProfile } from "@/redux/slices/profileSlice"; // Import the thunk
import { useTranslation } from "react-i18next"; // Import translation hook
import i18n from "@/utils/i18n"; // Import i18n configuration
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
const Header: React.FC = () => {
    const { t } = useTranslation(); // Initialize translation function
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    // Fetch user profile from Redux store
    const { profile, loading: profileLoading } = useSelector(
        (state: RootState) => state.profile
    );

 
    // Load user profile on component mount
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);


    // Dummy data for the autocomplete suggestions
    const items = [
        { id: 1, name: "Math Basics" },
        { id: 2, name: "Algebra" },
        { id: 3, name: "Geometry" },
        { id: 4, name: "Physics" },
        { id: 5, name: "Chemistry" },
        { id: 6, name: "Biology" },
        { id: 7, name: "History" },
        { id: 8, name: "Geography" },
    ];

    // Handle selection of an item
    const handleOnSelect = (item: { id: number; name: string }) => {
        console.log(`Selected: ${item.name}`);
    };

    // Handle search input
    const handleSearch = (input: string) => {
        console.log(`Search Input: ${input}`);
    };
    // Handle Logout
    const handleLogout = () => {
        Cookies.remove('access_token');
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_profile")
        signOut({ redirect: false });
        router.push("/");
    };

    // Change language function
    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "hi" : "en";
        i18n.changeLanguage(newLang);
    };
    return (
        <>
        
        <header className="bg-white fixed shadow-sm w-full top-0 z-50">
            
            <div className=" p-3 container mx-auto  ">
                {/* Left: Logo */}
                <div className="flex w-full items-center">
                    <div className="flex gap-4 w-1/5  max-sm:justify-center  ">
                        {/* Logo */}
                        <div className="hidden lg:flex max-lg:pl-12  items-center space-x-2">
                            <Link href="/Home">
                                <img
                                    src="/images/robologo.png"
                                    alt="RoboGuru Logo"
                                    className="w-32 sm:w-48 cursor-pointer"
                                />
                            </Link>
                        </div>
                        <div className="lg:hidden flex pl-8  items-center space-x-2">
                            <Link href="/Home">
                                <img
                                    src="/images/robo-logo.png"
                                    alt="RoboGuru Logo"
                                    className="w-8 cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                    {/* Center: Search Bar */}
                    <div className="flex-1  w-2/5 px-4 ">
                        <ReactSearchAutocomplete
                            items={items}
                            onSearch={handleSearch}
                            onSelect={handleOnSelect}
                            autoFocus
                            showIcon={true}
                            placeholder="Search..."
                            styling={{

                                height: "40px",
                                border: "1px solid #d1d5db",
                                borderRadius: "5px",
                                backgroundColor: "white",
                                boxShadow: "none",
                                hoverBackgroundColor: "#f9fafb",
                                color: "#111827",
                                fontSize: "14px",
                                fontFamily: "Arial",
                                iconColor: "#6b7280",
                                lineColor: "#d1d5db",
                                placeholderColor: "#9ca3af",
                            }}
                        />
                    </div>


                    {/* Right: Buttons / Avatar */}
                    <div className="flex items-center justify-end gap-1 sm:gap-2 w-2/5">
                        <select
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            value={i18n.language}
                            className="px-4 py-2 text-sm font-medium text-black rounded-lg outline-none hidden sm:block"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                        <select
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            value={i18n.language}
                            className="px-4 py-2 text-sm font-medium text-black rounded-lg outline-none block sm:hidden"
                        >
                            <option value="en">En</option>
                            <option value="hi">Hi</option>
                        </select>
                        <button className="hidden lg:block text-sm font-medium text-red-400 hover:text-red-500">
                            <img
                                src="/images/bell.png"
                                alt="Bell Logo"
                                className="w-8  cursor-pointer"
                            />
                        </button>
                     
                            <button className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-[#418BBB]  rounded-full" onClick={()=> toast.info("Coming Soon...", { position: "top-right", autoClose: 2000 })}>
                                <div className="flex gap-2 items-center" >
                                    <span><img src="/images/chatlogo.png" alt="chat logo" className="w-4" /></span>
                                    <span className="font-semibold">{t("homeNavbar.liveChat")}</span>
                                </div>

                            </button>
                            <ToastContainer />

                        
                        <div className="flex gap-2 items-end ">
                            <img
                                src={profile?.profile_image || "./images/user.webp"}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div >
                                <Popup
                                    trigger={
                                        <button className=" text-[#63A7D4]  rounded-md">
                                            <TiArrowSortedDown size={22} />
                                        </button>
                                    }
                                    position="bottom right"
                                ><div className=" flex flex-col  px-8 py-2">
                                        <div className="flex lg:hidden items-center gap-2  text-[#63A7D4]">
                                            <span>Notification</span>
                                        </div>
                                        <div className="flex lg:hidden text-[#63A7D4]  ">
                                            <span><img src="/images/chatlogo.png" alt="chat logo" className="w-4" /></span>
                                            <span className="font-semibold">Live Chat</span>
                                        </div>
                                        <div className="flex w-full text-[#63A7D4] ">
                                            {t("homeNavbar.updateProfile")}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-400 text-white py-2 w-full px-4 rounded mt-2"
                                        >
                                            {t("homeNavbar.logout")}
                                        </button>

                                    </div>

                                </Popup>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
          
        </header> 
        </>
     
    );
};

export default Header;
