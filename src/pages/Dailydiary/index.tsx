import { useState } from 'react';
import Layout from '@/components/HomeLayout';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);




export default function DailyDairy() {
    const router = useRouter();
    const handleNavigation = (path: string) => {
        // Navigate to the selected page
        router.push(path);
    }
  const [chatLog, setChatLog] = useState([
    { role: 'AI', text: "Hi! Let’s create your daily diary. What did you learn today?" },
    { role: 'User', text: 'I learned about Python loops and how to use them efficiently.' },
    { role: 'AI', text: "That’s great! What challenges did you face while learning about loops?" },
    { role: 'User', text: 'I struggled with nested loops at first.' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [diaryPreview, setDiaryPreview] = useState({
    summary: "Today, I focused on Python programming, specifically understanding loops and their use cases.",
    challenges: "Initially struggled with nested loops but resolved the issues using tutorials and practice.",
    reflection: "Overall, I feel accomplished. I learned a lot and overcame some difficult topics.",
  });

  const sampleResponses = [
    "That's great! What challenges did you face today?",
    "How did you feel about your progress?",
    "What would you like to improve tomorrow?",
  ];

  const handleSend = () => {
    if (userMessage.trim()) {
      const newChatLog = [...chatLog, { role: 'User', text: userMessage }];
      const aiResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      newChatLog.push({ role: 'AI', text: aiResponse });
      setChatLog(newChatLog);

      setDiaryPreview({
        ...diaryPreview,
        summary: `You: ${userMessage}`,
        reflection: `AI: ${aiResponse}`,
      });
      setUserMessage('');
    }
  };

  const progressData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Productivity Score (%)',
        data: [75, 80, 85, 90, 95],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Learning Hours',
        data: [4, 5, 5, 6, 5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="bg-gray-50 text-gray-800">
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
                        <h1 className="text-5xl font-bold text-center mb-4">AI Daily Diary</h1>
                        <p className="text-lg leading-relaxed text-center text-stone-800 font-medium mb-8">
                        Let AI guide you in creating insightful daily reflections, tracking progress, and enhancing your productivity.
                        </p>
                    </div>
                </section>

      {/* Main Content */}
      <main className="container mx-auto py-8">
      
        {/* AI Chatbot Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Chat with AI to Create Your Diary</h2>
          <div className="bg-gray-100 p-4 rounded-lg h-60 overflow-y-auto">
            {chatLog.map((message, index) => (
              <p key={index} className={`text-sm ${message.role === 'User' ? 'text-right text-violet-600' : 'text-left'}`}>
                {message.role}: {message.text}
              </p>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type your response here..."
              className="flex-grow p-2 border rounded-l-lg"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="bg-sky-500 text-white px-4 py-2 rounded-r-lg hover:bg-sky-700"
            >
              Send
            </button>
          </div>
        </section>

        {/* Diary Draft Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Diary Draft</h2>
          <div className="bg-gray-100 p-4 rounded-lg h-40 overflow-y-auto">
            <h3 className="text-lg font-semibold">Draft Summary:</h3>
            <p className="text-sm">{diaryPreview.summary}</p>
            <p className="text-sm mt-2"><strong>Reflection:</strong> {diaryPreview.reflection}</p>
          </div>
          <div className="mt-4 text-right">
            <button className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500">Submit Diary</button>
          </div>
        </section>

        {/* Progress Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Track Your Learning Journey</h2>
          <div className="relative">
            <Line data={progressData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </section>
      </main>

            </Layout>
    
 
    </div>
  );
}
