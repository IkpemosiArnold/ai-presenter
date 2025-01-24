"use client";

import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import AIChat from "./AIChat";
import VoiceInteraction from "./VoiceInteraction";

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
        {fileUrl && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} />
          </Worker>
        )}
      </div>
      <div className="h-1/3 border-t">
        {isVoiceMode ? (
          <VoiceInteraction id={id} />
        ) : (
          <AIChat id={id} url={fileUrl} />
        )}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full"
        onClick={() => setIsVoiceMode(!isVoiceMode)}
      >
        {isVoiceMode ? "Switch to Chat" : "Switch to Voice"}
      </button>
    </div>
  );
}
