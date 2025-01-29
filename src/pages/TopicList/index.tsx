import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchTopicsByChapterId } from "../../redux/slices/topicSlice"; // Ensure path is correct
import { BsChatFill } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import Layout from "@/components/HomeLayout";
import Sidebar from "@/components/Sidebar";
import GreetingBar from "@/components/GreetingBar";
import { IoChevronForward } from "react-icons/io5";
import { BsChatLeftText } from "react-icons/bs";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";


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

  // Fetch topics when chapterId changes
  useEffect(() => {
    if (chapterId) {
      dispatch(fetchTopicsByChapterId(chapterId as string));
    }
  }, [dispatch, chapterId]);

  // Set visible topics when topics are fetched
  useEffect(() => {
    if (topics.length > 0) {
      setVisibleTopics(topics.slice(0, 4)); // Show first 4 topics initially
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
  return (
    <Layout>
      <div className="">
        <Sidebar />
      </div>

      <section className="w-full lg:ml-64 container mx-auto px-4">
        <GreetingBar />
        {currentChapter && (
          <div className=" p-4 mt-4 ">
            <h2 className="text-2xl font-bold text-black">{currentChapter.name}</h2>
            <p className="text-md text-gray-700">{currentChapter.tagline}</p>
          </div>
        )}
        <div className="flex w-full justify-end mt-4 ">

          {/* Show View More button if there are more than 4 topics */}
          {topics.length > 4 && visibleTopics.length < topics.length && (
            <button
              onClick={handleViewMore}
              className="py-2 px-4  flex justify-center items-center text-stone font-semibold rounded-md gap-2 hover:text-sky-500 transition-all"
            >
              <div>View More</div> <div className="flex"> <IoChevronForward size={16} /><IoChevronForward size={16} />
              </div>
            </button>
          )}
        </div>
        <div className="flex flex-col max-h-[600px] overflow-y-auto gap-4">
          {visibleTopics.map((topic: any, index: number) => (
            <div
              key={index}
              className="flex w-full flex-col border-l-4 border-red-400 bg-green-50 border rounded-lg p-4 hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Topic: <span className="px-2">{index + 1}</span></p>
                  <h4 className="text-xl text-black font-semibold mb-2">{topic.name}</h4>
                  <p className="text-sm text-black mb-2">{topic.details}</p>
                </div>
                <div>
                  <button

                    onClick={() => router.push(`/Chat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topic.id}`)}
                    className="py-2 bg-red-400 px-4 rounded-lg shadow-lg flex justify-center items-center text-white  font-semibold tracking-widest "
                  >
                    <span className="px-2"><BsChatLeftText /></span> Chat
                  </button>
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


              <div className="flex flex-col bg-cyan-200 rounded-lg gap-4">
                {expandedTopics[topic.id] && topic.subtopics?.length > 0 && (
                  <div className="flex flex-col gap-4 p-4">
                    {topic.subtopics.map((subtopic: any, subIndex: number) => (
                      <div key={subIndex} className="text-sm flex justify-between">
                        <div className="flex gap-4">
                          <div className="text-cyan-600">
                            <GoArrowUpRight size={20} />
                          </div>
                          <div
                            className="text-stone-800 cursor-pointer hover:text-blue-600 transition-all"
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
                          className="text-cyan-600 cursor-pointer hover:text-blue-600 transition-all"
                          onClick={() =>
                            router.push(
                              `/Chat?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topic.id}&subtopicId=${subtopic.id}`
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
