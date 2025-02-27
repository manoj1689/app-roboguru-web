"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.firebaseAuth.token); // Get token from Redux

    useEffect(() => {
        if (!token) {
            router.push("/"); // Redirect to landing page if not logged in
        }
    }, [token, router]);

    return token ? <>{children}</> : null;
};

export default ProtectedRoute;

