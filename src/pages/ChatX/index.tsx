import { useState, useEffect } from "react";
import Layout from "@/components/HomeLayout";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

export default function ChatPage() {
    const router = useRouter()
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hello! I’m RoboGuru. How can I help you today?", time: "10:02 AM" },
        { sender: "user", text: "I have a question about the Pythagorean theorem. Can you explain it?", time: "10:03 AM" },
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const sendMessage = (e: any) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const newMessage = { sender: "user", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages([...messages, newMessage]);
        setInput("");

        // Simulate AI response
        setIsThinking(true);
        setTimeout(() => {
            const aiMessage = {
                sender: "ai",
                text: "Sure! The Pythagorean theorem states that in a right-angled triangle, c² = a² + b². Let me know if you want more details!",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            setIsThinking(false);
        }, 2000);
    };
    const handleNavigation = (path: string) => {
        // Navigate to the selected page
        router.push(path);
    };

    return (

        <div className="flex flex-col  h-screen">
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
                        <h1 className="text-5xl font-bold text-center mb-4">AI Chat</h1>
                        <p className="text-lg leading-relaxed text-center text-stone-800 font-medium mb-8">
                            Chat with <span className="text-white font-semibold">RoboGuru</span> , your personal AI assistant.
                            Ask anything, learn more, and explore the possibilities of AI-powered education.
                        </p>
                    </div>
                </section>
                {/* Chat History */}
                <div className="container mx-auto my-4 max-h-[480px] flex flex-col  overflow-y-auto p-4 bg-white rounded shadow-md chat-scrollbar">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start mb-4 ${msg.sender === "user" ? "justify-end" : ""}`}
                        >
                            {msg.sender === "ai" && (
                                <img
                                    src="https://picsum.photos/36/36?random=2"
                                    alt="RoboGuru AI"
                                    className="w-9 h-9 rounded-full mr-3"
                                />
                            )}
                            <div
                                className={`${msg.sender === "ai"
                                        ? "bg-purple-50 rounded-r-lg rounded-bl-lg"
                                        : "bg-red-100 rounded-l-lg rounded-br-lg"
                                    } p-3 max-w-sm text-sm text-gray-800`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-xs text-gray-400 mt-1 inline-block ml-2">{msg.time}</span>
                        </div>
                    ))}

                    {/* AI Thinking */}
                    {isThinking && (
                        <div className="flex items-start mb-4">
                            <img
                                src="https://picsum.photos/36/36?random=2"
                                alt="RoboGuru AI"
                                className="w-9 h-9 rounded-full mr-3"
                            />
                            <div className="bg-purple-50 text-gray-800 p-3 rounded-r-lg rounded-bl-lg max-w-sm flex items-center">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <form onSubmit={sendMessage} className="container mx-auto mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                    />
                    <button
                        type="submit"
                        className="bg-sky-500 text-white text-sm px-4 py-2 rounded hover:bg-sky-600"
                    >
                        Send
                    </button>
                </form>

            </Layout>

        </div>
    );
}
