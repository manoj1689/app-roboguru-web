import {useState, useEffect, useRef } from 'react';
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
import { updateUserProfile } from '@/redux/slices/profileSlice';
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
  const language = profile?.language || '';
  const profile_image=profile?.profile_image || ''

  const { educationLevels, loading } = useSelector((state: RootState) => state.educationLevels);
  const { classes,  } = useSelector((state: RootState) => state.class); // Added state for classes

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       dispatch(setProfileImage(reader.result as string));
       console.log("Image uploaded sucessfully")
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !dateOfBirth || !occupation || !educationLevel || !selectedClass || !language) {
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
      profile_image, // Include the uploaded image if available
    };

    try {
      console.log('Submitted Profile Data:', profileData);
      const result = await dispatch(updateUserProfile(profileData)).unwrap();
      console.log('Profile updated successfully:', result);
      router.push('/Home');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex max-md:flex-col justify-center items-center h-screen  relative">
      {/* Left Section */}
      <div className="flex w-full  md:w-5/12 flex-col justify-center items-center bg-gradient-to-r from-[#63A7D4] to-[#F295BE] md:h-screen scroll-auto overflow-y-auto text-center p-6">
        <img src="/images/leftbanner.png" alt="Banner " className="max-md:hidden object-fill mx-auto px-4" />
        <h1 className="text-4xl md:text-6xl font-bold sm:mt-8 text-white">ROBO GURU</h1>
        <p className="sm:mt-4 text-white tracking-wider text-2xl">Learn, Ask, and Grow Anytime, Anywhere.</p>
      </div>

      {/* Center Circular Image */}
      <div className="relative flex max-md:h-40 md:h-full w-full md:w-2/12">
        <div className="absolute inset-0 max-md:flex-col flex">
        <div className="max-md:h-1/2 md:w-1/2 max-md:bg-gradient-to-r from-[#63A7D4] to-[#F295BE] bg-[#F295BE]"></div>
        <div className="max-md:h-1/2 md:w-1/2 bg-[#f8fafa]"></div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <img src="/images/robo_circle.png" alt="RoboGuru Logo" className="w-28 md:w-40 rounded-full object-cover" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-5/12 md:h-full  p-4 flex-col items-center justify-around scroll-auto overflow-y-auto">
        {/* Title */}
        {profile_image && (
          <div className="relative">
            <img
              src={profile_image}
              alt="Uploaded Profile"
              className="w-40 h-40 rounded-lg object-cover border-gray-400 shadow-lg"
            />
            <button
              className="absolute -top-2 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
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
          onChange={handleFileChange}
        />

        {!profile_image && (
          <div
            className="flex flex-col text-3xl p-4 font-bold justify-center  hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer hover:bg-gray-200 border-gray-400 rounded-xl items-center"
            onClick={handleDivClick}
          >
            <div>
              <img src="/images/add.png" alt="add profile" className="w-16" />
            </div>
            <div className="text-[20px] font-bold text-gray-400">Upload Image</div>
          </div>
        )}

      {/* Form Section */}
<form onSubmit={handleSubmit} className="flex flex-col w-full space-y-6 lg:w-5/6 mx-auto">
  <div>
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      ENTER NAME
    </label>
    <input
      type="text"
      placeholder="e.g. John Doe"
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-sky-50"
      value={name}
      onChange={(e) => dispatch(setName(e.target.value))}
      required
    />
  </div>
  <div>
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      ENTER DATE OF BIRTH
    </label>
    <input
      type="text"
      placeholder="e.g. John Doe"
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-pink-50"
      value={dateOfBirth}
      onChange={(e) => dispatch(setDateOfBirth(e.target.value))}
      required
    />
  </div>
  <div>
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      EDUCATION LEVEL
    </label>
    <select
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-pink-50"
      value={educationLevel}
      onChange={(e) => dispatch(setEducationLevel((e.target.value)))}
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
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      CHOOSE CLASS
    </label>
    <select
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-pink-50"
      value={selectedClass}
      onChange={(e) => dispatch(setClass(e.target.value))}
      required
    >
      <option value="" disabled>
        e.g. Class VIII
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
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      ENTER EMAIL
    </label>
    <input
      type="text"
      placeholder="e.g. John Doe"
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-pink-50"
      value={email}
      onChange={(e) => dispatch(setEmail(e.target.value))}
      required
    />
  </div>
  <div>
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      ENTER OCCUPATION
    </label>
    <input
      type="text"
      placeholder="e.g. John Doe"
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-pink-50"
      value={occupation}
      onChange={(e) => dispatch(setOccupation(e.target.value))}
      required
    />
  </div>
  <div>
    <label className="block text-gray-600 text-sm font-semibold uppercase tracking-widest mb-2">
      SELECT LANGUAGE
    </label>
    <select
      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#63A7D4] bg-white hover:bg-pink-50"
      value={language}
      onChange={(e) => dispatch(setLanguage(e.target.value))}
      required
    >
      <option value="" disabled>
        e.g. English
      </option>
      <option value="english">English</option>
      <option value="hindi">Hindi</option>
      <option value="french">French</option>
    </select>
  </div>

  <div className="flex w-full justify-center">
    <button
      type="submit"
      className="w-96 px-4 py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-bold uppercase rounded-full hover:scale-105"
    >
      Submit
    </button>
  </div>
</form>


        <div className="flex w-full flex-col justify-center items-center">
          <div className="mt-8 space-x-2">
            <span>Sponsored & Promoted by</span>
            <span className="text-blue-500 font-semibold">ERAM LABS</span>
          </div>
          <div className="text-sky-400 font-semibold">copyright @ Mobirizer2024</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
