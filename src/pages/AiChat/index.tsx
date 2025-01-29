import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { updateUserTopicProgress } from '../../redux/slices/progressSlice';
import { resetChat } from '../../redux/slices/chatSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Markdown from 'react-markdown'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import speakTTS from 'speak-tts'; // Import speak-tts library
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
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

  // Extract query parameters
  const chapterId = searchParams?.get('chapterId') || '';
  const subjectId = searchParams?.get('subjectId') || '';
  const topicId = searchParams?.get('topicId') || '';
  const subtopicId = searchParams?.get('subtopicId') || ''; // Subtopic index if provided
  const trendingTopicId = searchParams?.get('trendingTopicId') || '';
  console.log("topic id", trendingTopicId)

  // State for display data and input field
  const [subjectName, setSubjectName] = useState<string>('');
  const [chapterName, setChapterName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  // State for tracking the currently playing text index
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

  const { classes } = useSelector((state: RootState) => state.class);
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  
  
  console.log("origal chat Histroy", chat_history)
  // Add chat_history to chatHistory state when it updates
  useEffect(() => {
    if (chat_history && chat_history.length > 0) {
      const lastChat = chat_history[chat_history.length - 1];

      // Add only the last chat with the role 'assistant'
      if (lastChat.role === 'assistant') {
        setChatHistory((prev) => [...prev, { role: 'assistant', content: lastChat.content }]);
      }
    }
  }, [chat_history]);

  // Get Topics List from Redux store

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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

    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);

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

    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);

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


  useEffect(() => {
    if (transcript) {
      setQuestion(transcript); // Update question with transcript text
    }
  }, [transcript]); 

  const handleStop = () => {
    speech.cancel(); // Stops the current speech
  };
  console.log("chat History", chatHistory)
  return (
    <>
      <HomeNavbar />
      <div className='container mt-20  mx-auto'>
        <div className="flex bg-gradient-to-r from-[#63A7D4]  to-[#F295BE] rounded-lg  justify-between items-center p-4">
          <div className='text-white'>
            <p><strong>Class:</strong> {className}</p>
            <p><strong>Subject:</strong> {subjectName}</p>
            <p><strong>Chapter:</strong> {chapterName}</p>

          </div>
          <div className='text-white'>
            {sessionLoading && <p>Starting session...</p>}
            {sessionError && <p>Error: {sessionError}</p>}
            {sessionId && (
              <div>
                <p><strong>Session ID: </strong> {sessionId}</p>
                <p><strong> Status: </strong> {status}</p>
                <p><strong> Started At: </strong> {startedAt ? new Date(startedAt).toLocaleString() : 'N/A'}</p>
              </div>
            )}
          </div>
        </div>
        <div className=" w-full my-4 rounded-lg">
          <div className='flex p-4 justify-between items-center text-center bg-stone-200 rounded-lg text-cyan-500'>

            <span className='flex gap-2 justify-center items-center'><span><FaArrowLeft size={16} /></span><span>Back</span></span>
            <p><strong>Topic:</strong> {topicName}</p>
            <span><FaShare size={16} /></span>
          </div>
          {(
            <div
              className="overflow-y-scroll bg-white my-4 rounded-lg"
              style={{ height: `calc(100vh - 24rem)` }}
            >

              <div className="space-y-4">
                {chatHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[95%] px-8 py-2  mx-4 ${entry.role === 'user' ? '' : ''}`}
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

          <div className='flex fixed container bottom-4  bg-[#63A7D4] rounded-lg gap-2 justify-center bg- items-center p-4'>
            <div className='flex w-full bg-white justify-center rounded-lg items-center'>
              <input
                type="text"
                placeholder="Type or use voice input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='w-full px-4 py-2 placeholder:text-gray-400 bg-white  rounded-lg outline-none'
              />

            </div>
            <span>
              {listening ? (
                <IoMdMicOff
                  size={25}
                  onClick={stopListeningHandler}
                  className="cursor-pointer text-stone-700"

                />
              ) : (
                <IoMdMic
                  size={25}
                  onClick={startListeningHandler}
                  className="cursor-pointer text-stone-700"
                />
              )}
            </span>

            <button onClick={handleSendQuestion} disabled={chatLoading} className='bg-[#F295BE] px-8 py-2 hover:bg-[#F295BE] rounded-lg text-stone-700'>
              {chatLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default  AiChatComponent;
