import fs from "fs";
import pdfParse from 'pdf-parse';

class PDFUtil {

  private async _parsePDF (filepath: string) {

    const buffer = fs.readFileSync(filepath);
    
    const data = await pdfParse(buffer);

    return data;
    
  }

  async getPDFContent (filepath: string) {

    const pdfData = await this._parsePDF(filepath);

    return pdfData.text.trim();

  }

}

const pdfUtil = new PDFUtil();

export default pdfUtil;