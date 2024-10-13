"use client";

import { saveToDraft } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Publish from "./publish";

const formSchema = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .min(3, "Category can't be less than 3 characters"),
  tags: z.string(),
});

export const PostConfig = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="order-1 md:order-2 bg-neutral-50 flex flex-col gap-3 font-dm-sans shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] rounded-2xl">
      <CardHeader>
        <Card className="shadow-none bg-palegoldenrod rounded-xl border-transparent flex flex-col gap-0">
          <CardHeader className="pb-4">
            <Select>
              <SelectTrigger className="bg-white rounded-xl py-6">
                <SelectValue
                  // className="bg-white"
                  placeholder="Ai Generated Content"
                />
                <SelectContent>
                  <SelectItem value="other">Other things</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </CardHeader>
          <CardContent className="pb-4">
            <Label>Paste Your Link here</Label>
            <Input
              className="rounded-xl bg-white text-neutral-400 mt-2 py-6"
              placeholder="https//Chatgpt.com/share"
            />
          </CardContent>
          <CardFooter>
            <Button className="rounded-full py-6 bg-text-color text-neutral-50">
              <Sparkles className="mr-2 h-5 w-5" /> Generate
            </Button>
          </CardFooter>
        </Card>
      </CardHeader>
      <CardContent>
        <Card className="shadow-none bg-neutral-100 border-transparent rounded-xl">
          <CardHeader className="">
            <div className="h-[180px] bg-white border-neutral-100 border flex items-center justify-center text-xl text-neutral-200 roundex-xl">
              Add Cover
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sports, Education, Web 3"
                          className="border border-neutral-200 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Tags here"
                          className="border border-neutral-200 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <Separator />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              formAction={saveToDraft}
              className="border-text-color text-neutral-700 font-medium rounded-full py-6 px-6"
              disabled
              variant={"outline"}
            >
              Save to draft
            </Button>
            <Publish />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};
