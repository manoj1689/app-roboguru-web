import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchChatSessions, resetChat } from '../../redux/slices/chatSessionHistorySlice';
import { useRouter } from 'next/router'; // If using Next.js
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsArrowUpRight } from "react-icons/bs";

import Layout from '@/components/HomeLayout';
import TestBar from '@/components/TestBar';

const ChatSessionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatSessions, loading, error } = useSelector((state: RootState) => state.chatHistory);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  const goBack = () => {
    router.back(); // Goes one step back in history
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // "MM/DD/YYYY"
  };

  // Helper function to group sessions by day
  const groupSessionsByDate = (sessions: any[]) => {
    return sessions.reduce((groups: any, session) => {
      const date = formatDate(session.started_at); // Use started_at or last_message_time
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(session);
      return groups;
    }, {});
  };

  // Fetch chat sessions on component mount
  useEffect(() => {
    dispatch(fetchChatSessions());

  }, [dispatch]);

  if (loading) {
    return <div>Loading chat sessions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Group sessions by date
  const groupedSessions = groupSessionsByDate(chatSessions);

  return (
    <Layout>

      <section className='flex  flex-col w-full lg:pl-4'>
      <div className="flex flex-col sm:flex-row w-full justify-between rounded bg-gradient-to-r from-[#63A7D4] to-[#F295BE] text-white p-5  transition-transform">
            <div className="flex flex-col mb-2 w-full">
              <TestBar />
            </div>
            

          </div>
        <div className="flex w-full gap-2 items-center">
          <div className="p-4">
            <FaArrowLeftLong  size={20} color="black" onClick={goBack} className="hover:cursor-pointer" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Chat Sessions</h3>
          </div>
        </div>
        <div className="overflow-y-auto p-4" style={{ height: "calc(100vh - 20rem)" }}>
          {/* Render grouped sessions */}
          {Object.keys(groupedSessions).map((date) => (
            <div key={date} className="mb-2 bg-[#D9D9D9]">
              <h4 className="text-lg font-medium py-2 text-gray-500 px-4 items-center">{date}</h4>
              <div className="flex flex-col gap-4 bg-white">
                {groupedSessions[date].map((session: any) => (
                  <div
                    key={session.session_id}
                    className="flex w-full justify-between border-b px-4 py-4 border-b-gray-400"
                  >
                    <div className="flex w-5/6 items-center">
                      <div className="px-4">
                        <button
                          onClick={() => router.push(`/AiChat?previousChatSessionId=${session.session_id}`)}
                          className="py-2 text-sky-400 mt-2 font-semibold tracking-widest underline"
                        >
                          <BsArrowUpRight size={30} color="#F46D6D" />
                        </button>
                      </div>
                      <div className='flex flex-col md:flex-row w-full '>
                       <div className='md:w-1/5'>
                       <p className="text-md text-neutral-800 font-bold text-lg mb-2">{session.subject_name}</p>
                       </div>
                     <div className='md:w-4/5'>
                     {session.last_message && (
                          <>
                          <div className='flex flex-col '>
                          <p className="text-sm text-gray-800 font-bold text-md ">{session.chapter_name}</p>
                            <h4 className="text-xs text-stone-800 font-semibold">
                              {session.title || 'Untitled Session'}
                            </h4>
                          </div>
                          


                          </>

                        )}
                     </div>
                    



                      </div>
                    </div>
                    <div className="flex w-1/6 justify-center items-center">
                      <div>
                        {session.last_message_time && (
                          <p className="text-sm text-gray-500 font-medium">
                            {(() => {
                              const date = new Date(session.last_message_time);
                              // Add 5 hours and 30 minutes to the current time
                              date.setHours(date.getHours() + 5);
                              date.setMinutes(date.getMinutes() + 30);
                              return `${date.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}`;
                            })()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  );
};

export default ChatSessionsPage;
