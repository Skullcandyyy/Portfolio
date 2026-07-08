"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Loading resume...</p>
    </div>
  ),
});

export default function ResumePage() {
  return <PDFViewer />;
}
