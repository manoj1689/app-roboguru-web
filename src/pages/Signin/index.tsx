'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Fix for Next.js App Router
import { googleProvider, facebookProvider } from '@/lib/firebase';
import { getAuth, signInWithPopup, User } from 'firebase/auth';
import app from '@/lib/firebase';
import FirebaseMobile from './FirebaseMobile';
import { firebaseLogin } from '@/redux/slices/firebaseAuthSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';

const SignInPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const auth = getAuth(app);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saveToken = (user: User) => {
    const token = (user as any)?.stsTokenManager?.accessToken;
    if (!token) {
      console.error('No token received from authentication');
      return;
    }
  
    // Save token in cookies (expires in 7 days)
    Cookies.set('access_token', token, { expires: 7, path: '/' });
  
    dispatch(firebaseLogin(token));
    router.push('/Home'); // Redirect to Home after login
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      saveToken(result.user);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error.message);
      alert(`Error during Google Sign-In: ${error.message}`);
    }
  };

  // Facebook Sign-In
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      saveToken(result.user);
    } catch (error: any) {
      console.error('Facebook Sign-In Error:', error.message);
      alert(`Error during Facebook Sign-In: ${error.message}`);
    }
  };

  return (
    <div className="flex max-md:flex-col justify-center items-center h-screen scroll-auto overflow-y-auto relative">
      {/* Left Section */}
      <div className="flex w-full md:w-5/12 flex-col justify-center items-center bg-gradient-to-r from-[#63A7D4] to-[#F295BE] md:h-full text-center max-md:py-12">
        <img src="/images/leftbanner.png" alt="Banner" className="max-md:hidden w-5/6 mx-auto" />
        <h1 className="text-2xl md:text-3xl lg:text-6xl font-sans font-extrabold pt-4 text-white tracking-wide">
          {mounted ? t('signInPage.title') : 'Loading...'}
        </h1>
        <p className="text-white tracking-normal font-sans text-lg md:text-xl mt-4 lg:text-2xl">
          {mounted ? t('signInPage.subtitle') : 'Loading...'}
        </p>
      </div>

      {/* Center Circular Image */}
      <div className="relative flex max-md:h-40 md:h-full w-full md:w-2/12">
        <div className="absolute inset-0 flex">
          <div className="max-md:h-1/2 md:w-1/2 max-md:bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE]"></div>
          <div className="max-md:h-1/2 md:w-1/2 bg-[#f8fafa]"></div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <img src="/images/robo_circle.png" alt="RoboGuru Logo" className="w-16 md:w-32 rounded-full object-cover" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-5/12 h-5/6 flex p-4 flex-col items-center md:pr-20 lg:pr-28 justify-around ">
        <FirebaseMobile />

        {/* Divider and Social Login */}
        <div className="flex items-center w-full">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 font-bold">{mounted ? t('signInPage.socialLogin.or') : 'Loading...'}</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex w-full space-x-8 justify-center items-center">
          <button
            onClick={handleFacebookSignIn}
            className="flex justify-center items-center rounded-full shadow-md hover:shadow-lg"
          >
            <img src="/images/facebook.png" alt="Facebook Logo" className="w-16 rounded-full bg-white" />
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="flex p-2 justify-center items-center bg-gray-200 rounded-full shadow-md hover:shadow-lg"
          >
            <img src="/images/google.png" alt="Google Logo" className="w-12" />
          </button>
          <button className="flex p-2 justify-center items-center bg-gray-200 rounded-full shadow-md hover:shadow-lg">
            <img src="/images/apple.png" alt="Apple Logo" className="w-12" />
          </button>
        </div>

        <div className="flex w-full text-gray-500 text-lg gap-2 justify-center text-center">
          <span className="font-semibold">{mounted ? t('signInPage.socialLogin.secureLogin') : 'Loading...'}</span> {mounted ? t('signInPage.socialLogin.platformText') : 'Loading...'}
        </div>

        {/* Footer */}
        <div className="flex w-full flex-col justify-between items-center">
          <p className="space-x-2 text-sm">
            <span className="font-medium">{mounted ? t('signInPage.socialLogin.sponsoredBy') : 'Loading...'}</span>
            <span className="text-blue-500 font-semibold">{mounted ? t('signInPage.socialLogin.companyName') : 'Loading...'}</span>
          </p>
          <p className="text-neutral-500 text-md text-bold">{mounted ? t('signInPage.socialLogin.copyright') : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
