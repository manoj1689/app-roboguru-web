import React from "react";
import Link from "next/link";
import Popup from "reactjs-popup";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "reactjs-popup/dist/index.css";
import { TiArrowSortedDown } from "react-icons/ti";
const Header: React.FC = () => {
    const router = useRouter();
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
        localStorage.removeItem("mobile_access_token");
        localStorage.removeItem("social_access_token");
        localStorage.removeItem("access_token");
        signOut({ redirect: false });
        router.push("/Landing");
    };
    return (
        <header className="bg-white fixed shadow-sm w-full top-0 z-50">
            <div className="lg:container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-4">
                        {/* Logo */}
                        <div className="flex max-lg:ml-8 items-center space-x-2">
                            <Link href="/Dashboard">
                                <img
                                    src="/images/robologo.png"
                                    alt="RoboGuru Logo"
                                    className="w-32 sm:w-40 cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                    {/* Center: Search Bar */}
                    <div className="hidden md:block flex-1 mx-8">
                        {/* <ReactSearchAutocomplete
                            items={items}
                            onSearch={handleSearch}
                            onSelect={handleOnSelect}
                            autoFocus
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
                        /> */}
                    </div>
                    {/* Right: Buttons / Avatar */}
                    <div className="flex items-center space-x-3">
                        <button className="text-sm font-medium text-red-400 hover:text-red-500">
                            <img
                                src="/images/bell.png"
                                alt="Bell Logo"
                                className="w-8  cursor-pointer"
                            />
                        </button>
                        <Link href="/chat">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-[#63A7D4] rounded-full">
                                Live Chat
                            </button>
                        </Link>
                        <div className="flex gap-2 items-end ">
                            <img
                                src="/images/user.webp"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />

                            <div >
                                <Popup
                                    trigger={
                                        <button className=" text-[#63A7D4]  rounded-md">
                                            <TiArrowSortedDown size={22} />
                                        </button>
                                    }
                                    position="bottom right"
                                ><div className=" px-8 py-2">
                                        <div className="flex w-full text-[#63A7D4] justify-center items-center">
                                            Update Profile
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-400 text-white py-2 w-full px-4 rounded mt-2"
                                        >
                                            Logout
                                        </button>

                                    </div>

                                </Popup>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
