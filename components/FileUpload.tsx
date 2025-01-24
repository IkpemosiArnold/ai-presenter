// components/FileUpload.tsx
"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  const [link, setLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setIsUploading(true);

    try {
      // Get pre-signed URL from API
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) throw new Error("Failed to get upload URL");

      const { id, url: presignedUrl } = await response.json();

      // Upload file directly to S3
      const s3Response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!s3Response.ok) throw new Error("Upload failed");

      setLink(`${window.location.origin}/presentation/${id}`);
    } catch (error) {
      console.error("Upload error:", error);
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
          <p>Drag 'n' drop a PDF or PPTX file here, or click to select</p>
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
