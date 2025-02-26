"use client";

import { useState } from "react";
import UploadDropzone from "@/components/Dropzone";
import MindmapCanvas from "@/components/MindmapCanvas";

export default function Home() {

  const [mindmap, setMindmap] = useState<any>(null);

  return (
    <div id="app" className="h-screen w-full " style={{ backgroundColor: "#f9f9f9" }}>
      <div className="h-full w-full flex justify-center items-center">
        <UploadDropzone setMindmap={setMindmap} mindmap={mindmap} />
        <MindmapCanvas mindmap={mindmap} />
      </div>
    </div>
  );
}
