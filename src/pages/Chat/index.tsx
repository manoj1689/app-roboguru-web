import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/HomeLayout';
import { useSearchParams } from 'next/navigation';
import {
  createSession,
  resetSessionState,
} from '../../redux/slices/sessionSlice';
import {
  fetchSubjectsByClassId,
} from '../../redux/slices/subjectSlice';
import {
  fetchChaptersBySubjectId,
} from '../../redux/slices/chapterSlice';
import {
  fetchTopicsByChapterId,
} from '../../redux/slices/topicSlice';
import {
  fetchClassesByLevel,
} from '../../redux/slices/classSlice';
import {
  sendChatQuestion,
} from '../../redux/slices/chatSlice';
import { resetChat } from '../../redux/slices/chatSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { updateUserTopicProgress } from '../../redux/slices/progressSlice';
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { AiOutlineLike,AiOutlineDislike  } from "react-icons/ai";
import Markdown from 'react-markdown'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import speakTTS  from 'speak-tts'; // Import speak-tts library
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
// Initialize speakTTS
const speech = new speakTTS();

speech.init({
  lang: 'en-US',
  volume: 1,
  rate: 1,
  pitch: 1,
  voice: 'Google UK English Female', // Choose a voice or leave as default
}).catch((e) => console.error('Error initializing TTS:', e));


const ChatComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();

  // Extract query parameters
  const chapterId = searchParams?.get('chapterId') || '';
  const subjectId = searchParams?.get('subjectId') || '';
  const topicId = searchParams?.get('topicId') || '';
  const subtopicId = searchParams?.get('subtopicId') || ''; // Subtopic index if provided

  // State for display data and input field
  const [subjectName, setSubjectName] = useState<string>('');
  const [chapterName, setChapterName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
    // State for tracking the currently playing text index
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
 
  // Redux state selectors
  const { sessionId, status, startedAt, loading: sessionLoading, error: sessionError } = useSelector(
    (state: RootState) => state.session
  );
  const { chat_history, answer, details, suggested_questions, loading: chatLoading, error: chatError } = useSelector(
    (state: RootState) => state.chat
  );
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const { topics } = useSelector((state: RootState) => state.topics);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const { classes } = useSelector((state: RootState) => state.class);

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
    if (!question.trim()) return;

    const payload = {
      session_id: sessionId || '',
      class_name: className,
      subject_name: subjectName,
      chapter_name: chapterName,
      topic_name: topicName,
      question,
      chat_history,
    };
    console.log('Chat payload', payload);
    dispatch(sendChatQuestion(payload));
    setQuestion(''); // Clear the input field after sending
  };

  const handleSuggestedQuestionClick = (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion); // Set the question state with the suggested question
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
    dispatch(sendChatQuestion(payload)); // Dispatch to send the question
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

  const handleStop = () => {
    speech.cancel(); // Stop the text-to-speech
    setPlayingIndex(null); // Reset the playing index
  };

  useEffect(() => {
    if (transcript) {
      setQuestion(transcript); // Update question with transcript text
    }
  }, [transcript]);

  return (
    <>
      <Layout>
        <div className='container mx-auto'>
          <div className="flex bg-gradient-to-r from-[#F295BE] via-[#F295BE] to-[#63A7D4] rounded-lg  justify-between items-center p-4">
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


          <div className=" w-full my-4  bg-white rounded-lg  ">
            <div className='py-4 justify-center items-center text-center  text-cyan-500'>
              <p><strong>Topic:</strong> {topicName}</p>
            </div>
            {chat_history && (
              <div className="h-[680px] overflow-y-scroll">
                <div className="space-y-4">
                  {chat_history.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] px-8 py-2 mt-4 mx-4 ${entry.role === 'user'
                            ? 'flex flex-col bg-[#CAE0EF] text-black text-right rounded-t-xl rounded-l-xl '
                            : 'bg-[#F2F2F2] text-black rounded-t-xl rounded-r-xl '
                          }`}
                      >
                        {/* Display role */}
                        <div className="text-sm font-semibold text-[#4F87CC]">
                          {entry.role === 'user' ? 'You' : 'Assistant'}
                        </div>

                        {/* Display message */}
                        <p> <Markdown >{entry.content}</Markdown></p>
                         
                          {/* Toggle Play/Stop buttons */}
                          <div className="flex w-full justify-start items-center gap-2">
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
                          <div>
                          <AiOutlineLike size={25} className="text-[#4F87CC]" />
                          </div>
                          <div>
                          <AiOutlineDislike  size={25} className="text-[#4F87CC]"/>
                          </div>
                        </div>
                       
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


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


            <div className='flex gap-2 justify-center items-center p-4'>
              <div className='flex w-full bg-white justify-center items-center'>
                <input
                  type="text"
                  placeholder="Type or use voice input"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className='w-full px-4 py-2 placeholder:text-gray-400 bg-stone-200 rounded-lg outline-gray-300'
                />
                {/* <span className='flex px-4 ' ><RiResetLeftFill size={20} onClick={resetTranscript} className='cursor-pointer'/></span> */}
              </div>
              <span>
                {listening ? (
                  <IoMdMicOff
                    size={25}
                    onClick={stopListeningHandler}
                    className="cursor-pointer text-[#418BBB]"

                  />
                ) : (
                  <IoMdMic
                    size={25}
                    onClick={startListeningHandler}
                    className="cursor-pointer text-[#418BBB]"
                  />
                )}
              </span>

              <button onClick={handleSendQuestion} disabled={chatLoading} className='bg-[#63A7D4] px-8 py-2 hover:bg-[#4a84ac] rounded-lg text-white'>
                {chatLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>


          {details && (
            <div>
              <h3 className='text-lg font-bold'>Details</h3>
              <p>{details}</p>
            </div>
          )} 
        </div>
      </Layout>
    </>
  );
};

export default ChatComponent;
