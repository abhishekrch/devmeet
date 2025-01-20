"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "./actions";
import { useParams } from "next/navigation";
import { Room } from "@/db";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; 

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  githubRepo: z.string().min(5).max(100),
  tags: z.string().min(3).max(50),

});

export function EditRoomForm({ room }: { room: Room }) {
  const params = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? "",
      githubRepo: room.githubRepo ?? "",
      tags: room.tags,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
       await editRoomAction({
        id: params.roomId as string,
        ...values,
      });
      toast({
        title: "Room Updated",
        description: "Your room was successfully updated",
      });
      router.push("/your-rooms");
    } catch (error) {
      console.error("Error updating room:", error);
      toast({
        title: "Error",
        description: "Failed to update the room. Please try again.",
      });
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="DevMeet" />
              </FormControl>
              <FormDescription>
                This is your public room name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="I'm working on a side project, come join me" />
              </FormControl>
              <FormDescription>
                Describe your room
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://github.com/abhishekrch"/>
              </FormControl>
              <FormDescription>
                Please put a link to project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="javascript, nextjs, solidity"/>
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries 
                so people people can find your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
