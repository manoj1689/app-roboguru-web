import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchChatSessions, resetChat } from '../../redux/slices/chatHistorySessionSlice';
import { useRouter } from 'next/router'; // If using Next.js
import Layout from '@/components/HomeLayout';
import Sidebar from '@/components/Sidebar';
import HomeNavbar from "@/components/HomeNavbar";
import HomeFooter from '@/components/HomeFooter';
import { FaArrowLeft } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

const ChatSessionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatSessions, loading, error } = useSelector((state: RootState) => state.chatHistory);
  const router = useRouter();

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
      <HomeNavbar />
      <div className="p-4">
        <Sidebar />

        <section className="container mt-20 max-lg:mx-auto lg:ml-64 bg-white  pl-4 ">
          <div className="flex gap-2 items-center">
            <div className="p-4">
              <FaArrowLeft size={20} color="black" onClick={goBack} className="hover:cursor-pointer" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Chat Sessions</h3>
            </div>
          </div>
          <div className="overflow-y-auto " style={{height:"calc(100vh - 20rem)"}}>
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
                          onClick={() => router.push(`/SessionChat?sessionId=${session.session_id}`)}
                          className="py-2 text-sky-400 mt-2 font-semibold tracking-widest underline"
                        >
                          <GoArrowUpRight size={30} color="#F46D6D" />
                        </button>
                      </div>
                      <div>
                        <h4 className="text-lg text-stone-800 font-semibold">
                          {session.title || 'Untitled Session'}
                        </h4>
                        {session.last_message && (
                          <p className="text-md text-gray-500 font-medium text-sm mb-2">{session.last_message}</p>
                        )}
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
      </div>
      <div className="flex w-full fixed bottom-0">
        <HomeFooter />
      </div>
    </>
  );
};

export default ChatSessionsPage;
