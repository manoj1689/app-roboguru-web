'use client';
import React from 'react';

const ExamDetails = () => {
    return (
        <div className="flex  w-full items-center justify-center ">
            <div className="flex w-full flex-col bg-white py-4">
                <h2 className="text-2xl font-medium text-center mb-6 text-gray-700">
                    Exam Details
                </h2>


                <div className='flex w-full bg-[#CBEBF6] justify-center my-4 '>
                    <p className=" text-center text-md text-[#0D6BC9]   py-2">
                        <strong>Exam Overview</strong> - Here are your selected details.
                    </p>
                </div>
                <div className="flex flex-col space-y-4 p-4">
                    {/* Subject */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <label className="lg:w-1/3 font-semibold text-gray-600">Subject</label>
                        <span className="border px-4 py-2 rounded w-full lg:w-2/3 text-gray-700 bg-gray-50">
                            Mathematics
                        </span>
                    </div>

                    {/* Chapter */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <label className="lg:w-1/3 font-semibold text-gray-600">Chapter</label>
                        <span className="border px-4 py-2 rounded w-full lg:w-2/3 text-gray-700 bg-gray-50">
                            Algebra
                        </span>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <label className="lg:w-1/3 font-semibold text-gray-600">Topics</label>
                        <span className="border px-4 py-2 rounded w-full lg:w-2/3 text-gray-700 bg-gray-50">
                            Linear Equation
                        </span>
                    </div>

                    {/* No. of Questions */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <label className="lg:w-1/3 font-semibold text-gray-600">No. of Questions</label>
                        <span className="border px-4 py-2 rounded w-full lg:w-2/3 text-gray-700 bg-gray-50">
                            10 Questions
                        </span>
                    </div>

                    {/* Difficulty Level */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                        <label className="lg:w-1/3 font-semibold text-gray-600">Difficulty Level</label>
                        <span className="border px-4 py-2 rounded w-full lg:w-2/3 text-gray-700 bg-gray-50">
                            Medium
                        </span>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center mt-6">
                    <button className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-8 py-2 rounded-full shadow-md">
                        Start Exam
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamDetails;
