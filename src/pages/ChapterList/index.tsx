import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchChaptersBySubjectId } from "../../redux/slices/chapterSlice";
import { fetchSubjectsByClassId } from "../../redux/slices/subjectSlice";
import Layout from "@/components/HomeLayout";
import Sidebar from "@/components/Sidebar";
import GreetingBar from "@/components/GreetingBar";
import { IoChevronForward } from "react-icons/io5";
import { fetchUserProgress } from "../../redux/slices/progressSlice";
import { Circle } from "rc-progress";

const ChapterScreen = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { subjectId } = router.query; // Get the subjectId from the query parameter
  
  const { userProgress, loading: progressLoading = false, error: progressError = null } =
    useSelector((state: RootState) => state.progress || {});

  const { chapters, loading: chaptersLoading, error: chaptersError } = useSelector(
    (state: RootState) => state.chapters
  );

  const { subjects, loading: subjectsLoading, error: subjectsError } = useSelector(
    (state: RootState) => state.subjects
  );

  const [visibleChapters, setVisibleChapters] = useState<any[]>([]);
  const [currentSubject, setCurrentSubject] = useState<{ name: string; tagline: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);

      if (parsedData.user_class) {
        dispatch(fetchSubjectsByClassId(parsedData.user_class));
      }

      if (parsedData.id) {
        dispatch(fetchUserProgress(parsedData.id));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchChaptersBySubjectId(subjectId as string));
    }
  }, [dispatch, subjectId]);

  useEffect(() => {
    if (chapters.length > 0) {
      setVisibleChapters(chapters.slice(0, 4)); // Show first 4 chapters initially
    }
  }, [chapters]);

  useEffect(() => {
    if (subjectId && subjects.length > 0) {
      const subject = subjects.find((sub) => sub.id === subjectId);
      if (subject) {
        setCurrentSubject({ name: subject.name, tagline: subject.tagline });
      }
    }
  }, [subjects, subjectId]);

  const handleViewMore = () => {
    setVisibleChapters(chapters); // Show all chapters when "View More" is clicked
  };

  // Helper function to find progress by chapter_id
  const getChapterProgress = (chapterId: string): number => {
    if (!userProgress || !userProgress.subjects) return 0;
    const subjectData = userProgress.subjects.find(
      (subject: any) => subject.subject_id === subjectId
    );
    const chapterData = subjectData?.chapters.find(
      (chapter: any) => chapter.chapter_id === chapterId // Corrected to use `chapter_id`
    );
    return chapterData ? chapterData.chapter_progress || 0 : 0;
  };

  if (chaptersLoading || subjectsLoading) return <div>Loading...</div>;
  if (chaptersError) return <div>Error: {chaptersError}</div>;
  if (subjectsError) return <div>Error: {subjectsError}</div>;

  return (
    <>
      <Layout>
        <div className="">
          <Sidebar />
        </div>

        <section className="w-full lg:ml-64 container mx-auto px-4">
          <GreetingBar />
          {currentSubject && (
            <div className="p-4 mt-4">
              <h2 className="text-2xl font-bold text-black">{currentSubject.name}</h2>
              <p className="text-md text-gray-700">{currentSubject.tagline}</p>
            </div>
          )}
          <div className="flex w-full justify-end">
            {chapters.length > 4 && visibleChapters.length < chapters.length && (
              <button
                onClick={handleViewMore}
                className="py-2 px-4 flex justify-center items-center text-stone font-semibold rounded-md gap-2 hover:text-sky-500 transition-all"
              >
                <div>View More</div>
                <div className="flex">
                  <IoChevronForward size={16} />
                  <IoChevronForward size={16} />
                </div>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {visibleChapters.map((chapter: any, index: number) => (
              <div
                key={index}
                className="flex w-full border-l-4 justify-between border-red-400 bg-red-50 border rounded-lg p-4 hover:shadow transition-shadow"
              >
                <div className="">
                <p>
                  Chapter:<span className="px-2">{index + 1}</span>
                </p>
                <h4 className="text-xl text-black font-semibold">{chapter.name}</h4>
                <p className="text-sm text-black">{chapter.description}</p>
                <div className="flex-col">
                  <button
                    onClick={() =>
                      router.push(`/TopicList?subjectId=${subjectId}&chapterId=${chapter.id}`)
                    }
                    className="py-2 text-sky-400 font-semibold tracking-widest underline"
                  >
                    Let's Start
                  </button>
                </div>

                </div>
               <div  className="justify-center items-center">
                <div className="flex w-16 mx-auto ">
                <Circle
                  percent={parseFloat(getChapterProgress(chapter.id).toFixed(2))}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor="#63A7D4"
                  trailColor="#CDE6F7"
                />
                </div>
                <div className="flex w-full text-pink-500 justify-end"><span> Percentage:{parseFloat(getChapterProgress(chapter.id).toFixed(2))} %</span> </div>
                </div>
                
               </div>
              
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ChapterScreen;
