import React, { useEffect, useState } from "react";
import {
  createSession,
  resetSessionState,
} from '../../redux/slices/sessionSlice';
import { resetChat } from '../../redux/slices/chatSlice';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"; // Adjust path as needed
import { fetchTrendingTopicsByClassId } from "../../redux/slices/trendingTopicSlice"; // Adjust path as needed
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';

const TrendingTopicsSection = () => {
  const router=useRouter()
  const dispatch: AppDispatch = useDispatch();
  const { trendingTopics, loading, error } = useSelector(
    (state: RootState) => state.trendingTopics
  );
     // Redux state selectors
      const { sessionId, status, startedAt, loading: sessionLoading, error: sessionError } = useSelector(
        (state: RootState) => state.session
      );

  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 3; // Define the number of topics per page

  // Calculate indices for paginated data
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const paginatedTopics = trendingTopics.slice(startIndex, endIndex);
   console.log("trending Topic",trendingTopics)
  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);

      const user_class_id = parsedData.user_class;
      console.log("user_class_id",user_class_id)
      // Dispatch trending topics based on class ID
      if (parsedData.user_class) {
        dispatch(fetchTrendingTopicsByClassId(user_class_id));
      }
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const handleTrendingTopicChat = async (topicId:string) => {
    try {
      dispatch(resetSessionState())
     
      await dispatch(createSession()).unwrap();
      console.log("session id at trending topic page",sessionId)
      dispatch(resetChat());
      if (sessionId) {
        router.push(`/AiChat?trendingTopicId=${topicId}&chatSessionId=${sessionId}`);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  return (
    <section className="bg-white rounded shadow p-5 my-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold ">Trending Topics for You</h3>
      
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {paginatedTopics.map((topic: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-[#F7F7F7] border border-[#EAEAEA] p-4 rounded-lg shadow-lg " 
          >

            <div className="flex w-full text-xs font-semibold justify-between items-center">
              <span className="text-md font-medium text-[#63A7D4]"> {topic.subject_name}</span>
            <span className="px-4 py-1 rounded-full bg-[#FFB97B]">Trending</span>
            </div>
            <div>
              <h4 className="text-xl text-black font-semibold mb-1">
                {topic.name}
              </h4>
              <p className="text-sm text-black mb-2">
                {topic.tagline}
              </p>
              <p className="text-md text-black line-clamp-1">
                {topic.subject_tagline}
              </p>
            </div>
            <div className="flex pt-2 justify-between items-center">
              <button
                className="  text-md font-semibold text-[#63A7D4] underline"
                onClick={()=>handleTrendingTopicChat(topic.id)}
              >

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



export default TrendingTopicsSection;
