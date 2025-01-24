"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl={fileUrl} />
    </Worker>
  );
}
