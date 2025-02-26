import Mindmap from "@/components/Mindmap";

type MindmapCanvasProps = {
  mindmap: any;
}


const MindmapCanvas = ({ mindmap }: MindmapCanvasProps) => {

  console.log ("mindmap", mindmap)

  if (!mindmap) return null;
  
  return (
    <div className="border border-dashed border-gray-300 h-full w-full">
      <Mindmap mindmap={mindmap} />
    </div>
  );
}

export default MindmapCanvas;