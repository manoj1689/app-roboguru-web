import { useState } from 'react';
import Layout from '@/components/HomeLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";

const questions = [
    { id: 1, text: "What is 2 + 2?" },
    { id: 2, text: "Simplify: 5x - 3x." },
    { id: 3, text: "Solve for x: x/3 = 6." },
    { id: 4, text: "What is the square root of 16?" },
    { id: 5, text: "Find the value: 3^2." },
    { id: 6, text: "Expand: (a + b)^2." },
    { id: 7, text: "Solve: 2x + 3 = 7." },
    { id: 8, text: "What is 10% of 50?" },
    { id: 9, text: "Simplify: (2x)(3x)." },
    { id: 10, text: "What is the reciprocal of 4?" }
];

const index = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

    const [selectedTopic, setSelectedTopic] = useState('Algebra Basics');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
    const [selectedQuestions, setSelectedQuestions] = useState('10');
    const [selectedTimeLimit, setSelectedTimeLimit] = useState('15 minutes');

    const topics = ['Algebra Basics', 'Calculus', 'Geometry', 'Trigonometry'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const questionCounts = ['10', '20', '30', '40', '50'];
    const timeLimits = ['15 minutes', '30 minutes', '45 minutes', '1 hour'];

    const renderQuestion = (index: number) => {
        return questions[index].text;
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setAnswers(newAnswers);
    };

    const handlePrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizSubmitted(true);
        }
    };

    const handleSubmit = () => {
        alert("Quiz submitted! Your responses are saved.");
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Layout>
            <section className="relative bg-center  px-4 text-white py-4" style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-90"></div>
                <div
                    onClick={() => handleNavigation("/Home")}
                    className="flex relative z-10 container mx-auto hover:text-stone-700 font-bold mb-2  items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span><span>Back</span>
                </div>
                <div className="relative z-10 container mx-auto text-center rounded">
                    <h1 className="text-5xl font-bold text-center mb-4">QuizMe: Quick Launch</h1>
                    <p className="text-lg leading-relaxed text-center text-stone-800 font-medium mb-8">
                        Challenge yourself with interactive quizzes and track your performance.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto py-8">
                {/* Quiz Details */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Quiz Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
                            <select
                                id="topic"
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            >
                                {topics.map((topic) => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty:</label>
                            <select
                                id="difficulty"
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            >
                                {difficulties.map((difficulty) => (
                                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="questions" className="block text-sm font-medium text-gray-700">Total Questions:</label>
                            <select
                                id="questions"
                                value={selectedQuestions}
                                onChange={(e) => setSelectedQuestions(e.target.value)}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            >
                                {questionCounts.map((count) => (
                                    <option key={count} value={count}>{count}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="time-limit" className="block text-sm font-medium text-gray-700">Time Limit:</label>
                            <select
                                id="time-limit"
                                value={selectedTimeLimit}
                                onChange={(e) => setSelectedTimeLimit(e.target.value)}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            >
                                {timeLimits.map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Question Navigator */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Questions</h2>
                    <div className="flex flex-wrap gap-2">
                        {questions.map((q, idx) => (
                            <button
                                key={q.id}
                                className={`px-4 py-2 border rounded-lg ${idx === currentQuestionIndex ? "bg-red-400 text-white" : "bg-gray-100 text-gray-800"}`}
                                onClick={() => setCurrentQuestionIndex(idx)}
                            >
                                {q.id}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Interactive Quiz Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Quiz</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-gray-800">{renderQuestion(currentQuestionIndex)}</p>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Your Answer:</label>
                            <input
                                id="answer"
                                type="text"
                                value={answers[currentQuestionIndex]}
                                onChange={handleAnswerChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrev}
                                className="bg-stone-600 text-white px-6 py-2 rounded hover:bg-stone-700 disabled:opacity-50"
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500"
                            >
                                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Quiz Summary and Submission */}
                {isQuizSubmitted && (
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Summary</h2>
                        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
                            {questions.map((q, idx) => (
                                <div key={q.id} className="p-4 bg-white border rounded-lg">
                                    <p><strong>Q{q.id}:</strong> {q.text}</p>
                                    <p><strong>Your Answer:</strong> {answers[idx] || "No answer"}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-right mt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Submit Quiz
                            </button>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default index;
