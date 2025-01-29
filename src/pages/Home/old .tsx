// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../redux/store";
// import { fetchSubjectsByClassId } from "../../redux/slices/subjectSlice";
// import { fetchUserProgress } from "../../redux/slices/progressSlice";
// import { Line } from "rc-progress";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const SubjectList = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const [viewAll, setViewAll] = useState<boolean>(false);
//   const router = useRouter();

//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 2000 },
//       items: 4,
//     },
//     laptop: {
//       breakpoint: { max: 2000, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 640 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 640, min: 0 },
//       items: 1,
//     },
//   };

//   const {
//     userProgress,
//     loading: progressLoading = false,
//     error: progressError = null,
//   } = useSelector((state: RootState) => state.progress || {});

//   const {
//     subjects = [],
//     loading: subjectsLoading = false,
//     error: subjectsError = null,
//   } = useSelector((state: RootState) => state.subjects || {});

//   useEffect(() => {
//     const userData = localStorage.getItem("user_profile");
//     if (userData) {
//       const parsedData = JSON.parse(userData);

//       if (parsedData.user_class) {
//         dispatch(fetchSubjectsByClassId(parsedData.user_class));
//       }

//       if (parsedData.id) {
//         dispatch(fetchUserProgress(parsedData.id));
//       }
//     }
//   }, [dispatch]);

//   if (subjectsLoading || progressLoading) return <div>Loading...</div>;
//   if (subjectsError || progressError)
//     return <div>Error: {subjectsError || progressError}</div>;

//   // Helper function to find progress by subject_id
//   const getSubjectProgress = (subjectId: string) => {
//     if (!userProgress || !userProgress.subjects) return 0;
//     const subjectData = userProgress.subjects.find(
//       (subject: any) => subject.subject_id === subjectId
//     );
//     return subjectData ? subjectData.subject_progress || 0 : 0;
//   };

//   return (
//     <section className="bg-white rounded shadow p-5 my-4">
//       <h3 className="text-lg font-bold mb-4">Subjects for Your Class</h3>
//       <button
//         onClick={() => setViewAll(!viewAll)}
//         className="text-sky-500 underline font-semibold mb-4"
//       >
//         {viewAll ? "Show Less" : "View All"}
//       </button>

//       {viewAll ? (
//          <div className="overflow-x-auto whitespace-nowrap">
//                <div className="flex gap-4 overflow-x-auto py-8">
//                  {subjects.map((subject: any) => (
//                    <div
//                      key={subject.id}
//                      className="flex flex-col bg-sky-400 border rounded-lg px-4 pt-8 pb-4 hover:shadow transition-shadow"
//                    >
//                      <div className="flex flex-col w-64 mb-2">
//                        <span className="text-xl text-white font-semibold mb-2 text-wrap">
//                          {subject.tagline}
//                        </span>
//                        <p className="text-sm text-white mb-2">{subject.name}</p>
//                      </div>
       
//                      <div className="flex-col">
//                        <button
//                          onClick={() =>
//                            router.push(`/ChapterList?subjectId=${subject.id}`)
//                          }
//                          className="py-2 text-white mt-4 font-semibold tracking-widest underline"
//                        >
//                          Explore Now
//                        </button>
//                      </div>
       
//                      {/* Display progress using rc-progress */}
                    
//                      <Line
//                        percent={parseFloat(getSubjectProgress(subject.id).toFixed(2))}
//                        strokeWidth={4}
//                        trailWidth={4}
//                        strokeColor="#63A7D4"
//                        trailColor="#CDE6F7"
       
//                      />
//                    </div>
//                  ))}
//                </div>
//              </div>
//       ) : (
//         <Carousel
//           swipeable={false}
//           draggable={false}
//           showDots={false}
//           responsive={responsive}
//           ssr={true} // means to render carousel on server-side.
//           infinite={true}
//           autoPlaySpeed={1000}
//           keyBoardControl={true}
//           customTransition="all .5"
//           transitionDuration={10}
//           containerClass="carousel-container"
//           removeArrowOnDeviceType={["tablet", "mobile", "laptop", "desktop"]}
//           dotListClass="custom-dot-list-style"
//           itemClass="carousel-item-padding-40-px"
//         >
//           {subjects.map((subject: any) => (
//             <div
//               key={subject.id}
//               className="flex px-4 mx-4 flex-col  h-full bg-sky-400 justify-between border rounded-lg pt-8 pb-4 hover:shadow transition-shadow"
//             >
//               <div className="flex flex-col mb-2">
//                 <span className="text-xl text-white font-semibold mb-2 text-wrap">
//                   {subject.tagline}
//                 </span>
//                 <p className="text-sm text-white mb-2">{subject.name}</p>
//               </div>

//               <div className="flex-col">
//                 <button
//                   onClick={() =>
//                     router.push(`/ChapterList?subjectId=${subject.id}`)
//                   }
//                   className="py-2 text-white mt-4 font-semibold tracking-widest underline"
//                 >
//                   Explore Now
//                 </button>
//                 <Line
//                   percent={parseFloat(getSubjectProgress(subject.id).toFixed(2))}
//                   strokeWidth={4}
//                   trailWidth={4}
//                   strokeColor="#63A7D4"
//                   trailColor="#CDE6F7"
//                 />
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       )}
//     </section>
//   );
// };

// export default SubjectList;


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchSubjectsByClassId } from "../../redux/slices/subjectSlice";
import { fetchUserProgress } from "../../redux/slices/progressSlice";
import { Line } from "rc-progress";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { space } from "postcss/lib/list";

const SubjectList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [viewAll, setViewAll] = useState<boolean>(false);
  const router = useRouter();



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

  const sliderSettings = {
    dots: false,
    infinite: false,
    scroll:false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          
        }
      },
      
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
    
      {
        breakpoint: 648,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  
  };

  return (
    <section className="bg-white rounded shadow p-5 my-4">
      <h3 className="text-lg font-bold mb-4">Subjects for Your Class</h3>
      <div className="flex w-full justify-end">
      <button
        onClick={() => setViewAll(!viewAll)}
        className="text-sky-500 underline font-semibold "
      >
        {viewAll ? "Show Less" : "View All"}
      </button>

      </div>
    
      {viewAll ? (
        <div className="overflow-x-auto  whitespace-nowrap ">
          <div className="flex gap-4 overflow-x-auto mt-4 ">
            {subjects.map((subject: any) => (
              <div
                key={subject.id}
                className="flex flex-col bg-sky-400 border rounded-lg px-4 pt-8 pb-4 mb-4 hover:shadow transition-shadow"
              >
                <div className="flex flex-col w-80  mb-2">
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
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {subjects.map((subject: any) => (
            <div
              key={subject.id}
              className="flex p-4 "
            >
              <div className="flex flex-col px-4 h-64 bg-sky-400 justify-between border rounded-lg pt-8 pb-4 hover:shadow transition-shadow">
              <div className="flex flex-col  mb-2">
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
                <Line
                  percent={parseFloat(getSubjectProgress(subject.id).toFixed(2))}
                  strokeWidth={4}
                  trailWidth={4}
                  strokeColor="#63A7D4"
                  trailColor="#CDE6F7"
                />
              </div>
              </div>
             
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default SubjectList;
