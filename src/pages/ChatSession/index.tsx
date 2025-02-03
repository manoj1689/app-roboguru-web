import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchChatHistory } from "../../redux/slices/chatSessionHistorySlice"; // Import the fetchChatHistory thunk
import { RootState, AppDispatch } from '../../redux/store';
import { resetChat } from '../../redux/slices/chatSlice';
import { sendChatQuestion } from '../../redux/slices/chatSlice';
import { MdOutlineMicNone } from "react-icons/md";
import { MdOutlineMicOff } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Markdown from 'react-markdown'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import speakTTS from 'speak-tts'; // Import speak-tts library
import { FaArrowLeft } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoArrowUp } from "react-icons/io5";
import { FaShare } from "react-icons/fa";
import { IoStop } from "react-icons/io5";
import HomeNavbar from "../../components/HomeNavbar"
import "../AiChat/aiResponse.css"
import { useRouter } from "next/router";
import Sidebar from '@/components/Sidebar';
// Initialize speakTTS
const speech = new speakTTS();

speech.init({
  lang: 'en-US',
  volume: 1,
  rate: 1,
  pitch: 1,
  voice: 'Google UK English Female', // Choose a voice or leave as default
}).catch((e) => console.error('Error initializing TTS:', e));

const SessionChatComponent = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();

  // Extract query parameters
  const sessionId = searchParams?.get('sessionId') || '';
  // State for display data and input field
  const [subjectName, setSubjectName] = useState<string>('');
  const [chapterName, setChapterName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [chatSessionHistory, setChatSessionHistory] = useState<{ role: string; content: string }[]>([]);
  const endOfPageRef = useRef<HTMLDivElement | null>(null);

  // State for tracking the currently playing text index
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Fetch chat history from Redux state
  const { chatHistory, loading: chatHistoryLoading, error: chatHistoryError } = useSelector(
    (state: RootState) => state.chatHistory // Correct state reference
  );


  const { chat_history, suggested_questions, loading: chatLoading, error: chatError } = useSelector(
    (state: RootState) => state.chat
  );
  console.log("origal chat Histroy", chat_history)
  // Add chat_history to chatHistory state when it updates
  useEffect(() => {
    if (chat_history && chat_history.length > 0) {
      const lastChat = chat_history[chat_history.length - 1];

      // Add only the last chat with the role 'assistant'
      if (lastChat.role === 'assistant') {
        setChatSessionHistory((prev) => [...prev, { role: 'assistant', content: lastChat.content }]);
      }
    }
  }, [chat_history]);


  // Fetch chat history when sessionId is available
  useEffect(() => {
    if (sessionId) {
      dispatch(fetchChatHistory(sessionId)); // Fetch chat history based on sessionId
    }
  }, [dispatch, sessionId]);
  console.log("session Chat History", chatHistory)

  useEffect(() => {
    if (chatHistory) {
      setClassName(chatHistory.class_name || '');
      setSubjectName(chatHistory.subject_name || '');
      setChapterName(chatHistory.chapter_name || '');
      setTopicName(chatHistory.topic_name || '');
    }
    if (chatHistory && chatHistory.data && chatHistory.data.length > 0) {
      // Map the chatHistory.data to your chatSessionHistory format
      const updatedHistory = chatHistory.data.map((chat: { role: string; content: string }) => ({
        role: chat.role,
        content: chat.content,
      }));

      // Update chatSessionHistory with the new data
      setChatSessionHistory(updatedHistory);
    }
  }, [chatHistory]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSendQuestion = () => {
    const userMessage = { role: 'user', content: transcript || '' || question };

    // If there's no valid input, return early
    if (!userMessage.content.trim()) return;

    const updatedChatHistory = [...chatSessionHistory, userMessage];
    setChatSessionHistory(updatedChatHistory);

    const payload = {
      session_id: sessionId || '',
      class_name: className,
      subject_name: subjectName,
      chapter_name: chapterName,
      topic_name: topicName,
      question: userMessage.content,
      chat_history,
    };



    console.log('Chat payload', payload);
    dispatch(sendChatQuestion(payload));

    // Reset transcript after sending
    setQuestion('')
    resetTranscript();
  };

  const handleSuggestedQuestionClick = (suggestedQuestion: string) => {
    const userMessage = { role: 'user', content: suggestedQuestion };

    const updatedChatHistory = [...chatSessionHistory, userMessage];
    setChatSessionHistory(updatedChatHistory);

    const payload = {
      session_id: sessionId || '',
      class_name: className,
      subject_name: subjectName,
      chapter_name: chapterName,
      topic_name: topicName,
      question: suggestedQuestion,
      chat_history,
    };
    console.log('Chat payload from suggested question', payload);
    dispatch(sendChatQuestion(payload));
  };

  const startListeningHandler = () => {
    // You can pass ListeningOptions if needed, for example:
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    SpeechRecognition.startListening();
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();

  };
  const playText = (text: string, index: number) => {
    // Play the text-to-speech audio
    speech
      .speak({
        text,
        lang: 'en-US',
        volume: 1,
        rate: 1,
        pitch: 1,
      })
      .then(() => {
        setPlayingIndex(null); // Reset after completion
      })
      .catch(() => {
        setPlayingIndex(null); // Handle errors gracefully
      });
    setPlayingIndex(index); // Set the currently playing index
  };



  const scrollToBottom = () => {
    endOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (transcript) {
      setQuestion(transcript); // Update question with transcript text
    }
  }, [transcript]);

  const handleStop = () => {
    speech.cancel(); // Stops the current speech
  };
  console.log("chat History", chatHistory)
  const goBack = () => {
    router.back(); // Goes one step back in history
  };
  return (
    < >
      <div className='flex w-full h-20  fixed bg-white' >
        <HomeNavbar />
      </div>
      <Sidebar />
     <div>

    
      <div className="flex w-full lg:ml-64 bg-orange-400 container mx-auto ">
        <div className="flex w-full mt-20   bg-gradient-to-r from-[#63A7D4] to-[#F295BE] rounded-lg  justify-between items-center p-4">
          <div className='text-white'>
            <p><strong>Class:</strong> {className}</p>
            <p><strong>Subject:</strong> {subjectName}</p>
            <p><strong>Chapter:</strong> {chapterName}</p>

          </div>

        </div>

        <div className="flex w-full  pb-28  rounded-lg"  >
          <div className='flex p-4  justify-between items-center text-center  rounded-lg text-cyan-500 cursor-pointer ' onClick={goBack} >

            <span className='flex gap-2  justify-center items-center'><span><FaArrowLeft size={16} /></span><span>Back</span></span>
            <p><strong>Topic:</strong>{topicName}</p>
            <span><FaShare size={16} /></span>
          </div>
          {(
            <div>

              <div className="space-y-4">
                {chatSessionHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={` px-8 py-2  mx-4 ${entry.role === 'user' ? '' : ''}`}
                    >
                      {entry.role === 'user' ? (
                        <div className="flex flex-col bg-[#CAE0EF] px-4 py-2 text-black text-right rounded-t-xl rounded-l-xl">
                          <p>
                            <Markdown>{entry.content}</Markdown>
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-semibold text-[#4F87CC] pb-2">Ai</div>
                          <div className='flex flex-col bg-gray-100 rounded-lg p-4 '><p>
                            <Markdown>{entry.content}</Markdown>
                          </p>
                            <div className="flex w-full justify-start items-center gap-2  bg-[#F2F2F2] text-black rounded-t-xl rounded-r-xl p-2">
                              {/* Play/Stop Button */}
                              <div>
                                {playingIndex === index ? (
                                  <button onClick={handleStop}>
                                    <HiMiniSpeakerXMark size={25} className="text-[#2b4a70]" />
                                  </button>
                                ) : (
                                  <button onClick={() => playText(entry.content, index)}>
                                    <HiMiniSpeakerWave size={25} className="text-[#4F87CC]" />
                                  </button>
                                )}
                              </div>
                              {/* Like Button */}
                              <div>
                                <AiOutlineLike size={25} className="text-[#4F87CC]" />
                              </div>
                              {/* Dislike Button */}
                              <div>
                                <AiOutlineDislike size={25} className="text-[#4F87CC]" />
                              </div>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                ))}

              </div>
              <div>
                {chatLoading ? (
                  <div className="ai-responding px-8">
                    <span className='text-md font-semibold text-gray-500 '> Ai is typing</span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </div>
                ) : ''}

              </div>

              {suggested_questions.length > 0 && (
                <div>

                  <ul className='flex flex-wrap gap-2 pt-4 px-4'>
                    {suggested_questions.map((suggestedQuestion, index) => (
                      <li
                        key={index}
                        className='border border-[#418BBB] px-4 py-2 rounded-lg bg-[#DCF1FF] cursor-pointer  hover:bg-[#cee6f7] transition'
                        onClick={() => handleSuggestedQuestionClick(suggestedQuestion)}
                      >
                        {suggestedQuestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}


            </div>

          )}

          <div ref={endOfPageRef} />
        </div>




      </div>
      <div className='flex  lg:container mx-auto  w-full lg:ml-64  fixed justify-center  bottom-0 p-4'>
        <button
          onClick={scrollToBottom}
          className="fixed bottom-28 bg-gray-300  p-3 rounded-full shadow-lg hover:bg-gray-400 text-stone-600 transition-all"
        >
          <RiArrowDownSLine size={30} />
        </button>

      </div>

      <div className='flex  lg:container mx-auto  w-full lg:ml-64  fixed justify-center bg-[#f8fafa] bottom-0 p-4'>
        <div className='w-full '>
          <div className='flex w-full bg-gray-200 p-4  rounded-3xl gap-2 justify-center  items-center'>
            <div className='flex w-full bg-white justify-center rounded-lg items-center'>
              <input
                type="text"
                placeholder="Type or use voice input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='w-full px-4 py-2 placeholder:text-gray-600 bg-gray-200 rounded-lg  outline-none'
              />

            </div>
            <span className='flex justify-center items-center'>
              {listening ? (
                <MdOutlineMicOff
                  size={30}
                  onClick={stopListeningHandler}
                  className="cursor-pointer text-stone-800"

                />
              ) : (
                <MdOutlineMicNone
                  size={30}
                  onClick={startListeningHandler}
                  className="cursor-pointer text-stone-800"
                />
              )}
            </span>

            <button onClick={handleSendQuestion} disabled={chatLoading} className='bg-stone-700 p-2 rounded-full hover:bg-stone-800 text-white'>
              {chatLoading ? <IoStop size={20} /> : <IoArrowUp size={20} />}
            </button>
          </div>
        </div>

      </div>

    </div >

   

    </>

  );
};

export default SessionChatComponent;

