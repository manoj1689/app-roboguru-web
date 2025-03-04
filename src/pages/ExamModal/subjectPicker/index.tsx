'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type OptionType = { label: string; value: string };

type FormValues = {
  examType: OptionType;
  subjects: OptionType[];
  numQuestions: OptionType;
  difficulty: OptionType;
};

const ExamForm = () => {
  const { subjects = [] } = useSelector((state: RootState) => state.subjects || {});
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      examType: { label: 'Monthly', value: 'Monthly' },
      subjects: [],
      numQuestions: { label: '10 Questions', value: '10' },
      difficulty: { label: 'Medium', value: 'Medium' },
    },
  });

  const subjectOptions = subjects.map((subject) => ({
    label: subject.name,
    value: subject.name,
  }));

  const examTypeOptions = [
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Daily', value: 'Daily' }
  ];

  const numQuestionsOptions = [
    { label: '10 Questions', value: '10' },
    { label: '20 Questions', value: '20' },
    { label: '30 Questions', value: '30' }
  ];

  const difficultyOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' }
  ];

  const selectedSubjects = watch("subjects") || [];

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="w-full lg:h-[550px]  mx-auto">
      <h2 className="text-2xl font-medium text-center my-4">Setup Your Exam</h2>
      <p className="text-center text-md text-[#0D6BC9] bg-[#CBEBF6] mb-6 py-2">
        <strong>Choose Your Challenge</strong> - Select an Exam & Test Your Knowledge!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-4 sm:w-3/4 mx-auto p-4">
          
          {/* Exam Type (Single Select) */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">Exam Type</label>
            <Controller
              name="examType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={examTypeOptions}
                  className="w-full lg:w-2/3"
                  placeholder="Select exam type..."
                  onChange={(selected) => field.onChange(selected)}
                />
              )}
            />
          </div>

          {/* Subjects (Multi-Select) */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">Select Subjects</label>
            <Controller
              name="subjects"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={subjectOptions}
                  isMulti
                  className="w-full  lg:w-2/3"
                  placeholder="Select subjects..."
                  onChange={(selected) => field.onChange(selected)}
                />
              )}
            />
          </div>

          {/* Number of Questions (Single Select) */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">No. of Questions</label>
            <Controller
              name="numQuestions"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={numQuestionsOptions}
                  className="w-full lg:w-2/3"
                  placeholder="Select number of questions..."
                  onChange={(selected) => field.onChange(selected)}
                />
              )}
            />
          </div>

          {/* Difficulty Level (Single Select) */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <label className="lg:w-1/3 font-semibold">Difficulty Level</label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={difficultyOptions}
                  className="w-full lg:w-2/3"
                  placeholder="Select difficulty level..."
                  onChange={(selected) => field.onChange(selected)}
                />
              )}
            />
          </div>
        </div>

        {/* Display Selected Subjects */}
        {selectedSubjects.length > 0 && (
          <div className="flex w-full justify-center text-center text-lg font-semibold py-2 bg-[#EAEAEA]">
            <span className='text-[#0D6BC9] text-sm'>Selected Subjects: </span>
            <span className="text-[#737373] text-sm ml-1">
              {selectedSubjects.map(sub => sub.label).join(", ")}
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
