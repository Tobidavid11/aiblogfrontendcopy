"use client";
import { z } from "zod";
import PostEditor from "./editor";
import { PostConfig } from "./post-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(165, "Title can't be more than 165 characters"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().min(1, "Tags is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string(),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported.",
    )
    .optional(),
});

export type FormValues = z.infer<typeof formSchema>;

const CreatePost = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      category: "",
      status: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] mt-8 gap-5">
          <PostEditor form={form} />
          <PostConfig form={form} onPublish={form.handleSubmit(onSubmit)} />
        </div>
      </form>
    </Form>
  );
};

export default CreatePost;
