import fs from "node:fs";
import pdfParse from 'pdf-parse';

class PDFUtil {

  // async parsePDF (buffer: Buffer<ArrayBufferLike>) {
  async parsePDF (filepath: string) {

    const buffer = fs.readFileSync(filepath);
    
    const data = await pdfParse(buffer);

    const content = data.text;
    
    return content.trim();
    
  }

}

const pdfUtil = new PDFUtil();

export default pdfUtil;