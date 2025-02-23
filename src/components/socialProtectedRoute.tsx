"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const socialProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("social_access_token"); // Check if user is logged in
        if (!token) {
            router.push("/"); // Redirect to landing page if not logged in
        }
    }, []);

    return <>{children}</>;
};

export default socialProtectedRoute;
