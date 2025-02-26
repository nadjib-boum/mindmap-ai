import { NextApiRequest, NextApiResponse } from "next";
import fileUtil from "@/utils/file";
import pdfUtil from "@/utils/pdf";
import aiUtil from "@/utils/ai";
import { isPDFValid } from "@/helpers";
import { mindmapSample } from "@/data";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {
    
    const files = await fileUtil.readFiles(req)

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

    const filepath = files[0].filepath;

    // const content = await pdfUtil.getPDFContent(filepath);

    // const text = await aiUtil.convertPDFtoStructuredText (content);

    // const mindmap = await aiUtil.convertTextToMindmap (text);

    const mindmap = mindmapSample;

    res.status(200).json({
      status: "success",
      data: {
        mindmap
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
