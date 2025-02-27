import { useState } from 'react';
import { BsFillSendFill } from "react-icons/bs";
export default function ChatbotWithStickyButton() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle for chatbot modal

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = { role: 'assistant', content: data.message };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Sticky Button */}
      <div className="fixed bottom-8 right-24 bg-white  px-4 py-2 text-black rounded-full shadow-lg ">
        chat with us
      </div>
      <button
        className="fixed bottom-8 right-4 bg-gray-50 text-white px-2 py-4 rounded-full shadow-lg hover:bg-[#F295BE]"
        onClick={() => setIsChatOpen(true)} // Open the chatbot modal
      >
        <img
          src="./images/chatbot.png"
          alt="chatbot"
          className="w-12 rounded-full"
        />
      </button>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-[90px] sm:bottom-[10px] lg:bottom-[90px] z-50 max-sm:right-4 sm:right-28 lg:right-12 max-w-96 max-h-96 max-sm:max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-60px)]  lg:max-h-[calc(100vh-120px)] h-96 border border-[#63A7D4]  rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="w-full h-full sm:max-w-lg bg-white rounded-t-lg sm:rounded-lg shadow-lg flex flex-col">
            {/* Chat Header */}
            <div className="flex justify-between items-center bg-[#63A7D4] text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-bold">Chatbot</h2>
              <button
                className="text-white text-2xl font-bold hover:text-gray-200"
                onClick={() => setIsChatOpen(false)} // Close the chatbot modal
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 h-96">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar */}
                  {msg.role === 'assistant' && (
                    <img
                      src="./images/chatbot.png" // Path to assistant's avatar
                      alt="Assistant Avatar"
                      className="w-8 rounded-full mr-3"
                    />
                  )}

                  <div>
                    {/* Role Label */}
                    <div className={`text-sm font-semibold mb-1 ${msg.role === 'user' ? 'text-blue-600 text-right' : 'text-gray-600'}`}>
                      {msg.role === 'user' ? 'User' : 'Assistant'}
                    </div>

                    {/* Message Bubble */}
                    <p
                      className={`inline-block px-4 py-2  ${msg.role === 'user' ? 'flex flex-col bg-[#CAE0EF] text-black text-right rounded-b-xl rounded-l-xl ' : 'bg-[#F2F2F2] text-black rounded-b-xl rounded-r-xl '
                        }`}
                    >
                      {msg.content}
                    </p>
                  </div>

                  {/* User Avatar */}
                  {msg.role === 'user' && (
                    <img
                      src="./images/user.png" // Path to user's avatar
                      alt="User Avatar"
                      className="w-12 bg-white  rounded-full ml-3"
                    />
                  )}
                </div>
              ))}
            </div>



            {/* Input and Send Button */}
            <div className="flex items-center p-2 border-t">
              <input
                type="text"
                className="flex-1 border rounded-lg p-2 "
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
              />
              <button
                className="bg-white px-2 py-2 rounded-r"
                onClick={sendMessage}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : <BsFillSendFill size={25} color='#63A7D4'/>}
              </button>
            </div >
            <div className='flex w-full gap-2 pb-2  justify-center items-center'>
            <span className='text-gray-800 text-xs font-semibold'>Sponsored by</span> <span className='text-[#418BBB] font-semibold text-sm'> ERAM LABS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
