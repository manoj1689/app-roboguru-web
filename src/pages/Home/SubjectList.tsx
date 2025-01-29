import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchSubjectsByClassId } from "../../redux/slices/subjectSlice";
import { fetchUserProgress } from "../../redux/slices/progressSlice";
import { Line } from "rc-progress";
import ResponsivePagination from 'react-responsive-pagination';
import './pagination.css'

const SubjectList = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 4; // Define the number of subjects per page

  const {
    userProgress,
    loading: progressLoading = false,
    error: progressError = null,
  } = useSelector((state: RootState) => state.progress || {});

  const {
    subjects = [],
    loading: subjectsLoading = false,
    error: subjectsError = null,
  } = useSelector((state: RootState) => state.subjects || {});

  useEffect(() => {
    const userData = localStorage.getItem("user_profile");
    if (userData) {
      const parsedData = JSON.parse(userData);

      if (parsedData.user_class) {
        dispatch(fetchSubjectsByClassId(parsedData.user_class));
      }

      if (parsedData.id) {
        dispatch(fetchUserProgress(parsedData.id));
      }
    }
  }, [dispatch]);

  if (subjectsLoading || progressLoading) return <div>Loading...</div>;
  if (subjectsError || progressError)
    return <div>Error: {subjectsError || progressError}</div>;

  // Helper function to find progress by subject_id
  const getSubjectProgress = (subjectId: string) => {
    if (!userProgress || !userProgress.subjects) return 0;
    const subjectData = userProgress.subjects.find(
      (subject: any) => subject.subject_id === subjectId
    );
    return subjectData ? subjectData.subject_progress || 0 : 0;
  };

  // Calculate indices for paginated data
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const endIndex = startIndex + subjectsPerPage;
  const subjectsList = subjects.slice(startIndex, endIndex);

  return (
    <section className="bg-white rounded shadow p-5 my-4">
      <h3 className="text-lg font-bold mb-4">Subjects for Your Class</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    
          {subjectsList.map((subject: any) => (
            <div
              key={subject.id}
              className="flex flex-col bg-sky-400 border rounded-lg px-4 pt-8 pb-4 mb-4 hover:shadow transition-shadow"
            >
              <div className="flex flex-col w-80 mb-2">
                <span className="text-xl text-white font-semibold mb-2 text-wrap">
                  {subject.tagline}
                </span>
                <p className="text-sm text-white mb-2">{subject.name}</p>
              </div>

              <div className="flex-col">
                <button
                  onClick={() =>
                    router.push(`/ChapterList?subjectId=${subject.id}`)
                  }
                  className="py-2 text-white mt-4 font-semibold tracking-widest underline"
                >
                  Explore Now
                </button>
              </div>

              <Line
                percent={parseFloat(getSubjectProgress(subject.id).toFixed(2))}
                strokeWidth={4}
                trailWidth={4}
                strokeColor="#63A7D4"
                trailColor="#CDE6F7"
              />
            </div>
          ))}
        </div>
    

      {/* Pagination */}
      <div className="pagination-container">
        <ResponsivePagination
          total={Math.ceil(subjects.length / subjectsPerPage)}
          current={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default SubjectList;
