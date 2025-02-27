import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { selectTrueFalseAnswer, submitTrueFalseExam, resetTrueFalseExam } from "../../redux/slices/trueFalseExamSlice";

const TrueFalseExamPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { examTitle, questions, userAnswers, totalMarks, score, status } = useSelector((state: RootState) => state.trueFalseExam);

  if (!examTitle) {
    return <div className="text-center text-xl font-bold mt-10">No Exam Data Available</div>;
  }

  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{examTitle}</h1>

      {status === "submitted" ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Exam Submitted!</h2>
          <p className="text-lg">
            Your Score: <span className="font-bold">{score} / {totalMarks}</span>
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => dispatch(resetTrueFalseExam())}
          >
            Retry Exam
          </button>
        </div>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q.id} className="mb-6 p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{q.text}</h3> {/* ✅ True/False Question Text */}
              <div className="space-y-2">
                <label className="block p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value="true"
                    checked={userAnswers[q.id] === true}
                    onChange={() => dispatch(selectTrueFalseAnswer({ questionId: q.id, answer: true }))}
                    className="mr-2"
                  />
                  True
                </label>

                <label className="block p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value="false"
                    checked={userAnswers[q.id] === false}
                    onChange={() => dispatch(selectTrueFalseAnswer({ questionId: q.id, answer: false }))}
                    className="mr-2"
                  />
                  False
                </label>
              </div>
            </div>
          ))}

          <button
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 block mx-auto"
            onClick={() => dispatch(submitTrueFalseExam())}
          >
            Submit Exam
          </button>
        </>
      )}
    </div>
  );
};

export default TrueFalseExamPage;
