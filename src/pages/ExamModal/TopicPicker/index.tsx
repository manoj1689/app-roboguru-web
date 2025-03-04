'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // Corrected import for Next.js 13+
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

type FormValues = {
  subjectId:string;
  chapterId:string;
  selectedTopics: string[];
  numQuestions: { value: string; label: string };
  difficulty: { value: string; label: string };
  timeLimit: { value: string; label: string };
};

interface ExamFormProps {
  subjectId: string;
  chapterId: string;
}

const ExamForm: React.FC<ExamFormProps> = ({ subjectId, chapterId }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  
  const { topics, loading, error } = useSelector((state: RootState) => state.topics);

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      subjectId:subjectId,
      chapterId:chapterId,
      selectedTopics: [],
      numQuestions: { value: '10', label: '10 Questions' },
      difficulty: { value: 'medium', label: 'Medium' },
      timeLimit: { value: '30', label: '30 Minutes' },
    },
  });

  const selectedTopics = watch("selectedTopics") || [];

  // Toggle topics by name instead of ID
  const toggleTopic = (topicName: string) => {
    setValue(
      "selectedTopics",
      selectedTopics.includes(topicName)
        ? selectedTopics.filter((name) => name !== topicName)
        : [...selectedTopics, topicName]
    );
  };
console.log(chapterId,subjectId)
  const onSubmit = (data: FormValues) => {
    const queryParams = new URLSearchParams({
      subjectId:subjectId,
      chapterId:chapterId,
      selectedTopics: selectedTopics.join(","), // Pass topic names instead of IDs
      numQuestions: data.numQuestions.value,
      difficulty: data.difficulty.value,
      timeLimit: data.timeLimit.value,
    }).toString();
  
    router.push(`/mixedExam?${queryParams}`);
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-medium text-center my-4">Setup Your Exam</h2>
      <div>
        <p className="text-center text-md text-[#0D6BC9] bg-[#CBEBF6] mb-6 py-2">
          <strong>Choose Your Challenge</strong> - Select an Exam <br />& Test Your Knowledge!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-4 sm:w-3/4 mx-auto px-4">
          {/* Topic Selection */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-2">
            <label className="lg:w-1/3 font-semibold">Select Topics</label>
            <div className="border px-4 py-2 rounded w-full lg:w-2/3 text-[#424242] h-40 overflow-y-auto">
              {loading ? (
                <p>Loading topics...</p>
              ) : error ? (
                <p className="text-red-500">Error loading topics</p>
              ) : topics.length > 0 ? (
                topics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic.name)}
                      onChange={() => toggleTopic(topic.name)}
                    />
                    <span>{topic.name}</span>
                  </div>
                ))
              ) : (
                <p>No topics available.</p>
              )}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">No. of Questions</label>
            <Controller
              name="numQuestions"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: '10', label: '10 Questions' },
                    { value: '20', label: '20 Questions' },
                    { value: '30', label: '30 Questions' },
                  ]}
                  className="w-full lg:w-2/3"
                />
              )}
            />
          </div>

          {/* Difficulty Level */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">Difficulty Level</label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 'easy', label: 'Easy' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'hard', label: 'Hard' },
                  ]}
                  className="w-full lg:w-2/3"
                />
              )}
            />
          </div>

          {/* Time Limit Selection */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">Time Limit</label>
            <Controller
              name="timeLimit"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: '10', label: '10 Minutes' },
                    { value: '20', label: '20 Minutes' },
                    { value: '30', label: '30 Minutes' },
                    { value: '40', label: '40 Minutes' },
                    { value: '50', label: '50 Minutes' },
                  ]}
                  className="w-full lg:w-2/3"
                />
              )}
            />
          </div>
        </div>

        {/* Display Selected Topics */}
        {selectedTopics.length > 0 && (
          <div className="flex flex-wrap justify-center text-center text-lg font-semibold py-2 bg-[#EAEAEA]">
            <span className='text-[#0D6BC9] text-sm'>Selected Topics:</span>
            <span className="text-[#737373] text-sm ml-1">
              {selectedTopics.join(", ")}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center mt-4">
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-12 py-2 rounded-full shadow-md"
            >
              Continue
            </button>
            <button type="button" className="text-gray-500 px-6 py-2">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
