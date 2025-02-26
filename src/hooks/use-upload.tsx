import { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { sleep } from "@/helpers";

type SuccessAPIResponse<T = any> = {
  status: "success";
  data: T
}

type UploadResponse = SuccessAPIResponse<{
  mindmap: string;
}>

export const useUpload = () => {

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/mindmap", {
        method: "POST",
        body: formData
      })
      const data = await res.json();
      return data as UploadResponse;
    }
  });
  const [ file, setFile ] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isUploadDone, setIsUploadDone] = useState<boolean>(false);

  const handleUpload = (async (file: File | null) => {

    if (!file) throw new Error ("FILE_NOT_FOUND");

    setFile(file);

    setIsUploading(true)

    const formData = new FormData();

    formData.append("file", file);

    await sleep(1500);
    
    mutation.mutate (formData);

    setIsUploadDone(true);

    setIsUploading(false);

  }); 

  return {
    file,
    isUploading,
    isUploadDone,
    handleUpload,
    mutation,
  }

}

