
type MindmapCanvasProps = {
  file: File | null;
}


const MindmapCanvas = ({ file }: MindmapCanvasProps) => {

  if (!file) return null;
  
  return (
    <div className="border border-dashed border-gray-300 h-3/4 w-3/4">
      <h1>MindmapCanvas</h1>
    </div>
  );
}

export default MindmapCanvas;