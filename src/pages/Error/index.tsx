'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Image 
                src="/images/pageNotFound.png" 
                alt="Page Not Found" 
                width={400} 
                height={400} 
                className="mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">Oops! Page Not Found</h1>
            <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
            <button
                onClick={() => router.push('/')}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white font-medium rounded-full uppercasetransition"
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default ErrorPage;
