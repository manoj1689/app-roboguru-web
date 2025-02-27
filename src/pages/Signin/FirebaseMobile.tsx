'use client';
import React, { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import app from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { firebaseLogin } from '@/redux/slices/firebaseAuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useTranslation } from "next-i18next";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const FirebaseMobile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const auth = getAuth(app); // Initialize Firebase Auth
  const profileUpdated = useSelector((state: RootState) => state.firebaseAuth.profile_updated);
  const accessToken = useSelector((state: RootState) => state.firebaseAuth.token);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill('')); // OTP input fields
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: string) => {
        
        },
        'expired-callback': () => {
          console.warn(t("signInPage.recaptcha.expiredMessage"));
        },
      });

      window.recaptchaVerifier.render().catch((err:any) => console.error('Recaptcha render error:', err));
    }
  }, [auth]);

  const handlePhoneNumberChange = (value: string | undefined) => {
    if (value) {
      setPhoneNumber(`+${value.replace(/\D/g, '')}`); // Ensure proper format
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);

    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phoneNumber.match(/^\+\d{10,15}$/)) {
      setError(t("signInPage.errors.invalidPhone"));
      return;
    }

    setLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmation(confirmationResult);
      setOtpSent(true);
     
    } catch (err) {
     
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.some((digit) => digit === '') || !confirmation) {
      setError(t("signInPage.errors.otpRequired"));
      return;
    }

    setLoading(true);
    try {
      const otpString = otp.join('');
      const result = await confirmation.confirm(otpString);
      const user = result.user;
     

      const token = await user.getIdToken();
      dispatch(firebaseLogin(token));
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      if (!accessToken) {
        router.push('/Signin'); // Redirect to sign-in if token is missing
        return;
      }
  
      if (profileUpdated !== null) {
      
        router.push(profileUpdated ? '/Home' : '/Profile'); // Redirect based on profile status
      }
    }, [accessToken, profileUpdated, router]);

  return (
    <div className="firebase-mobile">
      <div className="flex w-full text-6xl font-normal font-sans justify-center items-center">
        {mounted ? t("signInPage.login") : "Loading..."}
      </div>

      <div className="w-full max-w-md mx-auto">
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-center">
            <h3 className="text-gray-500 font-medium text-sm uppercase my-4">
              {mounted ? t("signInPage.sections.phoneNumberInput.title") : "Loading..."}
            </h3>

            <PhoneInput
              placeholder="Ex, +919876543210"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              country="in"
              inputStyle={{ width: '100%', borderRadius: '8px', borderColor: '#FFFFFF' }}
              dropdownStyle={{ padding: '8px', borderRadius: '8px', borderColor: '#FFFFFF' }}
            />

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-medium rounded-full uppercase"
              disabled={loading}
            >
              {mounted ? (loading ? t("signInPage.loadingMessages.sendingOtp") : t("signInPage.sections.phoneNumberInput.sendOtpButton")) : "Loading..."}
            </button>

            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            <div id="recaptcha-container" className="flex justify-center"></div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
            <h3 className="text-gray-700 font-medium text-lg">
              {mounted ? t("signInPage.sections.otpVerification.title") : "Loading..."}
            </h3>

            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-bold"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-medium rounded-full uppercase"
              disabled={loading || otp.some((digit) => digit === '')}
            >
              {mounted ? (loading ? t("signInPage.loadingMessages.verifyingOtp") : t("signInPage.sections.otpVerification.verifyButton")) : "Loading..."}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default FirebaseMobile;
