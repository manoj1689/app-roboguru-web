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
    <section className="flex justify-start gap-6 relative  bg-cover bg-no-repeat mt-20 px-4 text-white py-6" style={{ backgroundImage: 'url(/images/aboutus_back.png)' }}>
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#418BBB] to-pink-500 opacity-50"></div>
  <div
                    onClick={() => handleNavigation("/Landing")}
                    className=" flex w-fit h-fit relative z-10 container ml-6 items-center hover:text-stone-700 font-bold mb-4 gap-3 text-white cursor-pointer"
                  >
                  <span><FaArrowLeft size={16} /></span><span>Back</span>
                  
                  </div>
  <div className="relative z-10  container  text-center w-5/6 rounded">
    <h1 className="text-5xl font-bold mb-4">About Us</h1>
    <p className="text-lg  mx-auto font-medium">
      Transforming education through AI-driven solutions tailored to every learner's needs.
    </p>
  </div>
</section>


      {/* Main Content */}
      <main className="px-14 py-12 bg-gray-100">
       
        {/* Introduction Section */}
        <div className="text-left bg-white py-8 px-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed max-w-3xl ">
            At RoboGuru, our mission is to make education accessible, engaging, and effective for everyone. 
            We aim to empower learners by providing tools that personalize their learning experiences and encourage continuous growth.
          </p>
        </div>

        {/* Statistics Section */}
        <section className="bg-white py-8 px-12 mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-left">Our Impact</h2>
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
        <section className="bg-white py-8 px-12 mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-left">Our Core Values</h2>
            <p className="text-lg leading-relaxed max-w-3xl text-left">
              A diverse array of learning materials to enhance your educational journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mt-10 ">
            {/* Value 1: Innovation */}
            <div className="text-left border border-gray-400 rounded-md px-4 py-2 bg-[#DFF3FF] hover:shadow-xl transform duration-300 hover:cursor-pointer">
              <div className="flex items-center justify-center mx-auto mb-4">
                <img src="/images/aboutus_img1.png" alt="img" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Driving advancements in AI and educational technologies to create exceptional learning experiences.
              </p>
            </div>
            {/* Value 2: Accessibility */}
            <div className="text-left border border-gray-400 rounded-md px-4 py-2 bg-[#FBFFDC] hover:shadow-xl transform duration-300 hover:cursor-pointer">
              <div className="flex items-center justify-center mx-auto mb-4">
                <img src="/images/aboutus_img2.png" alt="img" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making education accessible to all, breaking barriers to ensure no one is left behind.
              </p>
            </div>
            {/* Value 3: Excellence */}
            <div className="text-left border border-gray-400 rounded-md px-4 py-2 hover:shadow-xl transform duration-300 hover:cursor-pointer">
              <div className="flex items-center justify-center mx-auto mb-4">
                <img src="/images/aboutus_img3.png" alt="img" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering high-quality educational tools, ensuring a superior learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white py-8 px-12 mt-12 mb-12">
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg leading-relaxed max-w-2xl ">
              Our team of passionate educators, AI experts, and technologists is committed to redefining the future of learning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Team Member 1 */}
            <div className="bg-[#F3F3F3] p-4 rounded-tl-3xl rounded-br-3xl">
              <img src="/images/story1.png" alt="John Doe" className="w-20 h-20 rounded-full mb-4 shadow-lg" />
              <h3 className="text-xl font-bold">Asly Roe</h3>
              <p className="text-gray-600 mb-3"><i>Chief AI Architect</i></p>
              <p className="text-sm text-gray-500">An AI pioneer with 15+ years of experience in education technology.</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-[#F3F3F3] p-4 rounded-tl-3xl rounded-br-3xl">
              <img src="/images/story2.png" alt="Jane Smith" className="w-20 h-20 rounded-full mb-4 shadow-lg" />
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-gray-600 mb-3">Head of Education</p>
              <p className="text-sm text-gray-500">Leads curriculum development with a focus on personalized learning.</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-[#F3F3F3] p-4 rounded-tl-3xl rounded-br-3xl">
              <img src="/images/story3.png" alt="Michael Brown" className="w-20 h-20 rounded-full  mb-4 shadow-lg" />
              <h3 className="text-xl font-bold">Michael Brown</h3>
              <p className="text-gray-600 mb-3">Product Manager</p>
              <p className="text-sm text-gray-500">Oversees product innovation to deliver user-friendly experiences.</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        {/* <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join RoboGuru?</h2>
            <p className="text-lg font-light max-w-2xl mx-auto mb-6">
              Start your learning journey today and explore the endless possibilities with our AI-driven platform.
            </p>
            <a href="/signup" className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100">
              Sign Up Now
            </a>
          </div>
        </section> */}
      </main>
   

   </Layout>
    

 
    </div>
   
  );
 }
 
 export default index
