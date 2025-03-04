'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchChaptersBySubjectId } from "../../../redux/slices/chapterSlice";
import Select from 'react-select';

type FormValues = {
  subjectId: any
  selectedChapters: { value: string; label: string }[];
  numQuestions: { value: string; label: string };
  difficulty: { value: string; label: string };
  timeLimit: { value: string; label: string };
};
type ExamFormProps = {
  currentSubject:any;
};

const ExamForm: React.FC<ExamFormProps> = ({ currentSubject }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      subjectId:currentSubject,
      selectedChapters: [],
      numQuestions: { value: '10', label: '10 Questions' },
      difficulty: { value: 'medium', label: 'Medium' },
      timeLimit: { value: '30', label: '30 Minutes' },
    },
  });
console.log("current subject",currentSubject)
  const { chapters, loading: chaptersLoading } = useSelector(
    (state: RootState) => state.chapters
  );

  const chapterOptions = chapters.map((chapter: any) => ({
    value: chapter.id,
    label: chapter.name,
  }));

  const onSubmit = (data: FormValues) => {
    const queryParams = new URLSearchParams({
      subjectId: currentSubject,
      selectedChapters: JSON.stringify(data.selectedChapters.map(ch => ch.label)),
      numQuestions: data.numQuestions.value,
      difficulty: data.difficulty.value,
      timeLimit: data.timeLimit.value,
    }).toString();
  
    router.push(`/mixedExam?${queryParams}`);
  };
  
  

  return (
    <div className="w-full lg:h-[550px] mx-auto">
      <h2 className="text-2xl font-medium text-center my-4">Setup Your Exam</h2>
      <p className="text-center text-md text-[#0D6BC9] bg-[#CBEBF6] mb-6 py-2">
        <strong>Choose Your Challenge</strong> - Select an Exam <br />& Test Your Knowledge!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-4 sm:w-3/4 mx-auto px-4">
          {/* Chapter Selection (Multi-Select) */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-2">
            <label className="lg:w-1/3 font-semibold">Select Chapters</label>
            <Controller
              name="selectedChapters"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={chapterOptions}
                  isMulti
                  isLoading={chaptersLoading}
                  className="w-full lg:w-2/3"
                  placeholder="Select chapters..."
                />
              )}
            />
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
