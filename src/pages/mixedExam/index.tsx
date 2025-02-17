import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { resetExam, selectAnswer, submitExam } from "../../redux/slices/examAnalysisSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import Layout from "@/components/HomeLayout";
const ExamSheet: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { examTitle, questions, userAnswers, status } = useSelector(
    (state: RootState) => state.examAnalysis
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    dispatch(selectAnswer({ questionId, answer: value }));
  };

  const handleSubmit = () => {
    dispatch(submitExam());
  };
  const goBack = () => {
    router.back(); // Goes one step back in history
  };
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex ">
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


        {examTitle && <div className="flex w-full mt-4 text-xl bg-[#CBEBF6] justify-center  items-center font-bold mb-4 p-4">{examTitle} (5 Questions)</div>}

        {status !== "submitted" ? (
          <div className="mt-6">

            <ul className="mt-2">
              {questions.map((q, index) => (
                <li key={`${q.id}-${index}`} className="mt-4 p-4 border rounded-lg">
                  <label className="flex text-md font-semibold">{q.type}</label>
                  <div className="flex justify-between"><span><strong>{q.id}: </strong> {q.text}</span><span>{q.marks} marks</span></div>
                  {q.type === "objective" && q.options && (

                    <ul className=" ">

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
                  {q.type === "fill_in_blank" && (
                    <input
                      type="text"
                      className="border p-2 rounded my-4"
                      placeholder="Your answer"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    />
                  )}
                  {q.type === "true_false" && (
                    <div>
                      <label className=" flex gap-2">
                        <input
                          type="radio"
                          name={q.id}
                          value="true"
                          checked={answers[q.id] === "true"}
                          onChange={() => handleAnswerChange(q.id, "true")}
                        />
                        True
                      </label>
                      <label className="flex gap-2">
                        <input
                          type="radio"
                          name={q.id}
                          value="false"
                          checked={answers[q.id] === "false"}
                          onChange={() => handleAnswerChange(q.id, "false")}
                        />
                        False
                      </label>
                    </div>
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

        {status !== "submitted" && (
          <button
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit Exam
          </button>
        )}

        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-4"
          onClick={() => dispatch(resetExam())}
        >
          Reset Exam
        </button>
      </div>

    </Layout>

  );
};

export default ExamSheet;
