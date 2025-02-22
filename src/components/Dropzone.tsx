"use client";

import { useEffect } from "react"
import Dropzone from "react-dropzone"
import { Cloud, File } from "lucide-react"
import Progress from "@/components/Progress"
import MindmapLoading from "@/components/ConvertButton";
import { useUpload } from "@/hooks/use-upload";
import { getPDFContent } from "@/helpers";

const UploadDropzone = () => {
  
  const {
    file,
    isUploading,
    isUploadDone,
    handleUpload,
    mutation
  } = useUpload();

  useEffect (() => {

    console.log(mutation.data);

  }, [mutation.isSuccess])

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        
        await handleUpload(acceptedFiles[0]);

      }}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className='h-full'>
          <div className='flex items-center justify-center h-full w-full'>
            <div className='flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                <p className='text-lg'>
                  <span className='font-semibold'>
                    Click to upload
                  </span>
                    or drag and drop
                </p>
              </div>

              {file ? (
                <div className='max-w-xs bg-white flex items-center overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <File className='h-4 w-4 text-blue-500' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {file.name}
                  </div>
                </div>
              ) : null}
              
              <div className='w-full mt-4 max-w-xs mx-auto'>
                {
                  isUploading ? <Progress /> : null
                }
                {
                  (isUploadDone && !isUploading ) ? <MindmapLoading /> : null
                }

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