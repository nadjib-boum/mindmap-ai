"use client";

import { useEffect } from "react"
import { Patrick_Hand } from "next/font/google";
import Dropzone from "react-dropzone"
import Progress from "@/components/Progress"
import MindmapLoading from "@/components/ConvertButton";
import FileData from "@/components/FileData";
import AutoType from "@/components/AutoType";
import UploadButton from "@/components/UploadButton";
import { useUpload } from "@/hooks/use-upload";
import ExalicUpload from "../../public/exalic_upload.svg"

type UploadDropzoneProps = {
  setMindmap: (input: any) => void;
  mindmap: any;
}

const headlineFont = Patrick_Hand({ weight: "400", subsets: ["latin"] });

const UploadDropzone = ({ setMindmap, mindmap }: UploadDropzoneProps) => {

  if (mindmap) return null;
  
  const {
    file,
    isUploading,
    isUploadDone,
    mutation,
    handleUpload,
  } = useUpload();

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) await handleUpload(acceptedFiles[0]);
    else console.warn ("No file uploaded");
  }

  useEffect (() => {

    if (mutation.isSuccess) {
      console.log(mutation.data.data.mindmap)
      setMindmap (mutation.data.data.mindmap)
    }

  }, [mutation.isSuccess])

  return (
    <Dropzone
      multiple={false}
      onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className='w-[500px] h-[500px] cursor-pointer rounded-lg border-dashed border-gray-300'
          id="dropzone">
          <div className='flex items-center justify-center h-full w-full'>
            <div className='flex flex-col items-center justify-center'>

              {
                !(isUploading || isUploadDone) &&
                  <>

                    <div className={`mb-8 text-center text-6xl ${headlineFont.className}`}>
                      <AutoType text={"Convert Boring Text To Beautiful Mindmaps"} />
                    </div>

                    <UploadButton />
                    <img src={ExalicUpload.src} alt='upload arrow' className="relative left-32" width={270} />
                    
                  </>
              }

              { file ? <FileData file={file} /> : null}

              <div className='w-[200px] mt-4 max-w-xs mx-auto'>
                { isUploading ? <Progress /> : ( isUploadDone ? <MindmapLoading /> : null ) }
              </div>

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
                onChange={(event) => handleUpload (event.target.files?.length ? event.target.files[0] : null)}
              />
              
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

export default UploadDropzone;