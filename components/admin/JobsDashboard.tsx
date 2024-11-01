"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MoreVertical, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Job = {
  user: string;
  jobTitle: string;
  instruction: string;
  submissionDate: string;
  reward: number;
  status: "Pending" | "Approved";
  flagged: number;
};

type JobMetric = {
  header: string;
  number: number;
  percent: string;
  percentColor: string;
};

const JobsDashboard = () => {
  const jobMetrics: JobMetric[] = [
    {
      header: "Number of new job listings",
      number: 4000,
      percent: "+10% from last month",
      percentColor: "text-green-500",
    },
    {
      header: "Number of reported posts",
      number: 4000,
      percent: "-10% from last month",
      percentColor: "text-red-500",
    },
    {
      header: "Pending actions",
      number: 4000,
      percent: "+10% from last month",
      percentColor: "text-green-500",
    },
    {
      header: "Flagged Posts",
      number: 2500,
      percent: "+10% from last month",
      percentColor: "text-green-500",
    },
  ];

  const jobs: Job[] = [
    {
      user: "@Mira",
      jobTitle: "Follow Horizon Tech on Twitter",
      instruction: "Follow @HorizonTech...",
      submissionDate: "Oct 27, 2024",
      reward: 50,
      status: "Pending",
      flagged: 0,
    },
    {
      user: "@Avi",
      jobTitle: "Subscribe to ByteWorks' Youtube",
      instruction: "Subscribe @ByteWorks...",
      submissionDate: "Oct 26, 2024",
      reward: 75,
      status: "Pending",
      flagged: 0,
    },
    {
      user: "@Temi",
      jobTitle: "Share Product Link",
      instruction: "Share FinEdge Solutions' link...",
      submissionDate: "Oct 25, 2024",
      reward: 30,
      status: "Pending",
      flagged: 32,
    },
    {
      user: "@Temi",
      jobTitle: "Like & Comment on Post",
      instruction: "Engage with Spark Digital...",
      submissionDate: "Oct 25, 2024",
      reward: 30,
      status: "Approved",
      flagged: 0,
    },
    {
      user: "@Temi",
      jobTitle: "Leave App Review",
      instruction: "Review Insightful Data App....",
      submissionDate: "Oct 25, 2024",
      reward: 100,
      status: "Pending",
      flagged: 2222,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <CardContent className="space-y-2 p-0">
              <p className="text-sm text-muted-foreground">{metric.header}</p>
              <p className="text-3xl font-bold">
                {metric.number.toLocaleString()}
              </p>
              <p className={metric.percentColor}>{metric.percent}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Review Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Job Review</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage Jobs & Track Activity
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex items-center w-full md:w-auto">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company"
                  className="pl-10 w-full md:w-[300px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Date</DropdownMenuItem>
                  <DropdownMenuItem>Deadline</DropdownMenuItem>
                  <DropdownMenuItem>Payment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-4 text-sm font-medium">User</th>
                  <th className="p-4 text-sm font-medium">Job Title</th>
                  <th className="p-4 text-sm font-medium">Instruction</th>
                  <th className="p-4 text-sm font-medium">Submission Date</th>
                  <th className="p-4 text-sm font-medium">Reward</th>
                  <th className="p-4 text-sm font-medium">Status</th>
                  <th className="p-4 text-sm font-medium">Quick Actions</th>
                  <th className="p-4 text-sm font-medium">Flagged</th>
                  <th className="p-4 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td className="p-4 text-sm">{job.user}</td>
                    <td className="p-4 text-sm">{job.jobTitle}</td>
                    <td className="p-4 text-sm">{job.instruction}</td>
                    <td className="p-4 text-sm">{job.submissionDate}</td>
                    <td className="p-4 text-sm">{job.reward} points</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            job.status === "Pending"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        />
                        {job.status}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <button
                        className={`px-4 py-2 text-sm font-medium rounded-lg  ${
                          job.flagged > 0
                            ? " text-red-800 border border-red-300"
                            : " text-green-800 border border-green-300"
                        }`}
                      >
                        {job.flagged > 0 ? "Review" : "Approve"}
                      </button>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            job.flagged > 0 ? "bg-red-500" : "bg-green-500"
                          }`}
                        />
                        {job.flagged}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsDashboard;
