import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { selectAnswer, submitExam, resetExam } from "../../redux/slices/examAnalysisSlice";

const ExamPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { examTitle, questions, userAnswers,totalMarks, score, status } = useSelector((state: RootState) => state.examAnalysis);

  if (!examTitle) {
    return <div className="text-center text-xl font-bold mt-10">No Exam Data Available</div>;
  }
  console.log("question list at exam Page", questions)
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{examTitle}</h1>

      {status === "submitted" ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Exam Submitted!</h2>
          <p className="text-lg">Your Score: <p>Score: {score} / {totalMarks}</p></p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => dispatch(resetExam())}
          >
            Retry Exam
          </button>
        </div>
      ) : (
        <>
          {questions.map((q:any) => (
            <div key={q.id} className="mb-6 p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{q.text}</h3> {/* Use `q.text` instead of `q.question` */}
              <div className="space-y-2">
                {q.options.map((option:any, index:any) => (
                  <label key={index} className="block p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={userAnswers[q.id] === option}
                      onChange={() => dispatch(selectAnswer({ questionId: q.id, answer: option }))}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}



          <button
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 block mx-auto"
            onClick={() => dispatch(submitExam())}
          >
            Submit Exam
          </button>
        </>
      )}
    </div>
  );
};

export default ExamPage;
