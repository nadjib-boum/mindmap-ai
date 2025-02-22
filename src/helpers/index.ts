import * as pdfjsLib from "pdfjs-dist";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// console.log ("version", pdfjsLib.version);

// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.js`;
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;



export const getPDFContent = (file: File) => {

  return new Promise ((resolve, reject) => {

    try {

      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      
      fileReader.onload = async () => {

        const arrayBuffer = fileReader.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer as ArrayBuffer }).promise;
    
        const output: any[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          output.push(textContent.items)
        }
    
        resolve(output);
  
      };

    } catch (err: any) {

      console.log (err);

      reject(err);

    }
  
  })

  
}