'use client'; // Required for client-side logic in the `app` directory

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '../Profile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { firebaseLogin } from '../../redux/slices/firebaseAuthSlice';


const Index = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  

  const { profile, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  // Check for the token and fetch the user profile
  useEffect(() => {
    const loginAccessToken =
      localStorage.getItem('mobile_access_token') || localStorage.getItem('social_access_token');

    if (loginAccessToken) {
      dispatch(firebaseLogin(loginAccessToken))
      
    } else {
      router.push('/Error');
    }
  }, [dispatch]);

  useEffect(() => {
    // Retrieve profile from localStorage
    const userProfile = localStorage.getItem('user_profile');

    if (userProfile) {
      const profile = JSON.parse(userProfile);

      // Check if the profile contains a valid name
      if (profile.name) {
        router.push('/Home'); // Navigate to /home if name exists
      } else {
        router.push('/Error'); // Navigate to / if name is missing
      }
    } else {
      router.push('/Profile'); // Redirect to error page if no profile exists
    }
  }, [router]);


}

export default Index;
