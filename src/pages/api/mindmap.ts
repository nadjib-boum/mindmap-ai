import { NextApiRequest, NextApiResponse } from "next";
import pdfUtil from "@/utils/pdf";
import formUtil from "@/utils/form";
import { isPDFValid } from "@/helpers";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {
    
    const files = await formUtil.readFiles(req)

    if (files.length === 0) return res.status(400).json({
      status: "error",
      error: {
        message: "No file uploaded"
      }
    });

    if (!isPDFValid (files[0])) {
      return res.status(400).json({
        status: "error",
        error: {
          message: "Invalid file type"
        }
      });
    }

    const content = await pdfUtil.parsePDF(files[0].filepath);

    res.status(200).json({
      status: "success",
      data: {
        content
      }
    });
  
  } else {
  
    res.status(405).end({
      status: "error",
      error: {
        message: `Invalid Request`
      }
    });
  
  }

}
