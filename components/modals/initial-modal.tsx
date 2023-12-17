'use client';
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormDescription,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Your server name must be at least 2 characters long",
  }),
  description: z.string().min(20, {
    message: "Your server description must be at least 20 characters long",
  }),
  imageUrl: z.string().min(2, {
    message: "Server requires an image",
  }),
});


// TODO: Add a preview of the server fields, and a button to create the server
{/* FIXME: "Hydration Error... */ }

const InitialModal = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // TODO: Create the API endpoints for creating a server
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden rounded-lg shadow-xl max-w-3xl w-full">
        <DialogHeader className="flex items-center justify-between p-4">
          <DialogTitle className="text-3xl font-semibold">Customize Server</DialogTitle>
          <DialogClose className="text-gray-400 hover:text-gray-500" />
        </DialogHeader>
        <Form {...form}>
          <div className="flex flex-col p-4 space-y-4">
            <FormItem>
              <FormLabel className="font-semibold">Server Name</FormLabel>
              <Input
                disabled={isLoading}
                type="text"
                placeholder="Enter a server name"
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-blue-500 focus-visible:ring-offset-gray-900"
                {...form.register("name")}
              />
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel className="font-semibold">Server Description</FormLabel>
              <Input
                disabled={isLoading}
                type="text"
                placeholder="Enter a server description"
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-blue-500 focus-visible:ring-offset-gray-900"
                {...form.register("description")}
              />
              <FormMessage>{form.formState.errors.description?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Server Image</FormLabel>
              {/* TODO: Change this to file upload */}
              <Input
                type="text"
                placeholder="Enter a server image url"
                {...form.register("imageUrl")}
              />
              <FormMessage>{form.formState.errors.imageUrl?.message}</FormMessage>
            </FormItem>
          </div>
          <DialogFooter className="flex items-center justify-end p-4">
            <Button
              type="submit"
              className="bg-emerald-600/90 hover:bg-emerald-800/90 hover:text-white text-gray-900 text-sm font-semibold"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Create Server
            </Button>
          </DialogFooter>
        </Form>
        {/* TODO: Below can be the preview */}

        {/* <DialogFooter className="flex items-center justify-end p-4">
          <button className="btn btn-primary">Get Started</button>
        </DialogFooter> */}
      </DialogContent>
      <Dialog />
    </Dialog>
  );
}

export default InitialModal;