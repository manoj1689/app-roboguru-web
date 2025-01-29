import React, { useState } from 'react';
import Layout from '@/components/HomeLayout';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';

const SmartGrader = () => {
  const router = useRouter()
  const [questions, setQuestions] = useState('');
  const [answers, setAnswers] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
  };
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Evaluation Results', 20, 20);

    const results = [
      ['Question', 'Status', 'Marks', 'Feedback'],
      ['Q1: What is the capital of France?', 'Correct', 'Full marks', 'Excellent work! Your answer is accurate and well-articulated.'],
      ['Q2: Explain Newton\'s Second Law.', 'Partially Correct', '3/5 marks', 'Good attempt. Consider elaborating on the relationship between force, mass, and acceleration.'],
      ['Q3: Solve the equation x² - 4 = 0.', 'Incorrect', '0 marks', 'The solution is x = 2 and x = -2. Review the factoring method.']
    ];

    let yPosition = 30;
    results.forEach((row, index) => {
      doc.text(row.join('  '), 20, yPosition);
      yPosition += 10;
    });

    doc.save('evaluation_results.pdf');
  };

  // Data for CSV export
  const csvData = [
    ['Question', 'Status', 'Marks', 'Feedback'],
    ['Q1: What is the capital of France?', 'Correct', 'Full marks', 'Excellent work! Your answer is accurate and well-articulated.'],
    ['Q2: Explain Newton\'s Second Law.', 'Partially Correct', '3/5 marks', 'Good attempt. Consider elaborating on the relationship between force, mass, and acceleration.'],
    ['Q3: Solve the equation x² - 4 = 0.', 'Incorrect', '0 marks', 'The solution is x = 2 and x = -2. Review the factoring method.']
  ];

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
          <h1 className="text-5xl font-bold text-center mb-4">Smart Grader</h1>
          <p className="text-lg leading-relaxed text-center text-stone-800 font-medium mb-8">
            Use AI-powered grading tools to scan, upload, or type your questions and answers for instant evaluation.
          </p>
        </div>
      </section>
      <main className="container mx-auto py-8">

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Input Your Questions and Answers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <h3 className="text-lg font-semibold mb-2">Questions</h3>
              <textarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                rows={6}
                placeholder="Type your questions here..."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div className="relative">
              <h3 className="text-lg font-semibold mb-2">Answers</h3>
              <textarea
                value={answers}
                onChange={(e) => setAnswers(e.target.value)}
                rows={6}
                placeholder="Type your answers here..."
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </section>

        {showResults && (
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Evaluation Results</h2>

            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={generatePDF}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Export PDF
                </button>

                <CSVLink
                  data={csvData}
                  filename="evaluation_results.csv"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Export CSV
                </CSVLink>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Question</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Marks</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Q1: What is the capital of France?</td>
                    <td className="py-2 px-4 border-b border-gray-200">Correct</td>
                    <td className="py-2 px-4 border-b border-gray-200">Full marks</td>
                    <td className="py-2 px-4 border-b border-gray-200">Excellent work! Your answer is accurate and well-articulated.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Q2: Explain Newton's Second Law.</td>
                    <td className="py-2 px-4 border-b border-gray-200">Partially Correct</td>
                    <td className="py-2 px-4 border-b border-gray-200">3/5 marks</td>
                    <td className="py-2 px-4 border-b border-gray-200">Good attempt. Consider elaborating on the relationship between force, mass, and acceleration.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Q3: Solve the equation x² - 4 = 0.</td>
                    <td className="py-2 px-4 border-b border-gray-200">Incorrect</td>
                    <td className="py-2 px-4 border-b border-gray-200">0 marks</td>
                    <td className="py-2 px-4 border-b border-gray-200">The solution is x = 2 and x = -2. Review the factoring method.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

    </Layout>

  );
};

export default SmartGrader;
