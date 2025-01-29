'use client'
 import React from 'react'
import Layout from '@/components/HomeLayout';
 import { useRouter } from 'next/router';
 import { FaArrowLeft } from "react-icons/fa";

 const index = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    
    // Navigate to the selected page
    router.push(path);
  };
  return (
    <div>
   <Layout>
       <section className="relative bg-center mt-20 px-4 text-white py-8" style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}>
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-90"></div>
                        <div
                            onClick={() => handleNavigation("/Home")}
                            className="flex relative z-10 container mx-auto hover:text-stone-700 font-bold mb-4 gap-3 items-center text-white cursor-pointer"
                        >
                            <span><FaArrowLeft size={16} /></span><span>Back</span>
                        </div>
                        <div className="relative z-10 container mx-auto text-center rounded">
                            <h1 className="text-5xl font-bold text-center mb-6">Feedback & Reviews</h1>
                            <p className="text-lg leading-relaxed text-center text-black font-medium mb-8">
                            We value your feedback! Share your experience with RoboGuru and read reviews from other users.
                            </p>
                        </div>
                    </section>
    
   <main className="container mx-auto py-8 px-4 mt-20">
      
      {/* Feedback Form Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Submit Your Feedback</h2>
        <form action="/submit_feedback" method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600"
              required
            />
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600"
              required
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </section>

      {/* User Reviews Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">What Users Say</h2>
        <div className="space-y-6">
          {/* Review 1 */}
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            <p className="text-sm italic">"RoboGuru has transformed the way I learn! The interactive quizzes are amazing."</p>
            <p className="text-sm mt-2 font-semibold">- John Doe</p>
          </div>
          {/* Review 2 */}
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            <p className="text-sm italic">"I love the personalized AI suggestions. It's like having a private tutor."</p>
            <p className="text-sm mt-2 font-semibold">- Jane Smith</p>
          </div>
          {/* Review 3 */}
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            <p className="text-sm italic">"The new dashboard design is so user-friendly and visually appealing."</p>
            <p className="text-sm mt-2 font-semibold">- Michael Brown</p>
          </div>
        </div>
      </section>
    </main> 

   </Layout>
   
   
 
    </div>
   
  );
 }
 
 export default index
