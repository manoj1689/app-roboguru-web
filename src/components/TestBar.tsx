import React, { useEffect, useState } from 'react'
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

function TestBar() {
    const dispatch: AppDispatch = useDispatch();
    const [profileData, setProfileData] = useState<any>(null);

 const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile
);

    return (
        <div>
            {/* <!-- GREETING BANNER + QUICK STATS --> */}
            <section className="">
                <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between px-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Hello, {profile?.name || "User"}!</h2>
                        <p className="text-sm text-white font-medium">Keep up the momentum with your daily goals and new topics!</p>
                    </div>
                    {/* Quick Stats Example */}
                   
                </div>
            </section>

        </div>
    )
}

export default TestBar