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
import { RiVoiceAiLine } from "react-icons/ri";
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
  const { classes } = useSelector((state: RootState) => state.class);
  const { subjects } = useSelector((state: RootState) => state.subjects);


  // Local States
  const [visibleTopics, setVisibleTopics] = useState<any[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({});
  const [currentChapter, setCurrentChapter] = useState<{ name: string; tagline: string } | null>(null);
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});
  const [userName, setUserName] = useState<string>('')
  const [subjectName, setSubjectName] = useState<string>('');
  const [chapterName, setChapterName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
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
  // Update display names for subject, chapter, topic, and handle subtopics
  useEffect(() => {
    const userData = localStorage.getItem('user_profile');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.name) {
        setUserName(parsedData.name);

      }
      if (subjectId && subjects.length > 0) {
        const foundSubject = subjects.find((subject) => subject.id === subjectId);
        setSubjectName(foundSubject ? foundSubject.name : 'Unknown Subject');
      }
      if (chapterId && chapters.length > 0) {
        const foundChapter = chapters.find((chapter) => chapter.id === chapterId);
        setChapterName(foundChapter ? foundChapter.name : 'Unknown Chapter');
      }
   
      }
    }, [subjectId, chapterId, subjects, chapters, topics]);
  console.log("subject &  Chapter & User at topic list", subjectName, chapterName,userName)
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

  const launchChatGPT = (topicId: string, subTopicId?: number) => {
    if (!topicId || topics.length === 0) {
      console.error("Invalid topic ID or topics list is empty");
      return;
    }
  
    const foundTopic = topics.find((topic) => topic.id === topicId);
    if (!foundTopic) {
      console.error("Topic not found");
      return;
    }
  
    setTopicName(foundTopic.name || "Unknown Topic");
  
    let questionText = "";
    if (subTopicId !== undefined && foundTopic.subtopics?.length > subTopicId) {
      questionText = foundTopic.subtopics[subTopicId] || "Unknown Subtopic";
    }
  
    let modifiedPrompt = `Hey ChatGPT, you need to teach ${userName} the subject ${subjectName} and the chapter ${chapterName}, specifically the topic ${foundTopic.name}.`;
  
    if (questionText) {
      modifiedPrompt += ` The focus should be on the subtopic ${questionText}.`;
    }
  
    modifiedPrompt += ` They are in ${className}. Make the lesson fun, interactive, and engaging. 
      Encourage questions and participation. Only begin teaching when ${userName} says 'Hello Roboguru'. 
      Be patient and let ${userName} lead the conversation.`;
  
    const chatGPTURL = `https://chat.openai.com/?prompt=${encodeURIComponent(modifiedPrompt)}`;
    window.open(chatGPTURL, "_blank");
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

        <div className="flex w-full justify-between rounded bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white p-5  transition-transform">
          <div>
            <TestBar />
          </div>
          <div>
            <button className="px-4 py-2 font-medium text-gray-200 rounded-lg bg-gradient-to-t from-[#7A4F9F] to-[#F15A97] transition-all duration-300 hover:opacity-80"
              onClick={() => router.push(`/ExamModule?subjectId=${subjectId}&chapterId=${chapterId}`)}
            >
              Take a Test
            </button>
          </div>

        </div>

        {currentChapter && (


          <div className="flex gap-4 items-center bg-gray-100 p-4 my-4">

            <div className="">
              <FaArrowLeftLong size={25} color="black" onClick={goBack} className="hover:cursor-pointer" />
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

                  <div className="flex justify-center items-center p-2 gap-4">
                  <BsChatLeftText  onClick={() => handleTopicChat(topic.id)} size={25} color="#418BBB" className="cursor-pointer hover:scale-105"/>
                  <RiVoiceAiLine onClick={()=>launchChatGPT(topic.id)} size={25} color="#418BBB" className="cursor-pointer hover:scale-105" />


                    {/* <button

                      
                      className="py-2 bg-[#418BBB] px-4 rounded-lg shadow-lg flex justify-center items-center text-white  font-semibold tracking-widest "
                    >
                      <span className="px-2"></span>Chat
                    </button>
                    <button > 
                      Voice
                    </button> */}
                  </div>
                </div>
              </div>




              <div className="flex flex-col bg-[#D7EFFF] rounded-b-lg gap-4">
                {expandedTopics[topic.id] && topic.subtopics?.length > 0 && (
                  <div className="flex flex-col gap-4 p-4 ">
                    {topic.subtopics.map((subtopic: any, subIndex: number) => (
                      <div key={subIndex} className="text-md flex p-2 rounded-lg justify-between hover:bg-sky-200 hover:font-semibold cursor-pointer"  >
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
                          className="flex  text-[#51AAD4] transition-all gap-8"
                        >
                          <IoChatbubbles size={25} onClick={() => handleSubTopicChat(topic.id, subIndex)} className="cursor-pointer" />
                          <IoMdMic size={25} onClick={()=>launchChatGPT(topic.id,subIndex)} className="cursor-pointer" />
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
