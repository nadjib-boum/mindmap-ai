import MindmapCanvas from "@/components/MindmapCanvas";
import ContentZone from "@/components/ContentZone";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-between items-center gap-10 px-10 py-20">
      <ContentZone />
      <MindmapCanvas />
    </div>
  );
}
