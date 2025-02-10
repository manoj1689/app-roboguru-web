import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  createSession,
  resetSessionState,
} from "../../redux/slices/sessionSlice";
import { resetChat } from "../../redux/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchTopicsByChapterId } from "../../redux/slices/topicSlice"; 
import Layout from "@/components/HomeLayout";
import { BsChatLeftText } from "react-icons/bs";
import { IoMdMic } from "react-icons/io";
import { IoChatbubbles } from "react-icons/io5";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsArrowUpRight } from "react-icons/bs";
import { Line } from "rc-progress";
import TestBar from "@/components/TestBar";

const TopicScreen = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { chapterId, subjectId } = router.query;

  // Redux Selectors
  const { sessionId, loading: sessionLoading } = useSelector(
    (state: RootState) => state.session
  );
  const { topics, loading, error } = useSelector((state: RootState) => state.topics);
  const { chapters } = useSelector((state: RootState) => state.chapters);

  // Local States
  const [visibleTopics, setVisibleTopics] = useState<any[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({});
  const [currentChapter, setCurrentChapter] = useState<{ name: string; tagline: string } | null>(null);
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});

  console.log("Session ID at topic list:", sessionId);

  // Generate random progress for each topic when topics are fetched
  useEffect(() => {
    if (topics.length > 0) {
      const progressMap: { [key: string]: number } = {};
      topics.forEach((topic) => {
        progressMap[topic.id] = parseFloat((Math.random() * (100 - 10) + 10).toFixed(2));
      });
      setProgressValues(progressMap);
    }
  }, [topics]);

  // Fetch topics when chapterId changes
  useEffect(() => {
    if (chapterId) {
      dispatch(fetchTopicsByChapterId(chapterId as string));
    }
  }, [dispatch, chapterId]);

  // Ensure session is created before navigation
  useEffect(() => {
    const initializeSession = async () => {
      try {
        await dispatch(resetSessionState()); // Reset session state
        if (!sessionId) {
          const result = await dispatch(createSession()); // Ensure session is created
          console.log("Session Created:", result.payload);
        }
        dispatch(resetChat()); // Reset chat after session creation
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    if (!sessionId) {
      initializeSession();
    }
  }, [dispatch, sessionId]); // ✅ Added sessionId dependency to avoid multiple resets

  // Set visible topics when topics are fetched
  useEffect(() => {
    if (topics.length > 0) {
      setVisibleTopics(topics.slice(0, 7)); // Show first 7 topics initially
    }
  }, [topics]);

  // Set current chapter details
  useEffect(() => {
    if (subjectId && chapters.length > 0) {
      const chapter = chapters.find((chapter) => chapter.id === chapterId);
      if (chapter) {
        setCurrentChapter({ name: chapter.name, tagline: chapter.tagline });
      }
    }
  }, [chapters, chapterId]);

  // Function to navigate when topic is selected
  const handleTopicChat = async (topicId: string) => {
    if (!sessionId) {
      console.error("Session ID is null, waiting for session...");
      return;
    }

    router.push(`/AiChat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topicId}&chatSessionId=${sessionId}`);
  };
  
  const handleSubTopicChat = async (topicId: string, subTopicId: number) => {
    if (!sessionId) {
      console.error("Session ID is null, waiting for session...");
      return;
    }
      router.push(`/AiChat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topicId}&subtopicId=${subTopicId}&chatSessionId=${sessionId}`);
    }; 
  
  
  const goBack = () => {
    router.back();
  };
  const handleViewMore = () => {
    setVisibleTopics(topics); // Show all topics when "View More" is clicked
  };

  const handleExpand = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId], // Toggle expansion for the selected topic
    }));
  };

  if (loading || sessionLoading) return <div>Loading topics...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
   
      <section className="flex w-full flex-col container  mx-auto px-4" >
    
     <TestBar />
     
        {currentChapter && (


          <div className="flex gap-4 items-center bg-gray-100 p-4 my-4">

            <div className="">
              <FaArrowLeftLong  size={25} color="black" onClick={goBack} className="hover:cursor-pointer" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">{currentChapter.name}</h2>
              <p className="text-md text-gray-700">{currentChapter.tagline}</p>
            </div>

          </div>
        )}
       

     
        <div className="flex flex-col mt-4 gap-4">
          {visibleTopics.map((topic: any, index: number) => (
            <div
              key={index}
            >
              <div className="flex w-full">
                <div className={`flex max-md:flex-col w-full border-l-8 border-l-[#418BBB]  border-[#D5D5D5] justify-between  bg-white border  ${expandedTopics[topic.id] ? 'rounded-tr-lg' : 'rounded-r-lg'} px-4 hover:shadow transition-shadow`}>
                  <div className="flex w-full px-4 flex-col">
                    <div className="mt-2">
                      <h4 className="text-xl text-black font-semibold mb-2">{topic.name}</h4>
                      <p className="text-sm text-black mb-2">{topic.tagline}</p>
                    </div>
                    <div className="flex gap-2 max-md:flex-col justify-center items-center pr-12">
                    <div className="flex w-full  md:w-5/6">
                   <span className="w-full">
                   <Line
                     percent={progressValues[topic.id] || 10} // Default to 10% if missing
                     strokeWidth={1.5}
                     trailWidth={1.5}
                     strokeColor="#63A7D4"
                     trailColor="#CDE6F7"
                   />
                   </span>
                 
                 </div>
                 <div className="flex w-full md:w-1/6">
                 <div> <span className=" text-[#418BBB] space-x-2 text-semibold"><span className="font-semibold">progress:</span><span className="text-semibold text-stone-800">{progressValues[topic.id] || 10}%</span></span></div>
                 </div>
                    </div>
                    
                    <div className="flex w-full justify-start">
                      {topic.subtopics?.length > 0 && (
                        <button
                          onClick={() => handleExpand(topic.id)}
                          className="py-2 text-[#418BBB] font-semibold tracking-widest underline flex items-center gap-1"
                        >
                          {expandedTopics[topic.id] ? (
                            <>
                              Expand Less  <MdKeyboardDoubleArrowUp size={16} />
                            </>
                          ) : (
                            <>
                              Expand More<MdKeyboardDoubleArrowDown size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center items-center p-2">
                    <button

                      onClick={()=>handleTopicChat(topic.id)}
                      className="py-2 bg-[#418BBB] px-4 rounded-lg shadow-lg flex justify-center items-center text-white  font-semibold tracking-widest "
                    >
                      <span className="px-2"><BsChatLeftText /></span>Chat
                    </button>
                  </div>
                </div>
              </div>




              <div className="flex flex-col bg-[#D7EFFF] rounded-b-lg gap-4">
                {expandedTopics[topic.id] && topic.subtopics?.length > 0 && (
                  <div className="flex flex-col gap-4 p-4 ">
                    {topic.subtopics.map((subtopic: any, subIndex: number) => (
                      <div key={subIndex} className="text-md flex p-2 rounded-lg justify-between hover:bg-sky-200 hover:font-semibold cursor-pointer" onClick={()=>handleSubTopicChat(topic.id,subIndex)} >
                        <div className="flex gap-4">
                          <div className="text-cyan-600">
                            <BsArrowUpRight size={20} />
                          </div>
                          <div
                            className=" cursor-pointer transition-all"
                          >
                            {subtopic}
                          </div>
                        </div>
                        <div
                          className="flex cursor-pointer text-[#51AAD4] transition-all gap-8"
                        >
                          <IoChatbubbles size={25} />
                          <IoMdMic  size={25} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>


            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TopicScreen;
