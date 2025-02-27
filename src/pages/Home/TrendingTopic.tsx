import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  createSession,
  resetSessionState,
} from '../../redux/slices/sessionSlice';
import { resetChat } from '../../redux/slices/chatSlice';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchTrendingTopicsByClassId } from "../../redux/slices/trendingTopicSlice";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';

const TrendingTopicsSection = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 3;

  // Ensure Redux store is accessed only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Selectors from Redux store
  const { trendingTopics, loading, error } = useSelector((state: RootState) => 
    isClient ? state.trendingTopics : { trendingTopics: [], loading: true, error: null }
  );
  const { sessionId, sessionLoading } = useSelector((state: RootState) => 
    isClient ? { sessionId: state.session.sessionId, sessionLoading: state.session.loading } : { sessionId: null, sessionLoading: true }
  );

 // Fetch user data from local storage and dispatch trending topics
useEffect(() => {
  if (!isClient || !profile?.user_class) return;

  dispatch(fetchTrendingTopicsByClassId(profile.user_class));
}, [dispatch, isClient, profile?.user_class]);


  // Ensure session is created before navigating to chat
  useEffect(() => {
    if (!isClient || sessionId) return;

    const initializeSession = async () => {
      try {
        await dispatch(resetSessionState()); // Reset session state
        await dispatch(createSession()); // Ensure session is created
        await dispatch(resetChat()); // Reset chat after session creation
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    initializeSession();
  }, [dispatch, sessionId, isClient]); // Ensuring dependencies are correct

  // Pagination logic
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const paginatedTopics = trendingTopics.slice(startIndex, endIndex);

  // Handle chat navigation
  const handleTrendingTopicChat = async (topicId: string) => {
    try {
      if (!sessionId) {
        console.error("Session ID is null, cannot navigate to chat.");
        return;
      }
      router.push(`/AiChat?trendingTopicId=${topicId}&chatSessionId=${sessionId}`);
    } catch (error) {
      console.error("Error navigating to chat:", error);
    }
  };

  // Ensure hooks execute before rendering UI
  if (!isClient || loading || sessionLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="bg-white rounded shadow p-5 my-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Trending Topics for You</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedTopics.map((topic, index) => (
          <div key={index} className="flex flex-col justify-between bg-[#F7F7F7] border border-[#EAEAEA] p-4 rounded-lg shadow-lg">
            <div className="flex w-full text-xs font-semibold justify-between items-center">
              <span className="text-md font-medium text-[#63A7D4]">{topic.subject_name}</span>
              <span className="px-4 py-1 rounded-full bg-[#FFB97B]">Trending</span>
            </div>
            <div>
              <h4 className="text-xl text-black font-semibold mb-1 line-clamp-1">{topic.name}</h4>
              <p className="text-sm text-black mb-2 line-clamp-1">{topic.tagline}</p>
              <p className="text-md text-black line-clamp-1">{topic.subject_tagline}</p>
            </div>
            <div className="flex pt-2 justify-between items-center">
              <button className="text-md font-semibold text-[#63A7D4] underline" onClick={() => handleTrendingTopicChat(topic.id)}>
                Try Now
              </button>
              <div>
                <img src="/images/tick.png" alt="tick" className="w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <div className="mt-4">
        <ResponsivePagination
          total={Math.ceil(trendingTopics.length / topicsPerPage)}
          current={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

// Disable SSR for this component
export default dynamic(() => Promise.resolve(TrendingTopicsSection), { ssr: false });
