"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../../redux/store";
import { login, verifyOtp } from "../../redux/slices/authSlice";

const AuthPage = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Handle OTP input changes
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length > 1 || !/^\d*$/.test(value)) return; // Only allow one digit and numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus the next input automatically
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login(mobile));
      if (login.fulfilled.match(resultAction)) {
        setIsOtpSent(true);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  // Handle Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    try {
      const resultAction = await dispatch(verifyOtp({ mobile, otp: otpCode }));
      if (verifyOtp.fulfilled.match(resultAction)) {
        router.push("/"); // Redirect to admin dashboard on success
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full max-w-md">
        {!isOtpSent ? (
          // Send OTP Form
          <form onSubmit={handleSendOTP} className="space-y-4 text-center">
            <h3 className="text-gray-700 font-medium">Enter your mobile number</h3>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-400 text-white font-bold rounded"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <p className="text-gray-500 text-md text-semibold">
              We will send you a 4-digit verification code.
            </p>
          </form>
        ) : (
          // Verify OTP Form
          <form onSubmit={handleVerifyOTP} className="space-y-4 text-center">
            <h3 className="text-gray-700 font-medium">Enter the OTP</h3>
            <p className="text-gray-500 text-sm">Enter the 4-digit code sent to your mobile number.</p>
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
              className="w-full px-4 py-2 bg-green-500 text-white rounded mt-4"
              disabled={loading || otp.some((digit) => digit === "")}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
