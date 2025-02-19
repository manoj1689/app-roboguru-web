import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchSubjectsByClassId } from "../../redux/slices/subjectSlice";
import { fetchUserProgress } from "../../redux/slices/progressSlice";
import { Line } from "rc-progress";
import ResponsivePagination from 'react-responsive-pagination';
import { IoChevronForward } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import './pagination.css'
// Array mapping subject names to images
const subjectImages = [
  { name: "Accountancy", image: "/images/subjects/Accountancy.png" },
  { name: "Biology", image: "/images/subjects/Biology.png" },
  { name: "Business Studies", image: "/images/subjects/Business_Studies.png" },
  { name: "Chemistry", image: "/images/subjects/Chemistry.png" },
  { name: "Economics", image: "/images/subjects/Economics.png" },
  { name: "English", image: "/images/subjects/English.png" },
  { name: "Environmental Studies", image: "/images/subjects/Environmental_Studies.png" },
  { name: "Geography", image: "/images/subjects/geography.png" },
  { name: "Hindi", image: "/images/subjects/Hindi.png" },
  { name: "History", image: "/images/subjects/History.png" },
  { name: "Mathematics", image: "/images/subjects/Mathematics.png" },
  { name: "Physics", image: "/images/subjects/Physics.png" },
  { name: "Psychology", image: "/images/subjects/Psychology.png" },
  { name: "Political Science", image: "/images/subjects/Political_Science.png" },
  { name: "SansKrit", image: "/images/subjects/Sanskrit.png" },
  { name: "Science", image: "/images/subjects/Science.png" },
  { name: "Social Science", image: "/images/subjects/Social_Science.png" },
];


const SubjectList = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 4;

  const { userProgress } = useSelector((state: RootState) => state.progress || {});
  const { subjects = [] } = useSelector((state: RootState) => state.subjects || {});

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

  // Helper function to find progress by subject_id
  const getSubjectProgress = (subjectId: string) => {
    if (!userProgress || !userProgress.subjects) return 0;
    const subjectData = userProgress.subjects.find((subject: any) => subject.subject_id === subjectId);
    return subjectData ? subjectData.subject_progress || 0 : 0;
  };

  // Helper function to get subject image
  const getSubjectImage = (subjectName: string) => {
    const match = subjectImages.find((item) => item.name.toLowerCase() === subjectName.toLowerCase());
    return match ? match.image : "/images/default.jpg"; // Default image if not found
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const endIndex = startIndex + subjectsPerPage;
  const subjectsList = subjects.slice(startIndex, endIndex);

  return (
    <section className="bg-white rounded shadow p-5 my-4">
      <h3 className="text-2xl font-bold mb-4 ">Choose a Subject to Dive In</h3>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {subjectsList.map((subject: any) => (
          <div
            key={subject.id}
            className="relative flex w-full justify-between flex-col rounded-lg p-4  shadow-lg transition-shadow bg-white"
          >
            {/* Subject Image */}
            <div className="flex w-full justify-between ">
              <div>
                <Image
                  src={getSubjectImage(subject.name)} // Find matching image
                  alt={subject.name}
                  height={55}
                  width={55}
                  className="rounded-t-lg"
                />
              </div>

              <div >
                <IoMdInformationCircleOutline size={20} color="gray" />
              </div>


            </div>
            {/* Content */}
            <div className=" flex flex-col justify-between">
              <div className="flex flex-col justify-center items-center">
                <p className="text-2xl font-bold text-neutral-800">{subject.name}</p>
                <span className="text-sm font-semibold text-neutral-800 text-center line-clamp-2">{subject.tagline}</span>
              </div>
            </div>

            <div>
              {/* Progress Bar */}
              <div className="mt-4">


                {parseFloat(getSubjectProgress(subject.id).toFixed(2)) > 0 ? (
                  <Line
                    percent={parseFloat(getSubjectProgress(subject.id).toFixed(2))}
                    strokeWidth={4}
                    trailWidth={4}
                    strokeColor="#63A7D4"
                    trailColor="#CDE6F7"
                  />
                ) : (
                  <div className="h-2 bg-[#CDE6F7] rounded"></div>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <button
                    onClick={() => router.push(`/ChapterList?subjectId=${subject.id}`)}
                    className="flex items-center text-[#51699E] text-xs font-semibold tracking-widest hover:scale-105 "
                  >
                    <span>Try Now</span>
                    <IoChevronForward size={16} />
                    <IoChevronForward size={16} />
                  </button>
                </div>

                <div className=" flex text-sm gap-2 font-semibold text-[#51699E]">
                  <span>{parseFloat(getSubjectProgress(subject.id).toFixed(2))} %</span>
                  <span>Progress</span>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container mt-4">
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
