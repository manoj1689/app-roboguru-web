'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check if social_access_token exists in localStorage
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      console.log("Access token found, redirecting to Dashboard");
      // Redirect to Dashboard if access token is found
      router.push("/Dashboard");
    } else {
      console.log("No access token found, redirecting to Landing");
      // Redirect to Landing if no access token is found
      router.push("/Landing");
    }
  }, [router]); // Add router to dependencies to prevent stale closures

  return null; // This component handles redirection only
}

export default Index;
