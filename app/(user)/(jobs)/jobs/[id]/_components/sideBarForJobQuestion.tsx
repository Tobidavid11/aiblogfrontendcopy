import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

type Question = {
  id: string;
  text: string;
  isAnswered: boolean;
};

type SidebarProps = {
  questions: Question[];
  selectedQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
};

export default function Sidebar({
  questions,
  selectedQuestionId,
  onSelectQuestion,
}: SidebarProps) {
  return (
    <div className="w-[450px] md:block hidden bg-white rounded-xl ml-6 fixed right-16 top-24 bottom-0 h-[500px]">
      <div className="bg-[#FDF9D9] p-6 rounded-t-xl">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        <p className="text-sm text-gray-600 mb-4">
          Every question has its own response details
        </p>
      </div>
      <div className="p-6">
        <ul className="space-y-2">
          {questions.map((question) => (
            <li
              key={question.id}
              className={`flex items-start space-x-2 p-2 rounded cursor-pointer ${
                selectedQuestionId === question.id ? "bg-[#fdfbf1]" : ""
              }`}
              onClick={() => onSelectQuestion(question.id)}
            >
              {question.isAnswered ? (
                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-800">
                {question.text.length > 60
                  ? `${question.text.substring(0, 60)}...`
                  : question.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
