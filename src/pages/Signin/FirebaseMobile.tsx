'use client';
import React, { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import app from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { firebaseLogin } from '@/redux/slices/firebaseAuthSlice';
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from 'react-redux';
const FirebaseMobile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [formattedPhone, setFormattedPhone] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']); // OTP as an array of 6 digits
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const auth = getAuth(app); // Correctly initialize Firebase auth
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      // Initialize reCAPTCHA only once when the window is available
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container', // ID of the container where reCAPTCHA is rendered
        {
          size: 'normal',
          callback: (response: string) => {
            console.log('reCAPTCHA solved:', response);
          },
          'expired-callback': () => {
            console.warn('reCAPTCHA expired. Solve it again.');
          },
        }
      );
    }
  }, [auth]);

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D+/g, ''); // Remove non-numeric characters
    if (cleaned.startsWith('1')) {
      return `+1 ${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.startsWith('91')) {
      return `+91 ${cleaned.slice(2, 7)}-${cleaned.slice(7, 12)}`;
    } else if (cleaned.length >= 10) {
      return `+${cleaned}`;
    }
    return phone; // Default format if not recognized
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhoneNumber(input);
    setFormattedPhone(formatPhoneNumber(input));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  
    // Automatically move focus to the next input if filled
    if (e.target.value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };
  

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    setError(null);
    if (!phoneNumber) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true); // Set loading true when sending OTP
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmation(confirmationResult);
      setOtpSent(true);
      console.log('OTP sent successfully!');
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Set loading false after OTP is sent
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    setError(null);
  
    if (otp.some((digit) => digit === '') || !confirmation) {
      setError('Please enter the OTP sent to your phone.');
      return;
    }
  
    setLoading(true); // Set loading true when verifying OTP
    try {
      const otpString = otp.join(''); // Join OTP array to string
      const result = await confirmation.confirm(otpString);
      const user = result.user;
      console.log('Phone number verified successfully!');
      
      // Save the token in localStorage
      const token = await user.getIdToken(); // Get the Firebase authentication token
      localStorage.setItem('mobile_access_token', token); // Save token to localStorage
  
      // Dispatch to firebaseLogin and navigate to Dashboard
      dispatch(firebaseLogin(token));
  
      // Wait for the firebaseLogin to complete before navigating
      router.push('/Dashboard'); // Redirect after successful verification
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false); // Set loading false after OTP verification
    }
  };
  

  return (
    <div className="firebase-mobile">
    <div>
    <div className="flex w-full text-6xl font-normal font-sans justify-center items-center ">LOGIN</div>
    </div>
     
      <div className="w-full max-w-md mx-auto">
     
        {!otpSent ? (
          // Send OTP Form
          <form onSubmit={handleSendOtp} className="space-y-4 text-center">
          <h3 className="text-gray-500 font-medium text-sm uppercase my-4">Enter your mobile number</h3>

            
            <input
              type="text"
              placeholder="Ex, +919876543210"
              className="w-full px-4 py-2 border rounded-full text-lg font-mono"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {/* <p className="text-gray-500 text-sm mt-2">Formatted Phone Number: <strong>{formattedPhone}</strong></p> */}
           
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-medium rounded-full uppercase"
              disabled={loading}
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <p className="text-gray-600 text-md pt-4">We will send you a 6-digit <br /> verification code.</p>
            <div className='flex w-full justify-center items-center'>
            <div id="recaptcha-container"></div>
            </div>
       
          </form>
        ) : (
          // Verify OTP Form
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
            <h3 className="text-gray-700 font-medium text-lg">Enter the OTP</h3>
         
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 font-sans rounded-md text-lg font-bold"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-medium rounded-full uppercase"
              disabled={loading || otp.some((digit) => digit === '')}
            >
              {loading ? "Verifying ..." : "Verify "}
            </button>
            <div className='flex justify-center items-center '>
            <button className='flex text-lg font-semibold text-[#418BBB] underline'> Re-send</button>
            </div>
            <p className="text-gray-500 text-md pt-4">Enter the 6-digit code sent to <br/> your mobile number.</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        )}
         
      </div>
    </div>
  );
};

export default FirebaseMobile;
