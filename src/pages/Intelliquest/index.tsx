import React, { useState } from 'react';
import Layout from '@/components/HomeLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";

const QuestionSetBuilder = () => {
    const router = useRouter();
    const [questions, setQuestions] = useState<string[]>([]);
    const [numQuestions, setNumQuestions] = useState<number>(10);
    const [difficultyLevel, setDifficultyLevel] = useState<string>('Easy');
    const [subjectCategory, setSubjectCategory] = useState<string>('');
    const [questionType, setQuestionType] = useState<string>('Multiple Choice');
    const [tagsKeywords, setTagsKeywords] = useState<string>('');
    const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
    const [timePerQuestion, setTimePerQuestion] = useState<number>(5);
    const [document, setDocument] = useState<File | null>(null);
    const [manualQuestions, setManualQuestions] = useState<string>('');

    const handleGenerateQuestions = () => {
        // Implement logic for generating questions based on the form inputs
        setQuestions([
            'Sample Question 1',
            'Sample Question 2',
            'Sample Question 3',
        ]);
    };

    const handleNavigation = (path: string) => {

        // Navigate to the selected page
        router.push(path);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDocument(file);
        }
    };

    const handleSpeechInput = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(manualQuestions || "No question provided");
        utterance.pitch = 1;
        utterance.rate = 1;
        synth.speak(utterance);
    };

    return (
        <Layout>
            <section className="relative bg-center mt-20 px-4 text-white py-8" style={{ backgroundImage: 'url(/images/subjectNavigation.png)' }}>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-90"></div>
                <div
                    onClick={() => handleNavigation("/Home")}
                    className="flex relative z-10 container mx-auto hover:text-stone-700 font-bold mb-4 gap-3 items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span><span>Back</span>
                </div>
                <div className="relative z-10 container mx-auto text-center rounded">
                    <h1 className="text-5xl font-bold text-center mb-6">Question Set Builder</h1>
                    <p className="text-lg leading-relaxed text-center text-black font-medium mb-8">
                    Generate comprehensive question sets manually or by uploading documents to enhance your teaching and parenting experience.
                    </p>
                </div>
            </section>
            <main className="container mx-auto py-8">
              
                {/* Informational Notes Section */}
                <section className="mb-8">
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Create Efficiently!</strong>
                        <span className="block sm:inline">Use the tools below to create and manage your question sets seamlessly.</span>
                    </div>
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Note:</strong>
                        <span className="block sm:inline">For document uploads, only plain text files (.txt) are supported in this demo.</span>
                    </div>
                </section>

                {/* Create Question Sets Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Manual Input Section */}
                        <div className="relative">
                            <h3 className="text-lg font-semibold mb-2">Manual Input</h3>
                            <textarea
                                id="manual-questions"
                                rows={6}
                                placeholder="Type your questions here..."
                                value={manualQuestions}
                                onChange={(e) => setManualQuestions(e.target.value)}
                                className="w-full p-4 border rounded-lg shadow-sm focus:ring-blue-600 focus:border-blue-600"></textarea>
                            <button
                                id="speech-manual"
                                onClick={handleSpeechInput}
                                className="absolute right-4 bottom-4 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                aria-label="Start Speaking for Manual Input">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v5m0 0H9m3 0h3M5 11a7 7 0 0114 0v3a7 7 0 11-14 0v-3z" />
                                </svg>
                            </button>
                        </div>

                        {/* Document Upload Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
                            <input type="file" id="upload-document" accept=".txt" className="hidden" onChange={handleFileUpload} />
                            <label htmlFor="upload-document"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Upload Text File</span>
                            </label>
                            <p className="text-sm text-gray-600 mt-2">Accepted formats: .txt</p>
                        </div>
                    </div>

                    {/* Configuration Options */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="num-questions" className="block text-sm font-medium text-gray-700">Number of Questions</label>
                            <input type="number" id="num-questions" min={1} max={100} value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600" placeholder="Enter number of questions" />
                        </div>
                        <div>
                            <label htmlFor="difficulty-level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                            <select id="difficulty-level" value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subject-category" className="block text-sm font-medium text-gray-700">Subject/Category</label>
                            <input type="text" id="subject-category" value={subjectCategory} onChange={(e) => setSubjectCategory(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600" placeholder="e.g., Mathematics, Science" />
                        </div>
                        <div>
                            <label htmlFor="question-type" className="block text-sm font-medium text-gray-700">Question Type</label>
                            <select id="question-type" value={questionType} onChange={(e) => setQuestionType(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600">
                                <option>Multiple Choice</option>
                                <option>True/False</option>
                                <option>Short Answer</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="tags-keywords" className="block text-sm font-medium text-gray-700">Tags/Keywords</label>
                            <input type="text" id="tags-keywords" value={tagsKeywords} onChange={(e) => setTagsKeywords(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600" placeholder="e.g., Algebra, Photosynthesis" />
                        </div>
                        <div className="md:col-span-2 flex items-center">
                            <input type="checkbox" id="shuffle-questions" checked={shuffleQuestions} onChange={(e) => setShuffleQuestions(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="shuffle-questions" className="ml-2 block text-sm text-gray-700">Shuffle Questions</label>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="time-per-question" className="block text-sm font-medium text-gray-700">Time per Question (minutes)</label>
                            <input type="number" id="time-per-question" min={0} max={120} value={timePerQuestion} onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600" placeholder="Enter time limit per question" />
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="mt-6 text-center">
                        <button id="generate-questions" onClick={handleGenerateQuestions}
                            className="bg-red-400 text-white px-8 py-3 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Generate Question Sets
                        </button>
                    </div>

                    {/* Display Generated Questions */}
                    <div id="question-sets-section" className="mt-6 hidden">
                        <h3 className="text-xl font-semibold mb-4">Generated Question Sets</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">#</th>
                                        <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Question</th>
                                    </tr>
                                </thead>
                                <tbody id="question-sets-table-body">
                                    {questions.map((question, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{question}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Export Button */}
                        <div className="mt-4 text-right">
                            <button id="export-question-sets"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                Export as CSV
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>

    );
};

export default QuestionSetBuilder;
