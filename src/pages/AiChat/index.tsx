"use client"
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import HomeNavbar from "@/components/HomeNavbar"
import { useSearchParams } from 'next/navigation';
import {
  createSession,
  resetSessionState,
} from '../../redux/slices/sessionSlice';
import {
  fetchSubjectsByClassId,
} from '../../redux/slices/subjectSlice';

import {
  fetchClassesByLevel,
} from '../../redux/slices/classSlice';
import {
  sendChatQuestion,
} from '../../redux/slices/chatSlice';
import {
  fetchChaptersBySubjectId,
} from '../../redux/slices/chapterSlice';
import {
  fetchTopicsByChapterId,
} from '../../redux/slices/topicSlice';
import { fetchChatHistory } from "../../redux/slices/chatSessionHistorySlice"; 
import { updateUserTopicProgress } from '../../redux/slices/progressSlice';
import { resetChat } from '../../redux/slices/chatSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { RiArrowDownSLine } from "react-icons/ri";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { MdOutlineMicNone } from "react-icons/md";
import { MdOutlineMicOff } from "react-icons/md";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Markdown from 'react-markdown'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ChatSessionsList from "@/pages/ChatSessionsList/index"
import speakTTS from 'speak-tts'; // Import speak-tts library
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IoArrowUp } from "react-icons/io5";
import { IoStop } from "react-icons/io5";
import "./aiResponse.css"
// Initialize speakTTS
const speech = new speakTTS();

speech.init({
  lang: 'en-US',
  volume: 1,
  rate: 1,
  pitch: 1,
  voice: 'Google UK English Female', // Choose a voice or leave as default
}).catch((e) => console.error('Error initializing TTS:', e));


const AiChatComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract query parameters
  const chapterId = searchParams?.get('chapterId') || '';
  const subjectId = searchParams?.get('subjectId') || '';
  const topicId = searchParams?.get('topicId') || '';
  const subtopicId = searchParams?.get('subtopicId') || ''; // Subtopic index if provided
  const trendingTopicId = searchParams?.get('trendingTopicId') || '';
  const chatSessionId = searchParams?.get('chatSessionId') || '';
  console.log("chat session id", chatSessionId)

  // State for display data and input field
  const [subjectName, setSubjectName] = useState<string>('');
  const [chapterName, setChapterName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [currentChatHistory, setCurrentChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Redux state selectors
  const { sessionId, status, startedAt, loading: sessionLoading, error: sessionError } = useSelector(
    (state: RootState) => state.session
  );
  const { chat_history, suggested_questions, loading: chatLoading, error: chatError } = useSelector(
    (state: RootState) => state.chat
  );
  const { trendingTopics, loading, error } = useSelector(
    (state: RootState) => state.trendingTopics
  );
 // Fetch chat history from Redux state
  const { chatHistory, loading: chatHistoryLoading, error: chatHistoryError } = useSelector(
    (state: RootState) => state.chatHistory // Correct state reference
  );


  const { classes } = useSelector((state: RootState) => state.class);
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const endOfPageRef = useRef<HTMLDivElement | null>(null);

  console.log("origal chat Histroy", chat_history)
  // Add chat_history to chatHistory state when it updates

   // Fetch chat history when sessionId is available
    useEffect(() => {
      if (chatSessionId) {
        dispatch(fetchChatHistory(chatSessionId)); // Fetch chat history based on sessionId
      }
    }, [dispatch, chatSessionId]);
   // Add chat_history to chatHistory state when it updates
    useEffect(() => {
      if (chatSessionId && chat_history && chat_history.length > 0) {
        const lastChat = chat_history[chat_history.length - 1];
  
        // Add only the last chat with the role 'assistant'
        if (lastChat.role === 'assistant') {
          setCurrentChatHistory((prev) => [...prev, { role: 'assistant', content: lastChat.content }]);
        }
      }
    }, [chat_history]);
  
  
  useEffect(() => {
    if (chat_history && chat_history.length > 0) {
      const lastChat = chat_history[chat_history.length - 1];

      // Add only the last chat with the role 'assistant'
      if (lastChat.role === 'assistant') {
        setCurrentChatHistory((prev) => [...prev, { role: 'assistant', content: lastChat.content }]);
      }
    }
  }, [chat_history]);

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
        setCurrentChatHistory(updatedHistory);
      }
    }, [chatHistory]);
  

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
 
  // Start a new session
  useEffect(() => {
    dispatch(createSession());
    dispatch(resetSessionState())
    dispatch(resetChat())
  }, [dispatch]);

  // Fetch subjects based on user's class
  useEffect(() => {
    const userData = localStorage.getItem('user_profile');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.user_class) {
        dispatch(fetchSubjectsByClassId(parsedData.user_class));
      }
    }
  }, [dispatch]);

  // Fetch classes based on education level
  useEffect(() => {
    const educationLevelData = localStorage.getItem('user_profile');
    if (educationLevelData) {
      const parsedData = JSON.parse(educationLevelData);
      dispatch(fetchClassesByLevel(parsedData.education_level));
    }
  }, [dispatch]);

  // Update class name
  useEffect(() => {
    const userData = localStorage.getItem('user_profile');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.user_class && classes.length > 0) {
        const foundClass = classes.find((cls) => cls.id === parsedData.user_class);
        setClassName(foundClass ? foundClass.name : 'Unknown Class');
      }
    }
  }, [classes]);

  // Fetch chapters based on subject
  useEffect(() => {
    if (subjectId) {
      dispatch(fetchChaptersBySubjectId(subjectId));
    }
  }, [dispatch, subjectId]);

  // Fetch topics based on chapter
  useEffect(() => {
    if (chapterId) {
      dispatch(fetchTopicsByChapterId(chapterId));
    }
  }, [dispatch, chapterId]);


  // Fetch topics based on chapter
  useEffect(() => {
    if (topicId) {
      const progressData = { topic_id: topicId, is_completed: true };
      dispatch(updateUserTopicProgress(progressData));
    }
  }, [dispatch, topicId]);


  useEffect(() => {
    if (trendingTopicId && trendingTopics.length > 0) {
      const topic = trendingTopics.find((trendingTopic) => trendingTopic.id === trendingTopicId);
      console.log("topic at chat page list", trendingTopics)
      if (topic) {
        setTopicName(topic.name); // Set the topic name
        setChapterName(topic.chapter_name); // Set chapter name
        setSubjectName(topic.subject_name); // Set subject name

      }
      console.log("Selected topic details:", topic);
    }
  }, [trendingTopicId]);

  console.log("topics at topic latest", trendingTopics)

  // Update display names for subject, chapter, topic, and handle subtopics
  useEffect(() => {
    if (subjectId && subjects.length > 0) {
      const foundSubject = subjects.find((subject) => subject.id === subjectId);
      setSubjectName(foundSubject ? foundSubject.name : 'Unknown Subject');
    }
    if (chapterId && chapters.length > 0) {
      const foundChapter = chapters.find((chapter) => chapter.id === chapterId);
      setChapterName(foundChapter ? foundChapter.name : 'Unknown Chapter');
    }
    if (topicId && topics.length > 0) {
      const foundTopic = topics.find((topic) => topic.id === topicId);
      setTopicName(foundTopic ? foundTopic.name : 'Unknown Topic');

      // Handle subtopic selection
      if (subtopicId && foundTopic && foundTopic.subtopics) {
        const subtopicIndex = parseInt(subtopicId, 10); // Convert subtopicId to a number
        if (!isNaN(subtopicIndex) && subtopicIndex >= 0 && subtopicIndex < foundTopic.subtopics.length) {
          setQuestion(foundTopic.subtopics[subtopicIndex]); // Set the corresponding subtopic as the question
        }
      }
    }
  }, [subjectId, chapterId, topicId, subtopicId, subjects, chapters, topics]);

  const handleSendQuestion = () => {
    const userMessage = { role: 'user', content: transcript || '' || question };

    // If there's no valid input, return early
    if (!userMessage.content.trim()) return;

    const updatedChatHistory = [...currentChatHistory, userMessage];
    setCurrentChatHistory(updatedChatHistory);

    const payload = {
      session_id: sessionId || chatSessionId || '',
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

    const updatedChatHistory = [...currentChatHistory, userMessage];
    setCurrentChatHistory(updatedChatHistory);

    const payload = {
      session_id: sessionId || chatSessionId || '',
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
  const scrollToBottom = () => {
    endOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    < >
      <div className='flex h-20 w-full  fixed ' >
        <HomeNavbar />
      </div>

      <div className='flex w-full'>
        <div >
          <ChatSessionsList />
        </div>
        <div className='flex w-full flex-col container lg:ml-64 mx-auto px-4'>


          <div className='flex flex-col pb-32'>

            <div className="flex  mt-20   bg-gradient-to-r from-[#63A7D4] to-[#F295BE] rounded-lg  justify-between items-center p-4">
              <div className='text-white'>
                <p><strong>Class:</strong> {className}</p>
                <p><strong>Subject:</strong> {subjectName}</p>
                <p><strong>Chapter:</strong> {chapterName}</p>

              </div>

            </div>

            <div className=" w-full    rounded-lg"  >
              <div className='flex p-4  justify-between items-center text-center  rounded-lg text-[#418BBB] cursor-pointer ' onClick={goBack} >

                <span className='flex gap-2  justify-center items-center'><span><FaArrowLeft size={16} /></span><span>Back</span></span>
                <p><strong>Topic:</strong> <span>{topicName}</span></p>
                <span><FaShare size={16} /></span>
              </div>
              {(
                <div>

                  <div className="space-y-4 ">
                    {currentChatHistory.map((entry, index) => (
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
                                <hr className="border-t border-gray-300 w-5/6 mt-2" />

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




        </div>

      </div>

      <div className='flex w-full fixed   bottom-28 py-4'>
      <div className='flex container mx-auto lg:ml-64  justify-center '>
        <div>
        <button
          onClick={scrollToBottom}
          className=" bg-gray-300  p-3 rounded-full shadow-lg hover:bg-gray-400 text-stone-600 transition-all"
        >
          <RiArrowDownSLine size={30} />
        </button>
        </div>
      
</div>
      </div>

      <div className='flex  fixed w-full bottom-0 justify-center   '>
        
        <div className='flex flex-col container mx-auto lg:ml-64  w-full px-4 '>
          <div className='flex w-full bg-gray-200 p-4   rounded-3xl gap-2 justify-center  items-center'>
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
          <div className='flex w-full justify-center items-center mt-2 text-sky-400'>
            Sporesed by eramLABS
          </div>
        </div>
      </div>


    </>
  );
};

export default AiChatComponent;
