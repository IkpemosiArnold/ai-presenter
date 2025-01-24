"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  const [link, setLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { id, url } = await response.json();
        const presentationLink = `${window.location.origin}/presentation/${id}`;
        setLink(presentationLink);
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
    },
    disabled: isUploading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>
            Drag 'n' drop a PDF or PPTX file here, or click to select a file
          </p>
        )}
      </div>
      {link && (
        <div className="mt-4">
          <p>Share this link:</p>
          <a
            href={link}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
