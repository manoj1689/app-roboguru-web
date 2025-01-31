import React, { useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 4; // Define the number of topics per page

  // Calculate indices for paginated data
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const paginatedTopics = trendingTopics.slice(startIndex, endIndex);
   console.log("trending Topic",trendingTopics)
  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);

      const user_class_id = "01b60e10-88c7-49db-afd2-a8c945317ded";
      // Dispatch trending topics based on class ID
      if (parsedData.user_class) {
        dispatch(fetchTrendingTopicsByClassId(user_class_id));
      }
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="bg-white rounded shadow p-5 my-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Trending Topics for You</h3>
      
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {paginatedTopics.map((topic: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-[#F7F7F7] border border-[#EAEAEA] p-4 rounded-lg shadow-lg " 
          >
            <div className="flex w-full text-xs font-semibold justify-end">
            <span className="px-4 py-2 rounded-full bg-[#FFB97B]">Trending</span>
            </div>
            <div>
              <h4 className="text-xl text-black font-semibold mb-1">
                {topic.name}
              </h4>
              <p className="text-sm text-black mb-2">
                {topic.tagline} | Details {topic.class_name}
              </p>
              <p className="text-md text-black line-clamp-1">
                {topic.subject_tagline}
              </p>
            </div>
            <div className="flex-col">
              <button
                className="px-8 py-2 text-white mt-4 bg-[#63A7D4] rounded-md "
                onClick={()=>router.push(`/AiChat?trendingTopicId=${topic.id}`)}
              >

                Try Now
              </button>
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
