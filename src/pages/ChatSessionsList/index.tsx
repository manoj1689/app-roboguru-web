import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store'; // Adjust the import path based on your project structure
import { fetchChatSessions, resetChat } from '../../redux/slices/chatHistorySlice';
import { useRouter } from 'next/router'; // If using Next.js
import Layout from '@/components/HomeLayout';
const ChatSessionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { chatSessions, loading, error } = useSelector((state: RootState) => state.chatHistory);
  const router = useRouter();


  const [visibleSessions, setVisibleSessions] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  // Fetch chat sessions on component mount
  useEffect(() => {
    dispatch(fetchChatSessions());

    // Cleanup: reset chat state on unmount
    return () => {
      dispatch(resetChat());
    };
  }, [dispatch]);

  // Handle "View More" button click
  const handleViewMore = () => {
    setVisibleCount(visibleCount + 4);
  };

  // Update the visible sessions when chatSessions change
  useEffect(() => {
    setVisibleSessions(chatSessions.slice(0, visibleCount));
  }, [chatSessions, visibleCount]);

  if (loading) {
    return <div>Loading chat sessions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <section className="container mx-auto bg-white rounded shadow p-5 my-4">
        <h3 className="text-lg font-bold mb-4">Chat Sessions</h3>
        <div className="flex w-full justify-end my-4">
          {/* Show View More button if there are more than 4 sessions */}
          {chatSessions.length > 4 && visibleSessions.length < chatSessions.length && (
            <button
              onClick={handleViewMore}
              className="mt-4 py-2 px-4 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 transition-all"
            >
              View More
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {visibleSessions.map((session) => (
            <div
              key={session.session_id}
              className="flex w-full flex-col border-l-4 border-sky-400 bg-sky-50 border rounded-lg p-4 hover:shadow transition-shadow"
            >
              <h4 className="text-xl text-black font-semibold mb-2">
                {session.title || 'Untitled Session'}
              </h4>
              <p className="text-sm text-black mb-2">Status: {session.status}</p>
              <p className="text-sm text-black mb-2">
                Started At: {new Date(session.started_at).toLocaleString()}
              </p>
              {session.last_message && (
                <p className="text-sm text-black mb-2">Last Message: {session.last_message}</p>
              )}
              {session.last_message_time && (
                <p className="text-sm text-black mb-2">
                  Last Message Time: {new Date(session.last_message_time).toLocaleString()}
                </p>
              )}
              <button
                onClick={() => router.push(`/SessionChat?sessionId=${session.session_id}`)} // Adjust path as needed
                className="py-2 text-sky-400 mt-4 font-semibold tracking-widest underline"
              >
                View Session
              </button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ChatSessionsPage;
