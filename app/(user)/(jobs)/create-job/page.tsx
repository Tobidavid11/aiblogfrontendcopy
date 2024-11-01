"use client";

import CustomActions from "@/app/components/create-job/CustomActions";
import InstructionField from "@/app/components/create-job/InstructionField";
import ProgressBar from "@/app/components/create-job/ProgresBar";
import SocialActions from "@/app/components/create-job/SocialActions";
import { CustomFormField } from "@/components/shared";
import Button from "@/components/shared/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FormFieldType } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Control, Controller, FormProvider, useForm, useFormContext } from "react-hook-form";

import PlusIcon from "../../../../public/assets/icons/plus-icon.svg";
import { useRouter } from "next/navigation";
import { JobFormSchema, jobFormSchema } from "./schema";

interface StepsHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

interface StepsHeaderComponentProps {
  currentStep: number;
}

const StepsHeaderData: StepsHeaderProps[] = [
  {
    title: "Jobs Creation",
    description: "Define job details and set a date for the job.",
  },
  {
    title: "Rewards and Criteria",
    description:
      "Set rewards per task, maximum participants for task and the engagement level required.",
  },
  {
    title: "Enter Job details",
    description: "Create auto/custom tasks with flexible options.",
  },
];

interface CreateJobProps {
  control: Control<any>;
  nextStep: () => void;
}

// Form schema

// Engagement options
const EngagementLevels = [
  { option: "Low", value: "LOW" },
  { option: "Medium", value: "MEDIUM" },
  { option: "High", value: "HIGH" },
];

const apiURL = process.env.NEXT_PUBLIC_JOB_URL;

