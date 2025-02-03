import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchChatSessions, resetChat } from '../../redux/slices/chatSessionHistorySlice';
import { useRouter } from 'next/router'; // If using Next.js
import Layout from '@/components/HomeLayout';
import Sidebar from '@/components/Sidebar';
import HomeNavbar from "@/components/HomeNavbar";
import HomeFooter from '@/components/HomeFooter';
import TestBar from '@/components/TestBar';
import { FaArrowLeft } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

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

    // Cleanup: reset chat state on unmount
    return () => {
      dispatch(resetChat());
    };
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
    <>
      {/* Hamburger button for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-2xl fixed top-5 left-5 z-50"
      >
        <span className="block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </span>
      </button>

      <section className={`fixed top-0 left-0 h-full  bg-white transition-all mt-20 z-10 ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        } lg:w-64 lg:block`}>

        <div className="flex w-full gap-2 items-center">
          <div className="p-4">
            <FaArrowLeft size={20} color="black" onClick={goBack} className="hover:cursor-pointer" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Chat Sessions</h3>
          </div>
        </div>
        <div className="overflow-y-auto " style={{ height: "calc(100vh - 13rem)" }}>
          {/* Render grouped sessions */}
          {Object.keys(groupedSessions).map((date) => (
            <div key={date} className="mb-2 bg-[#D9D9D9]">
              <h4 className="text-lg font-medium py-2 text-gray-500 px-4 items-center">{date}</h4>
              <div className="flex flex-col gap-2 bg-white">
                {groupedSessions[date].map((session: any) => (
                  <div
                    key={session.session_id}
                    className="flex w-full justify-between border-b px-4 py-2  border-b-gray-400 cursor-pointer"
                    onClick={() => router.push(`/AiChat?chatSessionId=${session.session_id}`)}
                  >
                    <div className="flex flex-col w-full ">
                      <div className="flex  justify-between items-center">
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
                      <div className='pl-4'>
                        <h4 className="text-sm text-stone-800 font-semibold">
                          {session.title || 'Untitled Session'}
                        </h4>
                        {session.last_message && (
                          <p className="text-md text-gray-500 font-medium text-sm mb-2">{session.last_message}</p>
                        )}
                      </div>
                    </div>



                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='p-2 border border-gray-400 rounded-lg'>
          <div>

          </div>
          <div>
            View Plans
          </div>
          <div>
            Unlimited Access,term feature ..
          </div>

        </div>
      </section>






    </>
  );
};

export default ChatSessionsPage;
