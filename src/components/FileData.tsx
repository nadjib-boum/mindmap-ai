import { File } from "lucide-react"

type FileDataProps = {
  file: File;
}

const FileData = ({ file }: FileDataProps) => {

  return (
    <div className='max-w-xs bg-white flex items-center overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200 mt-3'>
      <div className='px-3 py-2 h-full grid place-items-center'>
        <File className='h-4 w-4 text-blue-500' />
      </div>
      <div className='px-3 py-2 h-full text-sm truncate'>
        {file.name}
      </div>
    </div>
  );

}

export default FileData;