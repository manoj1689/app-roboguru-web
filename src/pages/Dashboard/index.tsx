'use client'; // Required for client-side logic in the `app` directory

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { firebaseLogin } from '../../redux/slices/firebaseAuthSlice';

const Index = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  // Get the profile updated status from Redux
  const { profile_updated, token, isLoading, error } = useSelector(
    (state: RootState) => state.firebaseAuth
  );

  // Check for the token and fetch the user profile
  useEffect(() => {
    const loginAccessToken =
      localStorage.getItem('social_access_token') 

    if (loginAccessToken) {
      dispatch(firebaseLogin(loginAccessToken));
    } else {
      router.push('/Error');
    }
  }, [dispatch]);
 
   // Check for the token and fetch the user profile
   useEffect(() => {
    const loginAccessToken =
      localStorage.getItem('mobile_access_token') ;

    if (loginAccessToken) {
      dispatch(firebaseLogin(loginAccessToken));
    } else {
      router.push('/Error');
    }
  }, [dispatch]);
  console.log("profile updated",profile_updated)
  // If profile is updated, redirect to Home; otherwise, redirect to Profile
  
  
  useEffect(() => {
    const storedProfileUpdated = localStorage.getItem('profile_updated');
    const parsedProfileUpdated = storedProfileUpdated ? JSON.parse(storedProfileUpdated) : false;
  
    if (profile_updated || parsedProfileUpdated) {
      router.push('/Home'); // Navigate to /Home if profile is updated
    } else {
      router.push('/Profile'); // Redirect to /Profile if not updated
    }
  }, [profile_updated, router]);
  
}
export default Index;
