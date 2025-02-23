"use client";

import { useEffect } from "react"
import { Patrick_Hand } from "next/font/google";
import Dropzone from "react-dropzone"
import { Upload } from "lucide-react"
import Progress from "@/components/Progress"
import MindmapLoading from "@/components/ConvertButton";
import FileData from "@/components/FileData";
import { useUpload } from "@/hooks/use-upload";
import ExalicUpload from "../../public/exalic_upload.svg"

type UploadDropzoneProps = {
  setFile: (file: File) => void;
  isFileSet: boolean;
}

const headlineFont = Patrick_Hand({ weight: "400" });

const UploadDropzone = ({ setFile, isFileSet }: UploadDropzoneProps) => {

  if (isFileSet) return null;
  
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

    if (mutation.isSuccess) setFile (file!);

  }, [mutation.isSuccess])

  return (
    <Dropzone
      multiple={false}
      // noClick={true}
      onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className='w-[450px] h-[450px] cursor-pointer rounded-lg border-dashed border-gray-300'
          id="dropzone">
          <div className='flex items-center justify-center h-full w-full'>
            <div className='flex flex-col items-center justify-center'>
              <div className="mb-6 text-center">
              <span className={`text-5xl ${headlineFont.className}`}>Convert Boring Text To Beautiful Mindmaps</span>
              </div>
              <Upload strokeWidth={1.5} size={75} className='text-gray-800' />
              <img src={ExalicUpload.src} alt='upload arrow' className="relative left-32" width={270} />
              { file ? <FileData file={file} /> : null}
              
              <div className='w-full mt-4 max-w-xs mx-auto'>
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