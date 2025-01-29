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
  const topicsPerPage = 8; // Define the number of topics per page

  // Calculate indices for paginated data
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const paginatedTopics = trendingTopics.slice(startIndex, endIndex);
   console.log("trending Topic",trendingTopics)
  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);

      const user_class_id = "f1572e7b-f3e1-42b3-8c52-794c9b9e1d98";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedTopics.map((topic: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-blue-300 p-4 rounded-lg shadow-lg " 
          >
            <div>
              <h4 className="text-xl text-white  font-semibold mb-1">
                {topic.name}
              </h4>
              <p className="text-sm text-white mb-2">
                {topic.tagline} | Details {topic.class_name}
              </p>
              <p className="text-md text-white line-clamp-1">
                {topic.subject_tagline}
              </p>
            </div>
            <div className="flex-col">
              <button
                className="p-2 w-2/3 text-black bg-white rounded-lg "
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
