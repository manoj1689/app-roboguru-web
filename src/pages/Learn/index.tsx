import React, { useState, useRef, useEffect } from "react";
import Markdown from 'react-markdown'
import Navbar from "../../components/HomeNavbar"
import TestBar from "@/components/TestBar";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { generateText, generateAudio, generateVideo } from "@/redux/slices/smartLearningSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AppDispatch } from "@/redux/store";
import { CiText } from "react-icons/ci";
import { PiHeadphonesLight } from "react-icons/pi";
import { GoVideo } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import Sidebar from "@/components/Sidebar";
function Index() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [textContent, setTextContent] = useState<{
    title: string;
    description: string;
    sections: { type: string; data?: string; url?: string; alt_text?: string }[];
  } | null>(null);

  const [audioContent, setAudioContent] = useState<{
    audio_url: string;
    title: string;
    description: string;
    text: string;
    segments: { start_time: number; end_time: number; word: string }[];
  } | null>(null);

  const [videoContent, setVideoContent] = useState<{
    video_url: string;
    title: string;
    description: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [showAudio, setShowAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showText, setShowText] = useState(true)
  useEffect(() => {
    handleGenerateText(); // Generate text by default on page load
  }, []);
  // Function to fetch Text Content
  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await dispatch(generateText({ subject: "Mathematics", grade: "10", topic: "Algebra" })).unwrap();
      setTextContent(response);
      setShowAudio(false);
      setShowVideo(false);
      setShowText(true)
    } catch (error) {
      console.error("Error fetching text:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch Audio Content
  const handleGenerateAudio = async () => {
    if (showAudio) {
      setShowAudio(false);

      return;
    }

    try {
      const response = await dispatch(generateAudio({ subject: "Mathematics", grade: "10", topic: "Algebra" })).unwrap();
      setAudioContent(response);
      setShowAudio(true);
      setShowVideo(false);
      setShowText(false);
      setTextContent(null); // Hides text
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  // Function to fetch Video Content
  const handleGenerateVideo = async () => {
    if (showVideo) {
      setShowVideo(false);
      return;
    }
    try {
      const response = await dispatch(generateVideo({ subject: "Mathematics", grade: "10", topic: "Algebra" })).unwrap();
      setVideoContent(response);
      setShowVideo(true);
      setShowAudio(false);
      setShowText(false);
      setTextContent(null); // Hides text
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };


  const handleAudioTimeUpdate = () => {
    if (!audioRef.current || !audioContent?.segments) return;

    const currentTime = audioRef.current.currentTime;
    const lastMatchedIndex = audioContent.segments.findLastIndex(
      (seg) => seg.start_time / 1000 <= currentTime
    );

    setHighlightedWordIndex(lastMatchedIndex);
  };


  const goBack = () => {
    router.back(); // Goes one step back in history
  };
  return (
    <>
      <Navbar />
      <div className="flex p-4 gap-4 mt-16">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex w-full flex-col sm:flex-row justify-between rounded bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white p-5 transition-transform">
          <div className="flex  p-4 text-white gap-4 " onClick={goBack} >
              <span><FaArrowLeftLong size={25} color="white" className="hover:cursor-pointer" /></span><span>Back</span>

            </div>
            <div className="flex flex-col mb-2 w-full">
              <TestBar />
            </div>
          </div>
        
          <div className="flex  font-bold py-4 justify-center">SMART LEARNING</div>
          {showText && textContent && (

            <div className="p-4  bg-white rounded-lg shadow-md overflow-y-auto h-[calc(100vh-24rem)]">
              {loading && <p className="text-gray-500">Loading...</p>}

              {(
                <>

                  <h2 className="text-xl font-bold text-gray-800">{textContent.title}</h2>
                  <p className="text-gray-600">{textContent.description}</p>

                  {textContent.sections.map((section, index) => (
                    <div key={index} className="my-4">
                      {section.type === "markdown" && (

                        <Markdown>{section.data}</Markdown>
                      )}
                      {section.type === "image" && section.url && (
                        <img src={section.url} alt={section.alt_text} className="w-full max-w-md mx-auto rounded-lg" />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          {/* 🔹 Audio Content (Only Visible After Clicking Button) */}
          {showAudio && audioContent && (
            <div className="p-4 bg-white rounded-lg shadow-md overflow-y-auto h-[calc(100vh-20rem)] mt-4">
              <h2 className="text-xl font-bold text-gray-800">{audioContent.title}</h2>
              <p className="text-gray-600">{audioContent.description}</p>


              {/* Display Real-time Highlighted Word */}
              <div className="p-4 bg-white rounded-lg shadow-md mt-4">
                {audioContent.segments.map((segment, index) => (
                  <span
                    key={index}
                    className={`text-gray-700 transition-all duration-200 ${highlightedWordIndex === index ? "bg-yellow-300 px-1 rounded" : ""
                      }`}
                  >
                    {segment.word}{" "}
                  </span>
                ))}
              </div>
              <audio
                ref={audioRef}
                src={audioContent.audio_url}
                controls
                className="w-full mt-2"
                onTimeUpdate={handleAudioTimeUpdate}
              />

            </div>
          )}

          {/* 🔹 Video Content (Only Visible After Clicking Button) */}
          {showVideo && videoContent && (
            <div className="p-4 bg-white rounded-lg shadow-md overflow-y-auto h-[calc(100vh-20rem)]  mt-4">
              <h2 className="text-xl font-bold text-gray-800">{videoContent.title}</h2>
              <div className="flex w-full justify-center">
                <video src={videoContent.video_url} controls className=" rounded-lg" />
              </div>
            </div>
          )}

          {/* 🔹 Action Buttons */}
          <div className="flex w-full justify-center items-center gap-4 flex-wrap mt-4 ">
            {/* Text Button */}
            <div className="flex flex-col items-center">
              <button
                className="p-4 font-medium shadow-lg text-gray-200 rounded-full "
                onClick={handleGenerateText}
              >
                <CiText size={25} className={`${showText ? "text-pink-500" : "text-gray-700"}`} />
              </button>
              <span className={`${showText ? "text-pink-500" : "text-gray-700"} mt-1`}>Text</span>

            </div>

            {/* Audio Button */}
            <div className="flex flex-col items-center">
              <button
                className="p-4  font-medium text-gray-200  shadow-lg rounded-full  "
                onClick={handleGenerateAudio}
              >
                <PiHeadphonesLight size={25} className={`${showAudio ? "text-pink-500" : "text-gray-700"}`} />
              </button>
              <span className="text-gray-700 mt-1">Audio</span>
            </div>

            {/* Video Button */}
            <div className="flex flex-col items-center">
              <button
                className="p-4 font-medium text-gray-200 shadow-lg rounded-full white "
                onClick={handleGenerateVideo}
              >
                <GoVideo size={25} className={`${showVideo ? "text-pink-500" : "text-gray-700"}`} />
              </button>
              <span className="text-gray-700 mt-1">Video</span>
            </div>

            {/* Take a Test Button */}
            <div className="flex flex-col items-center">
              <button
                className="p-4 font-medium text-gray-200 shadow-lg rounded-full  "
              >
                <CgNotes size={25} className="text-neutral-700" />
              </button>
              <span className="text-gray-700 mt-1">Test</span>
            </div>
          </div>


        </div>
      </div>

    </>
  );
}

export default Index;


