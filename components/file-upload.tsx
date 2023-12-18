'use client'
import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage"
}

const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {

  const fileType = value?.split(".").pop();

  if (value && fileType?.match(/(png|jpe?g|gif|svg)$/i)) {
    console.log("Image URL:", value);
    console.log("File Type:", fileType);

    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="Uploaded image"
          fill
          className="rounded-md"
        />
        {/* TODO: If the user clicks on the X Button the file must also be delete from uploadthing not only on the client side */}
        {/* TODO: Try and implement this solution: https://stackoverflow.com/questions/77426379/uploadthing-deleting-files*/}
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    );
  }

  return (
    <div className="cursor-pointer">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(err: Error) => {
          console.log(err);
        }}

        value={value}
      />

    </div>);
}

export default FileUpload;