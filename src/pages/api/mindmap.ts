import { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs";
import formidable from "formidable";
import pdfUtil from "@/utils/pdf";
import formUtil from "@/utils/form";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {
    
    const files = await formUtil.readFiles(req)

    if (files.length === 0) {
      res.status(400).json({ message: "No File Uploaded" });
    }

    const pdfFile = fs.readFileSync(files[0].filepath);

    const content = pdfUtil.parsePDF(pdfFile);

    console.log("content", content);

    res.status(200).json({ message: "This is a POST request" });
  
  } else {
  
    res.status(405).end(`Method ${req.method} Not Allowed`);
  
  }

}
