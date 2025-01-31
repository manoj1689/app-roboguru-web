import { useRouter } from "next/router";
import {  googleProvider, facebookProvider } from "../../lib/firebase";
import { getAuth } from 'firebase/auth';
import app from "../../lib/firebase";
import { signInWithPopup, User } from "firebase/auth";
import FirebaseMobile from './FirebaseMobile'

const SignInPage: React.FC = () => {
const auth = getAuth(app);
  const router = useRouter();

  // Helper function to save token and user data in localStorage
  const saveToken = (user: User) => {
    // Use type assertion to access stsTokenManager
    const token = (user as any).stsTokenManager.accessToken;

    // Check if token exists in localStorage
    const existingToken = localStorage.getItem("social_access_token");
    if (existingToken) {
      alert("You are already logged in.");
      return;
    }
    // Save token and user info
    localStorage.setItem("social_access_token", token);
    localStorage.setItem("userData", JSON.stringify(user));
    console.log("Token saved to localStorage:", token);
    console.log("User data:", user);

    // Redirect to Dashboard
    router.push("/Dashboard");
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      saveToken(user); // Save token and redirect
    } catch (error: any) {
      console.error("Google Sign-In Error:", error.message);
      alert(`Error during Google Sign-In: ${error.message}`);
    }
  };

  // Facebook Sign-In
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      saveToken(user); // Save token and redirect
    } catch (error: any) {
      console.error("Facebook Sign-In Error:", error.message);
      alert(`Error during Facebook Sign-In: ${error.message}`);
    }
  };

  return (
    <div className="flex max-md:flex-col justify-center items-center  h-screen scroll-auto overflow-y-auto relative">
      {/* Left Section */}
      <div className="flex w-full  md:w-5/12 flex-col justify-center items-center bg-gradient-to-r from-[#63A7D4] to-[#F295BE] md:h-screen text-center p-6">
        <img src="/images/leftbanner.png" alt="Banner" className="max-sm:hidden w-full mx-auto px-4" />
        <h1 className="text-4xl md:text-6xl font-bold sm:mt-8 text-white">ROBO GURU</h1>
        <p className="sm:mt-4 text-white tracking-wider text-2xl">Learn, Ask, and Grow Anytime, Anywhere.</p>
      </div>

      {/* Center Circular Image */}
      <div className="relative flex max-md:h-40 md:h-full w-full md:w-2/12">
        <div className="absolute inset-0 max-md:flex-col flex">
          <div className="max-md:h-1/2 md:w-1/2 max-md:bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#aff295]"></div>
          <div className="max-md:h-1/2 md:w-1/2 bg-[#558585]"></div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <img src="/images/robo_circle.png" alt="RoboGuru Logo" className="w-28 md:w-40 rounded-full object-cover" />
        </div>
      </div>

    {/* Right Section */}
<div className="w-full md:w-5/12 h-full overflow-y-auto flex flex-col items-center justify-around p-4">
 

  {/* Mobile Login Form */}
  <div >
    <FirebaseMobile />
    </div>

  <div className="flex w-full gap-12 flex-col items-center">

    {/* Divider and Social Login */}
    <div className="flex items-center w-full">
      <hr className="flex-grow border-gray-300" />
      <span className="mx-2 text-gray-500 font-bold">OR</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    {/* Google and Facebook Buttons */}
    <div className="flex w-full space-x-8 justify-center items-center">
      <button
        onClick={handleFacebookSignIn}
        className="flex justify-center items-center rounded-full shadow-md hover:shadow-lg"
      >
        <span>
          <img
            src="/images/facebook.png"
            alt="Facebook Logo"
            className="w-16 rounded-full bg-white"
          />
        </span>
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="flex p-2 justify-center items-center bg-gray-200 rounded-full shadow-md hover:shadow-lg"
      >
        <span>
          <img src="/images/google.png" alt="Google Logo" className="w-12" />
        </span>
      </button>
      <button
        className="flex gap-4 p-2 justify-center items-center bg-gray-200 rounded-full shadow-md hover:shadow-lg"
      >
        <span>
          <img src="/images/apple.png" alt="Apple Logo" className="w-12" />
        </span>
      </button>
    </div>
  </div>
 
  <div className="flex w-full  flex-col justify-center items-center">
    <div className="flex w-full text-gray-500 text-lg gap-2 justify-center font-bold text-center pt-4">
      <span className="font-bold">Secure Login </span><span className="font-medium">with Your Favorite Platform</span>
    </div>
    <div className="mt-8 space-x-2">
      <span>Sponsored & Promoted by</span>
      <span className="text-blue-500 text-sm font-semibold">ERAM LABS</span>
    </div>
    <div className="text-[#838383] text-sm text-bold">copyright @ Mobirizer2024</div>
  </div>
</div>

    </div>
  );
};

export default SignInPage;
