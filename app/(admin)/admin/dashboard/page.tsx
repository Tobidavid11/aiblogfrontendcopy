"use client";
import React, { useState } from "react";
import JobsDashboard from "@/components/admin/JobsDashboard";

const PostsDashboard = () => (
  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
    <p className="text-lg text-gray-500">
      Oops! Posts Dashboard is still under construction 🚧
    </p>
  </div>
);

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "posts">("jobs");

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb Navigation */}
      <div className="flex space-x-1 items-center bg-gray-50 p-2 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("jobs")}
          className="group relative px-4 py-2 rounded-md transition-colors duration-200"
        >
          <span
            className={`${
              activeTab === "jobs"
                ? "text-blue-600 font-medium"
                : "text-gray-600 group-hover:text-gray-800"
            }`}
          >
            Jobs
          </span>
          <span
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full transition-transform duration-200 ${
              activeTab === "jobs" ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className="group relative px-4 py-2 rounded-md transition-colors duration-200"
        >
          <span
            className={`${
              activeTab === "posts"
                ? "text-blue-600 font-medium"
                : "text-gray-600 group-hover:text-gray-800"
            }`}
          >
            Posts
          </span>
          <span
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full transition-transform duration-200 ${
              activeTab === "posts" ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
      </div>

      {/* Dashboard Content with Fade Transition */}
      <div
        key={activeTab}
        className="transition-opacity duration-200"
        style={{
          opacity: 1,
          animation: "fadeIn 0.2s ease-in",
        }}
      >
        {activeTab === "jobs" ? <JobsDashboard /> : <PostsDashboard />}
      </div>

      {/* Add the animation keyframes using a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
