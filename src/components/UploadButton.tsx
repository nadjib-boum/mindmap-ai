import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const UploadButton = () => {

  return (
    <Button>
      <Upload strokeWidth={2.5} size={64} />
    </Button>
  );

}

export default UploadButton;