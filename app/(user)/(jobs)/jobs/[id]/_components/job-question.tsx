"use client";

import React, { useState, useRef } from "react";
import { ThumbsUp, MessageSquare, Share2, Check, ChevronLeftIcon } from "lucide-react";
import Sidebar from "./sideBarForJobQuestion";
import JobTextEditor from "@/components/shared/textAreaForJobQuestion";
import Button from "@/components/shared/button";
import { APIJobType } from "@/types/job";
import Link from "next/link";

type Question = {
  id: string;
  text: string;
  isAnswered: boolean;
  type: "open" | "multiple";
  options?: string[];
};

// const initialQuestions: Question[] = [
//   {
//     id: "1",
//     text: "What does data-driven growth mean for Legacy Ltd, and how has it impacted its overall business strategy?",
//     isAnswered: false,
//     type: "open",
//   },
//   {
//     id: "2",
//     text: "Can you provide an overview of how Legacy Ltd uses data to make key business decisions?",
//     isAnswered: false,
//     type: "open",
//   },
//   {
//     id: "3",
//     text: "What does data-driven growth mean for Legacy Ltd, and how has it impacted its overall business strategy?",
//     isAnswered: false,
//     type: "multiple",
//     options: [
//       "Data-driven growth means Legacy Ltd makes decisions based on market intuition, leading to sporadic growth and reactive strategies.",
//       "Data-driven growth refers to Legacy Ltd leveraging data to guide business decisions, leading to more informed strategies, improved customer engagement, and enhanced operational efficiency.",
//       "Data-driven growth for Legacy Ltd is about using customer feedback alone to shape their business strategy, without the need for other forms of data or analytics.",
//       "Data-driven growth at Legacy Ltd means relying on external consultants for data analysis and not integrating insights into everyday business operations.",
//     ],
//   },
//   {
//     id: "4",
//     text: "What types of data does Legacy Ltd collect, and how do they ensure data quality and relevance?",
//     isAnswered: false,
//     type: "open",
//   },
//   {
//     id: "5",
//     text: "What does data-driven growth mean, and how has it impacted its overall business strategy?",
//     isAnswered: false,
//     type: "open",
//   },
// ];

interface TaskQuestionsUIProps {
  job: APIJobType;
}
export default function TaskQuestionsUI({ job }: TaskQuestionsUIProps) {
  const initialQuestions: Question[] = job.customActions.map(
    ({ questionText, actionType, id, checkboxChoices }) => ({
      text: questionText,
      id,
      isAnswered: false,
      type: actionType === "checkbox" ? "multiple" : "open",
      options: actionType === "checkbox" ? checkboxChoices : undefined,
    })
  );

  const [questions, setQuestions] = useState<Question[]>(initialQuestions); // State for questions
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(questions[0]?.id);
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const selectQuestion = (id: string) => {
    setSelectedQuestionId(id);
  };

  const handleInputInteraction = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, isAnswered: true } : question
      )
    );
  };

  const renderQuestion = (question: Question) => (
    <div
      key={question.id}
      ref={(el: HTMLDivElement | null) => {
        if (el) questionRefs.current[question.id] = el;
      }}
      className="bg-white relative rounded-xl shadow-sm border p-4 border-[#E5E5E5]"
    >
      <h2 className="text-lg font-semibold mb-3 text-[#525252]">{question.text}</h2>
      {question.type === "open" ? (
        <div>
          <JobTextEditor onChange={() => handleInputInteraction(question.id)} />
        </div>
      ) : (
        <div className="space-y-2">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`option-${question.id}-${index}`}
                name={`option-${question.id}`}
                value={option}
                onChange={() => handleInputInteraction(question.id)} // Trigger on change
                className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`option-${question.id}-${index}`} className="text-sm text-[#737373]">
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex justify-end items-center md:hidden">
        {question.isAnswered && (
          <span className="flex items-center gap-2 text-[#78C4FF] ">
            <Check /> Answered{" "}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col relative md:flex-row rounded-xl gap-20 pt-10 sm:px-6 lg:px-8 justify-center">
      {/* Main Content */}
      <div className="bg-gray-100 rounded-xl p-6 max-w-2xl bg-white w-full flex flex-col">
        <Link
          href={`/jobs/${job.id}`}
          className="hover:bg-neutral-100 p-2 -ml-2 mb-2 rounded-xl flex items-center gap-1 w-fit"
        >
          <ChevronLeftIcon />
          <span>Back to Job</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-10">{job.title}</h1>

        {/* Display all questions */}
        <div className="overflow-y-scroll relative custom-scroll max-h-[60vh] flex flex-col justify-between grow">
          <div>{questions.map((question) => renderQuestion(question))}</div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-gray-600">
                <ThumbsUp className="w-6 h-6" />
                <span className="text-sm hidden md:block">Like</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm hidden md:block">Comment</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600">
                <Share2 className="w-6 h-6" />
                <span className="text-sm hidden md:block">Forward</span>
              </button>
            </div>
            <Button variant="solid" color="secondary">
              Publish <span className="pl-1 hidden md:inline">Your Answers</span>
            </Button>
          </div>
        </div>
      </div>
      <Sidebar
        questions={questions}
        selectedQuestionId={selectedQuestionId}
        onSelectQuestion={selectQuestion}
      />
    </div>
  );
}
