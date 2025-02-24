"use client";

import { useState } from "react";
import UploadDropzone from "@/components/Dropzone";
import MindmapCanvas from "@/components/MindmapCanvas";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  return (
    <div id="app" className="h-screen w-full " style={{ backgroundColor: "#f9f9f9" }}>
      <div className="h-full w-full flex justify-center items-center">
        <UploadDropzone setFile={setFile} isFileSet={!!file} />
        <MindmapCanvas isFileSet={!!file} />
      </div>
    </div>
  );
}
