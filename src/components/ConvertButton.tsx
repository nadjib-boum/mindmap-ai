import { Loader2 } from "lucide-react";

const MindmapLoading = () => {

  return (
    <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
      <Loader2 className='h-3 w-3 animate-spin' />
      Mapping your ideas...
    </div>
  );

}

export default MindmapLoading;