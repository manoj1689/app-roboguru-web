import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchTopicsByChapterId } from "../../redux/slices/topicSlice"; // Ensure path is correct
import { BsChatFill } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import Layout from "@/components/HomeLayout";
import { IoChevronForward } from "react-icons/io5";
import { BsChatLeftText } from "react-icons/bs";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Line } from "rc-progress";
import TestBar from "@/components/TestBar";
const TopicScreen = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { chapterId } = router.query; // Get the chapterId from the query parameter
  const { subjectId } = router.query;
  // Get topics from Redux store
  const { topics, loading, error } = useSelector((state: RootState) => state.topics);
  // Get chapters and subjects from Redux store
  const { chapters, loading: chaptersLoading, error: chaptersError } = useSelector(
    (state: RootState) => state.chapters
  );
  // State to manage visible topics
  const [visibleTopics, setVisibleTopics] = useState<any[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({});
  const [currentChapter, setCurrentChapter] = useState<{ name: string; tagline: string } | null>(
    null
  );
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});

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

  // Set visible topics when topics are fetched
  useEffect(() => {
    if (topics.length > 0) {
      setVisibleTopics(topics.slice(0, 7)); // Show first 4 topics initially
    }
  }, [topics]);
  // Filter the current subject from the subject list using subjectId
  useEffect(() => {
    if (subjectId && chapters.length > 0) {
      const chapter = chapters.find((chapter) => chapter.id === chapterId);
      if (chapter) {
        setCurrentChapter({ name: chapter.name, tagline: chapter.tagline });
      }
    }
  }, [chapters, chapterId]);

  const handleViewMore = () => {
    setVisibleTopics(topics); // Show all topics when "View More" is clicked
  };

  const handleExpand = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId], // Toggle expansion for the selected topic
    }));
  };

  if (loading) return <div>Loading topics...</div>;
  if (error) return <div>{error}</div>;
  console.log("chapter topic list", topics)

  const goBack = () => {
    router.back(); // Goes one step back in history
  };

  return (
    <Layout>
   
      <section className="flex w-full flex-col container  mx-auto px-4" >
    
     <TestBar />
     
        {currentChapter && (



          <div className="flex gap-4   mt-4">

            <div className="py-2">
              <FaArrowLeft size={20} color="black" onClick={goBack} className="hover:cursor-pointer" />
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
                <div className={`flex max-md:flex-col w-full border-l-4 border-l-[#418BBB]  border-[#D5D5D5] justify-between  bg-white border  ${expandedTopics[topic.id] ? 'rounded-tr-lg' : 'rounded-r-lg'} px-4 hover:shadow transition-shadow`}>
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
                     strokeWidth={1}
                     trailWidth={1}
                     strokeColor="#63A7D4"
                     trailColor="#CDE6F7"
                   />
                   </span>
                 
                 </div>
                 <div className="flex w-full md:w-1/6">
                 <div> <span className=" text-[#418BBB] text-semibold">progress:{progressValues[topic.id] || 10}%</span></div>
                 </div>
                    </div>
                    
                    <div className="flex w-full justify-start">
                      {topic.subtopics?.length > 0 && (
                        <button
                          onClick={() => handleExpand(topic.id)}
                          className="py-2 text-blue-500 font-semibold tracking-widest underline flex items-center gap-1"
                        >
                          {expandedTopics[topic.id] ? (
                            <>
                              Show Less <MdKeyboardDoubleArrowDown size={16} />
                            </>
                          ) : (
                            <>
                              Show More <MdKeyboardDoubleArrowUp size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center items-center p-2">
                    <button

                      onClick={() => router.push(`/AiChat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topic.id}`)}
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
                      <div key={subIndex} className="text-sm flex p-2 rounded-lg justify-between hover:bg-sky-200 hover:font-semibold cursor-pointer">
                        <div className="flex gap-4">
                          <div className="text-cyan-600">
                            <GoArrowUpRight size={20} />
                          </div>
                          <div
                            className=" cursor-pointer transition-all"
                            onClick={() =>
                              router.push(
                                `/AiChat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topic.id}&subtopicId=${subIndex}`
                              )
                            }
                          >
                            {subtopic}
                          </div>
                        </div>
                        <div
                          className="cursor-pointer text-[#418BBB] transition-all"
                          onClick={() =>
                            router.push(
                              `/AiChat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topic.id}&subtopicId=${subtopic.id}`
                            )
                          }
                        >
                          <BsChatFill size={20} />
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