export default function CreateJob() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<JobFormSchema>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobTitle: "",
      description: "",
      engagementLevel: "",
      customActions: [],
      socialActions: [],
    },
  });

  const nextStep = async () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateJob = async (data: JobFormSchema) => {
    console.log("Final submission", data);
    const {
      jobTitle,
      startDate,
      endDate,
      description,
      instructionField,
      rewardPerParticipant,
      maxParticipants,
      socialActions,
      customActions,
    } = data;

    const accessToken = sessionStorage.getItem("accessToken");
    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiURL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          title: jobTitle,
          description,
          startDate: startDate.toISOString().slice(0, 10), // just the date e.g  2024-10-30
          endDate: endDate.toISOString().slice(0, 10), // just the date e.g  2024-10-30
          instruction: instructionField,
          maxParticipants,
          reward: rewardPerParticipant,
          socialActions,
          customActions,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }
      const { data } = await res.json();
      toast({ title: "Job created successfully." });
      router.push(`/jobs/${data.id}`);
    } catch {
      toast({ title: "An unexpected error occured. Please try again", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToDraft = (data: any) => {
    console.log("Added to draft", data);
  };

  return (
    <FormProvider {...form}>
      <div className="custom-scroll grid grid-cols-1 md:grid-cols-3 md:gap-x-16 px-4 md:px-14 2xl:px-[8rem]">
        <div className="md:col-span-2 mb-36">
          <Card className="bg-white shadow-none border-0 md:border md:border-[#e5e5e5] pb-8 md:p-8 rounded-none md:rounded-3xl">
            {/* mobile-nav */}
            <div className="flex md:hidden items-center justify-between my-6">
              {currentStep > 1 && (
                <span onClick={previousStep}>
                  <ArrowLeft color="#525252" className="w-5 h-5" />
                </span>
              )}

              <span className="text-base text-[#78C4FF] font-medium ml-auto">Drafts</span>
            </div>

            {/* Card Title */}
            <CardTitle className="mb-6">
              <StepsHeader currentStep={currentStep} />
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </CardTitle>

            {/* Card Content */}
            <CardContent
              className={`${
                currentStep === 3
                  ? "bg-white p-0"
                  : "bg-[#fafafa] p-4 md:p-6 border border-[#e5e5e5] rounded-2xl"
              } `}
            >
              <form onSubmit={form.handleSubmit(handleCreateJob)} id="form">
                {currentStep === 1 && <JobDetailsStep control={form.control} nextStep={nextStep} />}

                {currentStep === 2 && (
                  <RewardsAndCriteriaStep control={form.control} nextStep={nextStep} />
                )}

                {currentStep === 3 && <ReviewStep control={form.control} nextStep={nextStep} />}
              </form>
            </CardContent>

            {/* Buttons */}
            <div
              className={`flex items-center mt-6 md:mt-10 ${
                currentStep > 1 ? "justify-between flex-1" : "justify-center"
              }`}
            >
              {currentStep > 1 && (
                <span
                  onClick={previousStep}
                  className="hidden md:block cursor-pointer text-[#404040] text-base font-medium hover:text-[#e0ad14] transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wide"
                >
                  Back
                </span>
              )}
              <div className={`flex  flex-1 md:flex-none items-center gap-x-4`}>
                <Button
                  type="button"
                  onClick={handleAddToDraft}
                  size="medium"
                  color="primary"
                  variant="outline"
                  className="border-[#404040] font-normal text-[#404040] md:px-10 w-full md:w-fit"
                >
                  Save to draft
                </Button>

                {currentStep === totalSteps ? (
                  <Button
                    type="submit"
                    size="medium"
                    form="form"
                    disabled={isSubmitting}
                    color="secondary"
                    className="md:px-10 w-full md:w-fit"
                  >
                    {isSubmitting ? (
                      <div role="status">
                        <Loader2Icon className="animate-spin w-6 h-6 text-white" />
                        <span className="sr-only">Loading</span>
                      </div>
                    ) : (
                      <span className="font-normal text-[#262626] text-center">Publish Job</span>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    size="medium"
                    color="secondary"
                    className="md:px-10 w-full md:w-fit"
                  >
                    <span className="font-normal text-[#262626] text-center">Next</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Draft */}
        <Card className="hidden md:block p-0 bg-white rounded-2xl max-w-[25rem] h-[25rem] overflow-hidden sticky top-24">
          <div className="bg-[#FDF9D9] rounded-2xl px-3 py-6">
            <h2 className="font-bold text-lg text-[#262626]">Drafts</h2>
            <p className="text-sm text-[#404040]">
              Every description will be saved as drafts for recovery
            </p>
          </div>
          <CardContent>
            <div className="flex justify-center mt-[7rem]">
              <Image src="/images/draft.png" width={120} height={94} alt="draft" />
            </div>
            <div>
              <p className="text-sm text-center mt-2 text-[#737373]">
                You don&apos;t have any saved drafts yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}

// Steps header
const StepsHeader: React.FC<StepsHeaderComponentProps> = ({ currentStep }) => {
  const stepData = StepsHeaderData[currentStep - 1];
  const { title, description } = stepData;

  return (
    <div className="mb-4 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#171717] leading-none">{title}</h2>
      <p className="text-sm md:text-base font-normal text-[#404040] mt-1.5">{description}</p>
    </div>
  );
};

// Job Details Step
const JobDetailsStep: React.FC<CreateJobProps> = ({ control }) => {
  // const { handleSubmit } = useFormContext();

  // const onSubmit = async (data: any) => {
  //   // Perform any additional logic if needed
  //   nextStep();
  // };

  return (
    <div className="flex flex-col gap-6">
      <CustomFormField
        control={control}
        fieldType={FormFieldType.INPUT}
        name="jobTitle"
        label="Job Title"
        placeholder="Enter the job title you're hiring for..."
      />

      <div className="flex flex-col md:flex-row gap-6 md:gap-x-8">
        <CustomFormField
          control={control}
          fieldType={FormFieldType.DATE_PICKER}
          name="startDate"
          label="Start Date"
          placeholder="Choose a start date..."
          hasBorder
        />

        <CustomFormField
          control={control}
          fieldType={FormFieldType.DATE_PICKER}
          name="endDate"
          label="End Date"
          placeholder="Choose an end date..."
          hasBorder
        />
      </div>

      <CustomFormField
        control={control}
        fieldType={FormFieldType.TEXTAREA}
        name="description"
        label="Description"
        placeholder="Describe the job..."
      />
    </div>
  );
};

// Job Rewards and Criteria Step
const RewardsAndCriteriaStep: React.FC<CreateJobProps> = ({ control }) => {
  return (
    <div className="flex flex-col gap-6">
      <CustomFormField
        control={control}
        fieldType={FormFieldType.NUMBER}
        name="rewardPerParticipant"
        label="Rewards per Participants ETH"
        placeholder="Enter reward amount in ETH"
        hasBorder
      />

      <CustomFormField
        control={control}
        fieldType={FormFieldType.NUMBER}
        name="maxParticipants"
        label="Maximum Participants"
        placeholder="Enter maximum participants"
      />

      <CustomFormField
        control={control}
        fieldType={FormFieldType.SELECT}
        name="engagementLevel"
        label="Engagement Level"
        placeholder="Set engagement level"
      >
        {EngagementLevels.map(({ option, value }, key) => (
          <SelectItem key={key} value={value}>
            <p className="font-normal text-sm md:text-base text-[#404040]">{option}</p>
          </SelectItem>
        ))}
      </CustomFormField>
    </div>
  );
};

// Job Review Step
const ReviewStep: React.FC<CreateJobProps> = () => {
  const [activeForm, setActiveForm] = useState<"social" | "custom" | null>(null);
  const { control } = useFormContext<JobFormSchema>();

  const toggleForm = (formType: "social" | "custom") => {
    setActiveForm(activeForm === formType ? null : formType);
  };

  return (
    <div className="p-4 md:p-0 bg-[#fafafa] md:bg-transparent border border-[#e5e5e5] md:border-0 rounded-2xl">
      <div className="flex flex-col gap-y-6">
        <Controller
          render={({ field }) => (
            <InstructionField text={field.value || ""} onChange={field.onChange} />
          )}
          control={control}
          name="instructionField"
        />

        <Card className="bg-[#fafafa] shadow-none border border-[#e5e5e5] p-4 md:p-6 rounded-2xl">
          {activeForm === "social" && <SocialActions />}

          {activeForm === "custom" && <CustomActions />}

          <CardContent className="p-0">
            {/* Seperator */}
            <div className="flex items-center my-5 md:my-10 gap-x-4 md:gap-x-6">
              <Separator className="flex-1 bg-[#e5e5e5]" />
              <p className="font-normal text-sm md:text-base text-[#262626]">
                Select your action here
              </p>
              <Separator className="flex-1 bg-[#e5e5e5]" />
            </div>

            <div className="flex items-center gap-x-2 md:gap-x-6">
              {/* Social Actions Btn */}
              <Button
                onClick={() => toggleForm("social")}
                disabled={activeForm === "social"}
                type="button"
                className={cn(
                  "bg-white w-full flex-1 inline-flex items-center justify-center hover:bg-black/5 text-black p-2 md:p-3 shadow-md shadow-gray-400 transition-all duration-300 ease-in-out",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-x-1 md:gap-x-2">
                  <Image
                    src={PlusIcon}
                    alt="Plus"
                    width={50}
                    height={50}
                    className="w-[20px] md:w-[22px] h-[20px] md:h-[22px]"
                  />

                  <p className="text-[13px] md:text-base text-[#262626] font-normal">
                    Social Action
                  </p>
                </div>
              </Button>

              {/* Custom Action Btn  */}
              <Button
                onClick={() => toggleForm("custom")}
                type="button"
                disabled={activeForm === "custom"}
                className={cn(
                  "bg-white w-full flex-1 inline-flex items-center justify-center hover:bg-black/5 text-black p-2 md:p-3 shadow-md shadow-gray-400 transition-all duration-300 ease-in-out",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-x-1 md:gap-x-2">
                  <Image
                    src={PlusIcon}
                    alt="Plus"
                    width={50}
                    height={50}
                    className="w-[20px] md:w-[22px] h-[20px] md:h-[22px]"
                  />

                  <p className="text-[13px] md:text-base text-[#262626] font-normal">
                    Custom Action
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terms and conditions */}
      <div className="flex w-full md:w-[70%] text-left mt-4 md:mt-6">
        <p className="text-xs md:text-sm leading-5 md:leading-6 text-[#737373] cursor-default">
          By creating your job posting, you agree to our{" "}
          <strong className="font-medium cursor-pointer hover:underline text-[#262626]">
            Terms of Service
          </strong>{" "}
          and{" "}
          <strong className="font-medium cursor-pointer hover:underline text-[#262626]">
            Privacy Policy
          </strong>{" "}
          which outlines the practices of the job postings.{" "}
          <span className="text-[#FDC316] cursor-pointer hover:underline transition-all duration-500 ease-in-out">
            Learn more
          </span>
        </p>
      </div>
    </div>
  );
};
