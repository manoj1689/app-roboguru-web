import React, { useEffect, useState } from "react";
import Link from "next/link";
import Popup from "reactjs-popup";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { TiArrowSortedDown } from "react-icons/ti";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUserProfile } from "@/redux/slices/profileSlice";
import { useTranslation } from "react-i18next";
import i18n from "@/utils/i18n";
import { ToastContainer, toast } from "react-toastify";
import { MdUpdate } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
const Header: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const [mounted, setMounted] = useState(false);

    const { profile, loading: profileLoading } = useSelector(
        (state: RootState) => state.profile
    );

    useEffect(() => {
        dispatch(fetchUserProfile());
        setMounted(true);
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

    const handleOnSelect = (item: { id: number; name: string }) => {
        console.log(`Selected: ${item.name}`);
    };

    const handleSearch = (input: string) => {
        console.log(`Search Input: ${input}`);
    };

    const handleLogout = () => {
        signOut({ redirect: false });
        dispatch({ type: 'auth/logout' });
        router.push('/'); // Redirect to landing page


    };

    return (
        <>
            <header className="bg-white fixed shadow-sm w-full top-0 z-50">
                <div className="p-3 container mx-auto">
                    <div className="flex w-full items-center">
                        {/* Left: Logo */}
                        <div className="flex gap-4 w-1/5 max-sm:justify-center">
                            <div className="hidden lg:flex max-lg:pl-12 items-center space-x-2">
                                <Link href="/Home">
                                    <img
                                        src="/images/robologo.png"
                                        alt="RoboGuru Logo"
                                        className="w-32 sm:w-48 cursor-pointer"
                                    />
                                </Link>
                            </div>
                            <div className="lg:hidden flex pl-8 items-center space-x-2">
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
                        <div className="flex-1 w-2/5 px-4">
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
                                <img src="/images/bell.png" alt="Bell Logo" className="w-8 cursor-pointer" />
                            </button>

                            <button
                                className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-[#418BBB] rounded-full"
                                onClick={() =>
                                    toast.info("Coming Soon...", {
                                        position: "top-right",
                                        autoClose: 2000,
                                    })
                                }
                            >
                                <div className="flex gap-2 items-center">
                                    <span>
                                        <img src="/images/chatlogo.png" alt="chat logo" className="w-4" />
                                    </span>
                                    <span className="font-semibold">
                                        {mounted ? t("homeNavbar.liveChat") : "Loading..."}
                                    </span>
                                </div>
                            </button>
                            <ToastContainer />

                            <div className="flex gap-2 items-end">
                                <img
                                    src={profile?.profile_image || "./images/user.webp"}
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <Popup
                                        trigger={
                                            <button className="text-[#63A7D4] rounded-md">
                                                <TiArrowSortedDown size={22} />
                                            </button>
                                        }
                                        position="bottom right"
                                    >
                                        <div className="flex flex-col  py-2">
                                            <div className="flex w-full lg:hidden gap-4 hover:scale-105 hover:bg-gray-100 p-2 text-[#63A7D4]">
                                              <span><IoNotifications size={20}/></span>  <span>Notification</span>
                                            </div>
                                            <div className="flex w-full lg:hidden gap-4 hover:scale-105 hover:bg-gray-100 p-2 text-[#63A7D4]">
                                                <span><IoMdChatbubbles size={20} /></span> <span>{mounted ? t("homeNavbar.liveChat") : "Loading..."}</span> 
                                            </div>
                                            <div className="flex w-full gap-4 hover:scale-105 hover:bg-gray-100 p-2 text-[#63A7D4] cursor-pointer" onClick={()=>router.push("/Profile")}>
                                              <span><MdUpdate size={20} /></span> <span>{mounted ? t("homeNavbar.updateProfile") : "Loading..."}</span> 
                                            </div>
                                            <div className="flex w-full justify-center items-center">
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full gap-4 text-red-400 hover:scale-105 hover:bg-gray-100 p-2 "
                                            >
                                               <span><MdLogout  size={20}/></span> <span>{mounted ? t("homeNavbar.logout") : "Loading..."}</span> 
                                            </button>
                                            </div>
                                           
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
