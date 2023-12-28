'use client';
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";
import { ModalStore } from "@/hooks/use-modal-store";

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

const PrivacySettingsModal = () => {
  const { isOpen, onClose, type } = ModalStore();
  const isModalOpen = isOpen && type === "privacySettings";
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  }

  // TODO: Create the API endpoints for creating a server
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/server", values);
      form.reset();
      router.refresh();
      onClose();
    } catch {
      console.log("Error creating server")
    }
  };

  return (
    // TODO: Remove the X button from the dialog header
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden rounded-lg shadow-xl max-w-3xl w-full">
        <DialogHeader className="flex items-center justify-between p-4">
          <DialogTitle className="text-3xl font-bold py-2">Privacy Settings Modal</DialogTitle>
          <Dialog>Step 1 of 2</Dialog>
          <DialogClose className="text-gray-400 hover:text-gray-500" />
        </DialogHeader>
        <Form {...form}>
          <div className="flex flex-col p-4 space-y-4">
            <FormItem>
              <FormLabel className="font-semibold uppercase">Server Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="text"
                  placeholder="Enter a server name"
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-blue-500 focus-visible:ring-offset-gray-900"
                  {...form.register("name")}
                />
              </FormControl>
              <FormMessage className="text-red-600 font-semibold">{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel className="font-semibold uppercase">Server Description</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="text"
                  placeholder="Enter a server description"
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-blue-500 focus-visible:ring-offset-gray-900"
                  {...form.register("description")}
                />
              </FormControl>
              <FormMessage className="text-red-600 font-semibold">{form.formState.errors.description?.message}</FormMessage>
            </FormItem>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase font-semibold">Server Image</FormLabel>
                  {/* TODO: Change this to file upload */}
                  <FormControl>
                    <FileUpload
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold">{form.formState.errors.imageUrl?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="flex items-center justify-end p-4">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-900 hover:text-white text-white text-sm font-semibold"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Create Server
            </Button>
          </DialogFooter>
        </Form>
        {/* TODO: Below can be the preview */}
      </DialogContent>
      <Dialog />
    </Dialog>
  );
}

export default PrivacySettingsModal;