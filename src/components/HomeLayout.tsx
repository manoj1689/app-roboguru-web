import Navbar from "./HomeNavbar";
import Footer from "./HomeFooter";
import Sidebar from "./Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const dispatch: AppDispatch = useDispatch();

    const state = useSelector((state) => state);
    useEffect(() => {
        console.log('Full Redux Store:', state);
    }, [state]);
    return (
        <>
            <ProtectedRoute>
                <Navbar />
                <div className="max-lg:block lg:hidden">
                    <Sidebar />
                </div>
                {/* Page Content */}
                <main className="flex  mt-20 container mx-auto gap-4  px-4">
                    <div className="max-lg:hidden block">
                        <Sidebar />
                    </div>
                    <div className="flex w-full">
                        {/* Children components will render below the fixed header */}
                        {children}
                    </div>

                </main>
                <Footer />

            </ProtectedRoute>




        </>
    );
};

export default Layout;
