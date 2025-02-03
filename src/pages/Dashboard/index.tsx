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
  const { profile_updated, token, isLoading, error, user_profile } = useSelector(
    (state: RootState) => state.firebaseAuth
  );

  // Check for the token and fetch the user profile
  useEffect(() => {
    const loginAccessToken =
      localStorage.getItem('social_access_token') || localStorage.getItem('mobile_access_token');

    if (loginAccessToken) {
      dispatch(firebaseLogin(loginAccessToken));
    } else {
      router.push('/Error');
    }
  }, [dispatch]);
  console.log("user profile at home",user_profile)
  console.log("user updated at home",profile_updated)
  // If profile is updated, redirect to Home; otherwise, redirect to Profile
  useEffect(() => {
    const profileUpdated=localStorage.getItem('profile_updated')
    if (profile_updated || profileUpdated ) {
      router.push('/Home'); // Navigate to /home if profile_updated is true
    } else {
      router.push('/Profile'); // Redirect to /Profile if profile_updated is false or missing
    }
  }, [profile_updated, router]);

  return null; // or your component's JSX
};

export default Index;
