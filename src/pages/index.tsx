'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Landing from "@/pages/Landing";

function Index() {
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const accessToken = localStorage.getItem('access_token');
      const getUserData = JSON.parse(localStorage.getItem('profile_updated') || 'false'); // Ensure it's a boolean
  
      console.log("get User Profile", getUserData);
  
      if (accessToken) {
        if (getUserData) {  
          router.push('/Home');
        } else {
          router.push('/Profile');
        }
      } else {
        setShowLanding(true); // Show Landing page instead of returning inside useEffect
      }
    }, 200); // 1 second delay
  
    // Cleanup function to clear timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [router]);

  // If showLanding is true, render the Landing page
  if (showLanding) {
    return <Landing />;
  }

  return null; // Return nothing while checking authentication
}

export default Index;
