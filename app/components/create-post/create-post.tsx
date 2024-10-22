"use client";
import { z } from "zod";
import PostEditor from "./editor";
import { PostConfig } from "./post-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { createBlogSchema } from "@/schemas/blog";
import { postBlogAction } from "@/actions/blog";
import { useServerAction } from "zsa-react";

export type FormValues = z.infer<typeof createBlogSchema>;

const CreatePost = () => {
  const { execute, isPending } = useServerAction(postBlogAction, {
    onError({ err }) {
      console.log("something went wrong");
    },
    onSuccess() {
      console.log("Successful");
    },
  });
  const form = useForm<FormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      category: "",
      status: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // const [data, err] = await postBlogAction({
    //   coverImage: values.coverImage,
    //   status: values.status,
    //   category: values.category,
    //   tags: values.tags,
    //   content: values.content,
    //   title: values.title,
    // });
    console.log(values);
    navigator.clipboard.writeText(values.content);

    // const formData = new FormData();
    // if (values.coverImage) {
    //   formData.append("file", values.coverImage);
    // }
    //
    // await execute({
    //   fileWrapper: formData,
    //   status: "published",
    //   category: values.category,
    //   tags: values.tags,
    //   content: values.content,
    //   title: values.title,
    // }).then(() => {});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] mt-8 gap-5">
          <PostEditor form={form} />
          <PostConfig form={form} onPublish={form.handleSubmit(onSubmit)} />
        </div>
      </form>
      <div>{form.getValues("content")}</div>
    </Form>
  );
};

export default CreatePost;
