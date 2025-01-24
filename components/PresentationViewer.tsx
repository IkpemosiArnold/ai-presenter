"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "@react-pdf-viewer/core/lib/styles/index.css";
import AIChat from "./AIChat";

// Dynamically import the PDF viewer with SSR disabled
const PDFViewer = dynamic(() => import("./PDFViewerComponent"), { ssr: false });

export default function PresentationViewer({ id }: { id: string }) {
  const [fileUrl, setFileUrl] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const response = await fetch(`/api/file/${id}`);
        if (response.ok) {
          const { url } = await response.json();
          setFileUrl(url);
        } else {
          throw new Error("Failed to fetch file URL");
        }
      } catch (error) {
        console.error("Error fetching file URL:", error);
        setError("Failed to load the presentation. Please try again later.");
      }
    };
    fetchFileUrl();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        {fileUrl && <PDFViewer fileUrl={fileUrl} />}
      </div>
      <div className="h-1/3 border-t">
        <AIChat id={id} url={fileUrl} />
      </div>
    </div>
  );
}
