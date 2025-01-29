'use client'
 import React from 'react'
import Layout from '@/components/LandingLayout';
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
    {/* Hero Section */}
    <section className="relative  bg-center mt-20 px-4 text-white py-16" style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}>
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#418BBB] to-pink-500 opacity-90"></div>
  <div
                    onClick={() => handleNavigation("/Landing")}
                    className="flex relative z-10 container mx-auto  hover:text-stone-700 font-bold mb-4 gap-3 items-center text-white cursor-pointer"
                  >
                  <span><FaArrowLeft size={16} /></span><span>Back</span>
                  
                  </div>
  <div className="relative z-10  container mx-auto text-center  rounded">
    <h1 className="text-5xl font-bold mb-4">About Us</h1>
    <p className="text-lg  text-stone-800 mx-auto font-medium">
      Transforming education through AI-driven solutions tailored to every learner's needs.
    </p>
  </div>
</section>


      {/* Main Content */}
      <main className="container mx-auto py-12">
       
        {/* Introduction Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            At RoboGuru, our mission is to make education accessible, engaging, and effective for everyone. 
            We aim to empower learners by providing tools that personalize their learning experiences and encourage continuous growth.
          </p>
        </div>

        {/* Statistics Section */}
        <section className="bg-gray-100 py-10 mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-4xl font-bold text-red-600">50+</h3>
                <p className="text-gray-600">Courses Offered</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-purple-600">10K+</h3>
                <p className="text-gray-600">Happy Learners</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-indigo-600">25+</h3>
                <p className="text-gray-600">Expert Instructors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-16 bg-gray-100 py-10 rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {/* Value 1: Innovation */}
            <div className="text-center">
              <div className="bg-[#418BBB] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lightbulb text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Driving advancements in AI and educational technologies to create exceptional learning experiences.
              </p>
            </div>
            {/* Value 2: Accessibility */}
            <div className="text-center">
              <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-universal-access text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making education accessible to all, breaking barriers to ensure no one is left behind.
              </p>
            </div>
            {/* Value 3: Excellence */}
            <div className="text-center">
              <div className="bg-indigo-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering high-quality educational tools, ensuring a superior learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-16 py-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              Our team of passionate educators, AI experts, and technologists is committed to redefining the future of learning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Team Member 1 */}
            <div className="text-center">
              <img src="/images/story1.png" alt="John Doe" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
              <h3 className="text-xl font-semibold">Asly Roe</h3>
              <p className="text-gray-600">Chief AI Architect</p>
              <p className="text-sm text-gray-500">An AI pioneer with 15+ years of experience in education technology.</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img src="/images/story2.png" alt="Jane Smith" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Head of Education</p>
              <p className="text-sm text-gray-500">Leads curriculum development with a focus on personalized learning.</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img src="/images/story3.png" alt="Michael Brown" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
              <h3 className="text-xl font-semibold">Michael Brown</h3>
              <p className="text-gray-600">Product Manager</p>
              <p className="text-sm text-gray-500">Oversees product innovation to deliver user-friendly experiences.</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join RoboGuru?</h2>
            <p className="text-lg font-light max-w-2xl mx-auto mb-6">
              Start your learning journey today and explore the endless possibilities with our AI-driven platform.
            </p>
            <a href="/signup" className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100">
              Sign Up Now
            </a>
          </div>
        </section>
      </main>
   

   </Layout>
    

 
    </div>
   
  );
 }
 
 export default index
