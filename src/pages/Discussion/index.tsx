'use client'
 import React from 'react'
 import HomeNavbar from "../../components/HomeNavbar"
 import HomeFooter from '@/components/HomeFooter'
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
    <div>
      <HomeNavbar/>
    </div>
    <main className="container mx-auto py-8 px-4 mt-20">
      <div
        onClick={() => handleNavigation('/Landing')}
        className="flex hover:text-red-500 font-bold mb-4 gap-3 items-center text-red-400 cursor-pointer"
      >
        <span>
          <FaArrowLeft size={16} />
        </span>
        <span>Back</span>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Discussion: Algebra Basics</h1>
      <p className="text-lg leading-relaxed text-center mb-8">
        Join the conversation on Algebra Basics. Share your insights, ask questions, and connect with the community.
      </p>

      {/* Original Post Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Original Post</h2>
        <div className="p-4 border rounded shadow-sm bg-gray-100">
          <p className="text-sm mb-4">
            "Can someone explain the fundamental principles of solving linear equations? I keep getting confused with the steps."
          </p>
          <p className="text-right text-gray-600 text-sm">
            Posted by <strong>John Doe</strong>, 2 days ago
          </p>
        </div>
      </section>

      {/* Replies Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Replies</h2>
        <div className="space-y-6">
          {/* Reply 1 */}
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            <p className="text-sm mb-2">
              "Start by isolating the variable on one side of the equation. Use inverse operations to simplify each step."
            </p>
            <p className="text-right text-gray-600 text-sm">
              Posted by <strong>Jane Smith</strong>, 1 day ago
            </p>
          </div>
          {/* Reply 2 */}
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            <p className="text-sm mb-2">
              "I find it helpful to write down each step clearly and double-check my calculations as I go."
            </p>
            <p className="text-right text-gray-600 text-sm">
              Posted by <strong>Michael Brown</strong>, 12 hours ago
            </p>
          </div>
          {/* Reply 3 */}
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            <p className="text-sm mb-2">
              "There are some great practice problems in our e-library that can help you get the hang of it."
            </p>
            <p className="text-right text-gray-600 text-sm">
              Posted by <strong>Susan Lee</strong>, 3 hours ago
            </p>
          </div>
        </div>
      </section>

      {/* Add Reply Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add Your Reply</h2>
        <form action="/submit_reply" method="POST" className="space-y-4">
          <div>
            <label
              htmlFor="reply"
              className="block text-sm font-medium text-gray-700"
            >
              Your Reply
            </label>
            <textarea
              id="reply"
              name="reply"
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
              Post Reply
            </button>
          </div>
        </form>
      </section>
    </main>
    <div>
    <HomeFooter/>
    </div>
 
    </div>
   
  );
 }
 
 export default index
