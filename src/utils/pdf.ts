import pdfParse from 'pdf-parse';

class PDFUtil {

  async parsePDF (buffer: Buffer<ArrayBufferLike>) {

    // const bytes = await file.arrayBuffer();

    // const buffer = Buffer.from(bytes);
    
    const data = await pdfParse(buffer);

    console.log ("pdf data", data);

    const content = data.text;
    
    return content;
    
  }

}

const pdfUtil = new PDFUtil();

export default pdfUtil;