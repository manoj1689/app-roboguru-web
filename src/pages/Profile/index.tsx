import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from "../../redux/store"; // Adjust path as needed
import {
  setName,
  setEmail,
  setDateOfBirth,
  setOccupation,
  setEducationLevel,
  setClass,
  setLanguage,
  setProfileImage
} from '../../redux/slices/profileSlice';
import { fetchEducationLevels } from '../../redux/slices/educationLevelSlice'; // Import the thunk
import { fetchClassesByLevel } from '@/redux/slices/classSlice'; // Import the new thunk
import { updateUserProfile, uploadProfileImage } from '@/redux/slices/profileSlice';


type EducationLevel = {
  id: number;
  name: string;
};

const ProfilePage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const profile = useSelector((state: RootState) => state.profile.profile);

  const name = profile?.name || '';
  const email = profile?.email || '';
  const dateOfBirth = profile?.date_of_birth || '';
  const occupation = profile?.occupation || '';
  const educationLevel = profile?.education_level || '';
  const selectedClass = profile?.user_class || '';
  const language = profile?.language || 'english';
  const profile_image = profile?.profile_image || ''

  const { educationLevels, loading } = useSelector((state: RootState) => state.educationLevels);
  const { classes, } = useSelector((state: RootState) => state.class); // Added state for classes
  const profileImage = useSelector((state: RootState) => state.profile.profile.profile_image);
  // Get the authentication state from Redux
  const { profile_updated,user_profile, token, isLoading } = useSelector(
    (state: RootState) => state.firebaseAuth
  );



  // Fetch education levels on component mount
  useEffect(() => {
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
  }, [dispatch]);

  // Fetch classes when the education level changes
  useEffect(() => {
    if (educationLevel) {
      dispatch(fetchClassesByLevel(educationLevel)); // Fetch classes based on the selected education level
    }
  }, [educationLevel, dispatch]);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(uploadProfileImage(file));
    }
  };

  console.log("image url", profileImage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !email || !educationLevel || !selectedClass || !language) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const profileData = {
      name,
      email,
      date_of_birth: dateOfBirth,
      occupation,
      education_level: educationLevel,
      user_class: selectedClass,
      language,
      profile_image,
    };
  
    try {
      console.log('Submitted Profile Data:', profileData);
      localStorage.setItem('user_profile', JSON.stringify(profileData));
      const result = await dispatch(updateUserProfile(profileData)).unwrap();
      
      console.log('Profile updated successfully api response :', result);
      
      // Reset form fields
      dispatch(setName(''));
      dispatch(setEmail(''));
      dispatch(setDateOfBirth(''));
      dispatch(setOccupation(''));
      dispatch(setEducationLevel(''));
      dispatch(setClass(''));
      dispatch(setLanguage('english'));
      dispatch(setProfileImage(''));
  
      router.push('/Home');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  

  return (
    <div className="flex w-full max-md:flex-col justify-center items-center h-full  relative">
      {/* Left Section */}
      <div className="flex w-full  md:w-5/12 flex-col justify-center items-center bg-gradient-to-r from-[#63A7D4] to-[#F295BE] md:h-screen text-center ">
        <div>
          <img src="/images/leftbanner.png" alt="Banner" className="max-md:hidden w-5/6 mx-auto  " />
        </div>
        <div >
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-sans font-extrabold pt-4 text-white tracking-wide md:tracking-wider lg:tracking-widest">ROBO GURU</h1>
          <p className=" text-white tracking-normal text-lg font-sans font-normal md:text-xl lg:text-2xl  ">Learn, Ask, and Grow Anytime, Anywhere.</p>
        </div>

      </div>

      {/* Center Circular Image */}
      <div className="relative flex max-md:h-40 md:h-screen w-full md:w-2/12">
        <div className="absolute inset-0 max-md:flex-col flex">
          <div className="max-md:h-1/2 md:w-1/2 max-md:bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE]"></div>
          <div className="max-md:h-1/2 md:w-1/2 bg-[#f8fafa]"></div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <img src="/images/robo_circle.png" alt="RoboGuru Logo" className="w-28 md:w-40 rounded-full object-cover" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-5/12 flex-col h-screen  md:overflow-y-auto items-center justify-around pt-4 md:pt-16 pb-4 px-4">
        <div className="w-full flex flex-col justify-center items-center  ">
          {/* Title */}
          {profile_image && (
            <div className="relative">
              <img
                src={profile_image}
                alt="Uploaded Profile"
                className="w-20 h-20  rounded-full object-cover border-gray-400 shadow-lg"
              />
              <button
                className="absolute -top-2 -right-4 bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm hover:bg-red-600"
                onClick={() => dispatch(setProfileImage(''))}
              >
                X
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          {!profile_image && (
            <div
              className="flex flex-col text-xl md:text-2xl px-4 font-bold justify-center hover:scale-110 shadow-lg hover:shadow-xl  cursor-pointer hover:bg-gray-200 border-gray-400 rounded-xl items-center"
              onClick={handleDivClick}
            >
              <div>
                <img src="/images/add.png" alt="add profile" className="w-12 md:w-16" />
              </div>
              <div className="text-sm md:text-lg font-bold text-gray-400 pb-2">Upload Image</div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4 lg:w-5/6 mx-auto">
          <div>
            <label className="block text-neutral-500 text-xs md:text-sm pt-4 font-medium uppercase tracking-widest mb-2">
              Enter your full name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none rounded-t-lg focus:border-[#63A7D4] bg-[#f8fafa] hover:bg-white"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-neutral-500  text-xs md:text-sm font-medium uppercase tracking-widest mb-2">
              EDUCATION LEVEL
            </label>
            <select
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none rounded-t-lg focus:border-[#63A7D4] bg-[#f8fafa] hover:bg-white"
              value={educationLevel}
              onChange={(e) => dispatch(setEducationLevel(e.target.value))}
              required
            >
              <option value="" disabled>
                Select Education Level
              </option>
              {loading ? (
                <option>Loading...</option>
              ) : (
                educationLevels.map((level: EducationLevel) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-neutral-500  text-xs md:text-sm font-medium uppercase tracking-widest mb-2">
              CHOOSE CLASS
            </label>
            <select
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none rounded-t-lg focus:border-[#63A7D4] bg-[#f8fafa] hover:bg-white"
              value={selectedClass}
              onChange={(e) => dispatch(setClass(e.target.value))}
              required
            >
              <option value="" disabled>
                e.g. Class 7
              </option>
              {loading ? (
                <option>Loading...</option>
              ) : (
                classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-neutral-500 text-xs md:text-sm font-medium uppercase tracking-widest mb-2">
              ENTER EMAIL
            </label>
            <input
              type="email"
              placeholder="e.g. johndoe@example.com"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none rounded-t-lg focus:border-[#63A7D4] bg-[#f8fafa] hover:bg-white"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-neutral-500  text-xs md:text-sm font-medium uppercase tracking-widest mb-2">
              SELECT LANGUAGE
            </label>
            <select
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none rounded-t-lg focus:border-[#63A7D4] bg-[#f8fafa] hover:bg-white"
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              required
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="french">French</option>
            </select>
          </div>

          <div className="flex w-full justify-center mt-4">
            <button
              type="submit"
              className="w-80 px-4 py-2   bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-medium uppercase rounded-full hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
        <div className='flex w-full justify-center items-center text-md text-neutral-600 font-semibold mt-8 '>
          Your personal data is secure with us.
        </div>
        <div className="flex w-full  flex-col  justify-between items-center mt-8">
          <div className=" space-x-2 text-sm">
            <span className="font-medium">Sponsored by</span>
            <span className="text-blue-500 font-semibold">ERAM LABS</span>
          </div>
          <div className="text-neutral-500 text-sm text-bold">copyright @ Mobirizer2024</div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
