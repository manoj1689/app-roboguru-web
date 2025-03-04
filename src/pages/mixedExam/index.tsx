import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState ,AppDispatch} from "../../redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { resetExam, selectAnswer, submitExam, setExamData } from "../../redux/slices/examAnalysisSlice";
import { fetchMixedQuestions } from "../../redux/slices/mixedQuestionSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import Layout from "@/components/HomeLayout";

const ExamSheet: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedChapters = searchParams?.get('selectedChapters') || '';
  const selectedTopics = searchParams?.get('selectedTopics') || '';
  const numQuestions = searchParams?.get("numQuestions") || "";
  const difficulty = searchParams?.get("difficulty") || "";
  const timeLimit = searchParams?.get("timeLimit") || "";

  const chapterId = searchParams?.get("chapterId") || "";
  const subjectId = searchParams?.get("subjectId") || "";
  const topicId = searchParams?.get("topicId") || "";

  const [className, setClassName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [topicName, setTopicName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { response, status } = useSelector((state: RootState) => state.mixedQuestionExam);
  const { classes } = useSelector((state: RootState) => state.class);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { examTitle, questions, status: examStatus } = useSelector(
    (state: RootState) => state.examAnalysis
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    dispatch(selectAnswer({ questionId, answer: value }));
  };

  // Fetch class, subject, chapter, and topic names
  useEffect(() => {
    if (profile?.user_class && classes?.length > 0) {
      const foundClass = classes.find((cls: any) => cls.id === profile.user_class);
      setClassName(foundClass ? foundClass.name : "Unknown Class");
    }
    setSubjectName(subjects.find((subject) => subject.id === subjectId)?.name || "Unknown Subject");
    setChapterName(chapters.find((chapter) => chapter.id === chapterId)?.name || "Unknown Chapter");
    setTopicName(topics.find((topic) => topic.id === topicId)?.name || "Unknown Topic");
  }, [classes, subjects, chapters, topics, subjectId, chapterId, topicId, profile]);

  // Fetch mixed questions based on selected class, subject, chapter, and topic
  useEffect(() => {
    if (className && subjectName && selectedChapters && topicName) {
      const params = {
        class_name: className,
        subject_name: subjectName,
        chapters: [
          {
            chapter_name: selectedChapters,
            topics: [selectedTopics],
          },
        ],
        num_questions: Number(numQuestions),
        difficulty: difficulty,
        question_distribution: {
          objective: 2,
          true_false: 2,
          descriptive: 1,
          fill_in_the_blanks:1
        },
      };
      dispatch(fetchMixedQuestions(params));
    }
  }, [className, subjectName, selectedChapters, topicName, dispatch]);

  // Set exam data when response is received
  useEffect(() => {
    if (response?.data) {
      dispatch(setExamData({
        examId: response.data.exam_id,
        examTitle: response.data.exam_title,
        questions: response.data.questions,
      }));
      setLoading(false);
    }
  }, [response, dispatch]);

  const handleSubmit = () => {
    dispatch(submitExam());
  };

  const goBack = () => {
    router.back();
  };
console.log(className,"chapter",chapterName,"sub",subjectName)
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex">
          <div className="p-4">
            <FaArrowLeftLong size={25} color="black" onClick={goBack} className="hover:cursor-pointer" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">Exam Portal</h2>
            <p className="text-lg text-gray-700 italic mt-2">
              "Stay focused, give your best, and trust your preparation. Good luck!"
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-6 text-lg font-semibold text-gray-700">Loading questions...</div>
        ) : examTitle && questions.length > 0 ? (
          <>
            <div className="flex w-full mt-4 text-xl bg-[#CBEBF6] justify-center items-center font-bold mb-4 p-4">
              {examTitle} ({questions.length} Questions)
            </div>

            {examStatus !== "submitted" ? (
              <div className="mt-6">
                <ul className="mt-2">
                  {questions.map((q, index) => (
                    <li key={`${q.id}-${index}`} className="mt-4 p-4 border rounded-lg">
                      <label className="flex text-md font-semibold">{q.type}</label>
                      <div className="flex justify-between">
                        <span>
                          <strong>{q.id}: </strong> {q.text}
                        </span>
                        <span>{q.marks} marks</span>
                      </div>

                      {q.type === "objective" && q.options && (
                        <ul>
                          {q.options.map((option, idx) => (
                            <li key={`${q.id}-option-${idx}`}>
                              <label className="flex gap-2">
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={option}
                                  checked={answers[q.id] === option}
                                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                />
                                {option}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}

                      {q.type === "descriptive" && (
                        <textarea
                          className="border p-2 w-full rounded my-4"
                          placeholder="Write your answer here..."
                          value={answers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">Exam already submitted.</p>
            )}

            {examStatus !== "submitted" && (
              <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleSubmit}>
                Submit Exam
              </button>
            )}

            <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-4" onClick={() => dispatch(resetExam())}>
              Reset Exam
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-center mt-6">No questions found. Please try again.</p>
        )}
      </div>
    </Layout>
  );
};

export default ExamSheet;
