import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchObjectiveQuestions,
  fetchTrueFalseQuestions,
  fetchFillInBlankQuestions,
  fetchDescriptiveQuestions,
  fetchMixedQuestions,
} from "../../redux/slices/examModuleSlice";
import { setExamData } from "../../redux/slices/examAnalysisSlice";
import {  setTrueFalseExamData } from "../../redux/slices/trueFalseExamSlice";

const ExamOptions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const chapterId = searchParams?.get("chapterId") || "";
  const subjectId = searchParams?.get("subjectId") || "";
  const topicId = searchParams?.get("topicId") || "";

  const [subjectName, setSubjectName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [topicName, setTopicName] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [examTitle, setExamTitle] = useState<string | null>(null);
  const [examDuration, setExamDuration] = useState<number | null>(null);
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null); // ✅ Store selected type

  const { classes } = useSelector((state: RootState) => state.class);
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const { status } = useSelector((state: RootState) => state.examModule);

  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.user_class && classes.length > 0) {
        const foundClass = classes.find((cls) => cls.id === parsedData.user_class);
        setClassName(foundClass ? foundClass.name : "Unknown Class");
      }
    }
  }, [classes]);

  useEffect(() => {
    if (subjectId && subjects.length > 0) {
      const foundSubject = subjects.find((subject) => subject.id === subjectId);
      setSubjectName(foundSubject ? foundSubject.name : "Unknown Subject");
    }
    if (chapterId && chapters.length > 0) {
      const foundChapter = chapters.find((chapter) => chapter.id === chapterId);
      setChapterName(foundChapter ? foundChapter.name : "Unknown Chapter");
    }
    if (topicId && topics.length > 0) {
      const foundTopic = topics.find((topic) => topic.id === topicId);
      setTopicName(foundTopic ? foundTopic.name : "Unknown Topic");
    }
  }, [subjectId, chapterId, topicId, subjects, chapters, topics]);

  const handleFetchQuestions = async (type: string) => {
    setSelectedExamType(type); // ✅ Store selected exam type
  
    const params = {
      class_name: className,
      subject_name: subjectName,
      chapter_name: chapterName,
      topic_name: topicName,
      num_questions: 5,
      difficulty: "hard",
    };
  
    let response: any;
    switch (type) {
      case "objective":
        response = await dispatch(fetchObjectiveQuestions(params)).unwrap();
        if (response && response.success) {
          dispatch(
            setExamData({
              examId: response.data.exam_id,
              examTitle: response.data.exam_title,
              questions: response.data.questions,
            })
          );
        }
        break;
  
      case "true_false":
        response = await dispatch(fetchTrueFalseQuestions(params)).unwrap();
        if (response && response.success) {
          dispatch(
            setTrueFalseExamData({
              examId: response.data.exam_id,
              examTitle: response.data.exam_title,
              questions: response.data.questions,
            })
          );
        }
        break;
  
      case "fill_in_blank":
        response = await dispatch(fetchFillInBlankQuestions(params)).unwrap();
        if (response && response.success) {
          dispatch(
            setExamData({
              examId: response.data.exam_id,
              examTitle: response.data.exam_title,
              questions: response.data.questions,
            })
          );
        }
        break;
  
      case "descriptive":
        response = await dispatch(fetchDescriptiveQuestions(params)).unwrap();
        if (response && response.success) {
          dispatch(
            setExamData({
              examId: response.data.exam_id,
              examTitle: response.data.exam_title,
              questions: response.data.questions,
            })
          );
        }
        break;
  
      case "mixed":
        response = await dispatch(fetchMixedQuestions(params)).unwrap();
        if (response && response.success) {
          dispatch(
            setExamData({
              examId: response.data.exam_id,
              examTitle: response.data.exam_title,
              questions: response.data.questions,
            })
          );
        }
        break;
    }
  
    if (response && response.success) {
      setExamTitle(response.data.exam_title);
      setExamDuration(response.data.duration || 30); // Default 30 mins if no duration provided
    }
  };
  

  const handleStartExam = () => {
    if (!selectedExamType) return;

    const routes: Record<string, string> = {
      objective: "/ObjectiveExam",
      true_false: "/TrueFalseExam",
      fill_in_blank: "/fillInBlankExam",
      descriptive: "/descriptiveExam",
      mixed: "/mixedExam",
    };

    const route = routes[selectedExamType] || "/objectiveExam";
    router.push(route); // ✅ Dynamically navigate based on exam type
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Exam Type</h1>
      <div className="grid grid-cols-3 gap-4">
        {["objective", "true_false", "fill_in_blank", "descriptive", "mixed"].map((type) => (
          <button
            key={type}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => handleFetchQuestions(type)}
          >
            {type.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {status === "loading" && <p className="mt-4 text-gray-600">Loading questions...</p>}
      {status === "failed" && <p className="mt-4 text-red-600">Failed to load questions.</p>}

      {examTitle && (
        <div className="mt-6 border p-4 rounded-lg shadow-lg bg-green-100">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Exam Ready!</h2>
          <p className="text-gray-700">
            <strong>Title:</strong> {examTitle}
          </p>
          <p className="text-gray-700">
            <strong>Duration:</strong> {examDuration} minutes
          </p>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleStartExam}
          >
            Start Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamOptions;
