import Mindmap from "@/components/Mindmap";

type MindmapCanvasProps = {
  isFileSet: boolean;
}


const MindmapCanvas = ({ isFileSet }: MindmapCanvasProps) => {

  if (!isFileSet) return null;
  
  return (
    <div className="border border-dashed border-gray-300 h-3/4 w-3/4">
      <Mindmap />
    </div>
  );
}

export default MindmapCanvas;