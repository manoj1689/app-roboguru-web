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
import { processImagesWithAI } from "../../redux/slices/imageUploadSlice";
import speakTTS from 'speak-tts'; // Import speak-tts library
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IoArrowUp } from "react-icons/io5";
import { IoStop } from "react-icons/io5";
import "./aiResponse.css"
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
  const imageChatSessionId = searchParams?.get('imageChatSessionId') || '';
  const previousChatSessionId = searchParams?.get('previousChatSessionId') || '';
  //console.log("chat session id", chatSessionId)

  // State for display data and input field
  const [subjectName, setSubjectName] = useState<string>('');
  const [chapterName, setChapterName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [currentChatHistory, setCurrentChatHistory] = useState<
    { role: string; content: string; images?: string[] }[]
  >([]);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

 
  const { chat_summary, answer, suggested_questions, loading: chatLoading, error: chatError } = useSelector(
    (state: RootState) => state.chat
  );

  const { trendingTopics, loading, error } = useSelector(
    (state: RootState) => state.trendingTopics
  );
  // Fetch chat history from Redux state
  const { chatHistory, loading: chatHistoryLoading, error: chatHistoryError } = useSelector(
    (state: RootState) => state.chatHistory // Correct state reference
  );
  const { images, customQuestion } = useSelector((state: RootState) => state.image);
  const { aiResponse, loading:imageChatLoading, error:imageChatError } = useSelector((state: RootState) => state.imageUpload);
  console.log("images at aichat page and question", images, customQuestion);
  console.log("image Ai response ",aiResponse)
  useEffect(() => {
    if ((images.length > 0 || customQuestion) && currentChatHistory.length === 0) {
      setCurrentChatHistory((prev) => [
        ...prev,
        {
          role: "user",
          content: customQuestion || "", // Store text separately
          images: images, // Store images separately as an array
        },
      ]);
    }
  }, [images, customQuestion]);


 useEffect(() => {
    if (images.length > 0) {
      dispatch(processImagesWithAI({ imageUrls: images, prompt: customQuestion || "", languageCode: "en" }));
    }
  }, [images, customQuestion, dispatch]); // Dependency array

  useEffect(() => {
  if (aiResponse) {
    setCurrentChatHistory((prev) => [
      ...prev,
      {
        role: "assistant",
        content: aiResponse.text_response, // Add the AI's text response
      },
    ]);
  }
}, [aiResponse]);
 console.log("ai response text response",aiResponse?.text_response)
  const { classes } = useSelector((state: RootState) => state.class);
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const endOfPageRef = useRef<HTMLDivElement | null>(null);

  console.log("origal chat Histroy", chat_summary)


  // Fetch chat history when previousChatSessionId  is available
  useEffect(() => {
    if (previousChatSessionId) {
      dispatch(fetchChatHistory(previousChatSessionId)); // Fetch chat history based on sessionId
    }
  }, [dispatch, previousChatSessionId]);

  // Add chat_history to chatHistory state when it updates
  useEffect(() => {
    if (chatSessionId && answer) {
      setCurrentChatHistory((prev) => [...prev, { role: 'assistant', content: answer }]);
    }

  }, [chatSessionId, answer]);

  // Add chat_history to chatHistory state when it updates
  useEffect(() => {
    if (previousChatSessionId && answer) {
      setCurrentChatHistory((prev) => [...prev, { role: 'assistant', content: answer }]);
    }

  }, [previousChatSessionId, answer]);

  console.log("session id at chat Page", chatSessionId)
  console.log("previous session id at chat Page", previousChatSessionId)

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
      session_id: chatSessionId|| previousChatSessionId || '',
      class_name: className,
      subject_name: subjectName,
      chapter_name: chapterName,
      topic_name: topicName,
      question: userMessage.content,
      chat_summary,
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
      session_id: chatSessionId || previousChatSessionId || '',
      class_name: className,
      subject_name: subjectName,
      chapter_name: chapterName,
      topic_name: topicName,
      question: suggestedQuestion,
      chat_summary,
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
      <div className='flex h-20 w-full fixed ' >
        <HomeNavbar />
      </div>
      <div className='flex w-full container   mx-auto px-4'>
        <div className='mt-20'>
          <Sidebar />
        </div>


        <div className='flex w-full flex-col px-8 '>

          <div className="flex  mt-20   bg-gradient-to-r from-[#63A7D4] to-[#F295BE] rounded-lg  justify-between items-center p-4">
            <div className='text-white'>
              <p><strong>Class:</strong> {className}</p>
              <p><strong>Subject:</strong> {subjectName}</p>
              <p><strong>Chapter:</strong> {chapterName}</p>

            </div>
            <button className="px-4 py-2 font-medium text-gray-200 rounded-lg bg-gradient-to-t from-[#7A4F9F] to-[#F15A97] transition-all duration-300 hover:opacity-80"
              onClick={() => router.push(`/ExamModule?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topicId}`)}
            >
              Take a Test
            </button>
          </div>

          <div className=" w-full    rounded-lg"  >
            <div className='flex p-4  justify-between items-center text-center  rounded-lg text-[#418BBB] cursor-pointer ' onClick={goBack} >

              <span className='flex gap-2  justify-center items-center'><span><FaArrowLeft size={16} /></span><span>Back</span></span>
              <p><strong>Topic:</strong> <span>{topicName}</span></p>
              <span><FaShare size={16} /></span>
            </div>

            <div>

              <div className="space-y-4 h-[calc(100vh-22rem)] overflow-y-auto ">
                {currentChatHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'} `}
                  >


                    <div
                      className={` px-8 py-2  mx-4 ${entry.role === 'user' ? '' : ''}`}
                    >
                      {entry.role === "user" ? (
                        <div className="flex flex-col bg-[#CAE0EF] px-4 py-2 text-black text-right rounded-t-xl rounded-l-xl">
                         
                          {/* Render images */}
                          {entry.images?.length ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {entry.images.map((imgUrl, index) => (
                                <img
                                  key={index}
                                  src={imgUrl}
                                  alt={`Uploaded image ${index + 1}`}
                                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                />
                              ))}
                            </div>
                          ) : null}
                           {/* Render text */}
                           {entry.content && <Markdown>{entry.content}</Markdown>}

                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-semibold text-[#4F87CC] pb-2">Ai</div>
                          <hr className="border-t border-gray-300 w-5/6 mt-2" />
                          <div className='flex flex-col  rounded-lg p-4 '><p>
                            <Markdown>{entry.content}</Markdown>
                          </p>
                            <hr className="border-t border-gray-300 w-5/6 mt-2" />

                            <div className="flex w-full justify-start items-center gap-2 text-black  p-2">
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
                <div>
                  {chatLoading ||imageChatLoading ? (
                    <div className="ai-responding px-8">
                      <span className='text-md font-semibold text-gray-500 '> Ai is typing</span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
                    </div>
                  ) : ''}

                </div>
                {suggested_questions.length > 0 && (
                  <div className="w-full px-4 my-4">
                    <h3 className="text-lg font-semibold mb-2">Suggested Questions:</h3>

                    <ul className="flex flex-wrap mb-4 gap-2">
                      {suggested_questions.map((suggestedQuestion, index) => (
                        <li
                          key={index}
                          className="border border-[#418BBB] px-4 py-2 rounded-lg bg-[#DCF1FF] cursor-pointer hover:bg-[#cee6f7] transition shrink-0"
                          onClick={() => handleSuggestedQuestionClick(suggestedQuestion)}
                        >
                          {suggestedQuestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                )}
              </div>




            </div>



            <div ref={endOfPageRef} />
          </div>

          {/* <div className='flex  py-4 justify-center'>
            <button
              onClick={scrollToBottom}
              className=" bg-gray-300  p-3 rounded-full shadow-lg hover:bg-gray-400 text-stone-600 transition-all"
            >
              <RiArrowDownSLine size={30} />
            </button>
          </div> */}

          <div className='flex flex-col container mx-auto   w-full  '>
            <div className='flex w-full bg-gray-200 p-4   mx-auto rounded-3xl gap-2 justify-end right-0  items-center'>
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
          <div>


          </div>


        </div>









      </div>






    </>
  );
};

export default AiChatComponent;
