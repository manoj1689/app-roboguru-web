import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMixedQuestions } from "../../redux/slices/mixedQuestionSlice";
import { setExamData } from "../../redux/slices/examAnalysisSlice";
import Layout from "@/components/HomeLayout";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImStopwatch } from "react-icons/im";
import { IoIosWifi } from "react-icons/io";
import { FaEyeSlash, FaCheckCircle, FaClock, FaSyncAlt } from "react-icons/fa";
const ExamOptions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const chapterId = searchParams?.get("chapterId") || "";
  const subjectId = searchParams?.get("subjectId") || "";
  const topicId = searchParams?.get("topicId") || "";

  const [className, setClassName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [topicName, setTopicName] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const { response, status, error } = useSelector((state: RootState) => state.mixedQuestionExam);
  const { classes } = useSelector((state: RootState) => state.class);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { profile } = useSelector((state: RootState) => state.profile);
  useEffect(() => {

    if (profile?.user_class && classes?.length > 0) {
      const foundClass = classes.find((cls: any) => cls.id === profile.user_class);
      setClassName(foundClass ? foundClass.name : "Unknown Class");
    }
    setSubjectName(subjects.find(subject => subject.id === subjectId)?.name || "Unknown Subject");
    setChapterName(chapters.find(chapter => chapter.id === chapterId)?.name || "Unknown Chapter");
    setTopicName(topics.find(topic => topic.id === topicId)?.name || "Unknown Topic");
  }, [classes, subjects, chapters, topics, subjectId, chapterId, topicId,profile]);

  useEffect(() => {
    const params = {
      class_name: className,
      subject_name: subjectName,
      chapters: [
        {
          chapter_name: chapterName,
          topics: [topicName],
        },
      ],
      num_questions: 5,
      difficulty: "medium",
      question_distribution: {
        objective: 2,
        true_false: 2,
        descriptive: 1,
      },
    };

    dispatch(fetchMixedQuestions(params));
  }, [className, subjectName, chapterName, topicName, dispatch]);

  const handleStartExam = () => {
    if (response) {
      dispatch(setExamData({
        examId: response.data.exam_id,
        examTitle: response.data.exam_title,
        questions: response.data.questions,
      }));
      router.push("/mixedExam");
    }
  };
  const goBack = () => {
    router.back(); // Goes one step back in history
  };
  return (
    <Layout>
      <div className="p-4 container mx-auto border shadow-lg rounded-lg">
        <div className="flex gap-4 w-full  ">

          <div className="p-4">
            <FaArrowLeftLong size={25} color="black" onClick={goBack} className="hover:cursor-pointer" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">Please Read Carefully</h2>
            <p className="text-md text-gray-700">Ensure a fair, smooth exam. Plan time wisely—just like a real board test!</p>
          </div>

        </div>
        <div className="mt-4 ">
          <span className="font-semibold italic">This is an online exam, and you will attempt all questions directly on this platform.</span>
        </div>
        <ul className="ml-6 mt-2 space-y-4">
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <ImStopwatch />
              Exam Duration:
            </strong>
            30 minutes. The countdown timer starts as soon as you begin.
          </li>
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <IoIosWifi />
              Answer Online:
            </strong>
            Select or type answers in the provided fields. No external writing or uploads are needed.
          </li>
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <FaEyeSlash />
              Hiding Answers:
            </strong>
            Correct answers are hidden during the exam and will be revealed after submission.
          </li>
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <FaCheckCircle />
              Submission is Final:
            </strong>
            Once you submit, your answers cannot be changed.
          </li>
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <FaClock />
              Review After Submission:
            </strong>
            After submission, you will see your answers, the correct answers, and your final score.
          </li>
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <IoIosWifi />
              Stable Internet Required:
            </strong>
            If your connection drops, reconnect quickly. The timer continues running.
          </li>
          <li className="flex gap-2">
            <strong className="flex gap-2 items-center">
              <FaSyncAlt />
              Time Management:
            </strong>
            Ensure you answer all questions before the timer ends.
          </li>
        </ul>
        <div className="flex flex-col p-4 my-4 rounded-lg bg-[#E1F3FF] ">
          <p className="text-gray-700 mt-4 font-semibold">Important Reminders:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Read all questions carefully before answering.</li>
            <li>Once submitted, the exam is finalized and cannot be retaken.</li>
            <li>For assistance, use <strong>Live Chat</strong> or call support immediately. The clock keeps ticking!</li>
          </ul>
        </div>


        {status === "loading" && <p className="mt-4 text-gray-600 font-semibold flex justify-center items-center">Loading questions...</p>}
        {status === "failed" && <p className="mt-4 text-red-600">{error || "Failed to load questions."}</p>}

        {status !== "loading" && response && (
          <div className="mt-6  border p-4 rounded-lg shadow-lg bg-blue-100">
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Exam Ready!</h2>
            <p className="text-gray-700"><strong>Title:</strong> {response.data.exam_title}</p>
            <p className="text-gray-700"><strong>Topic:</strong> {response.data.topic_name}</p>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="readInstructions"
                className="mr-2"
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label htmlFor="readInstructions" className="text-gray-700">I have read & understood these instructions.</label>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                onClick={handleStartExam}
                disabled={!checked}
              >
                Start Exam
              </button>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExamOptions;

