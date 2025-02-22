import path from "node:path";
import formidable from "formidable";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isPDFValid = (file: formidable.File) => {

  const mimeType = file.mimetype;
  const filename = file.originalFilename;

  if (!mimeType || !filename) {
    return false;
  }

  const validMimeType = file.mimetype === "application/pdf";
  const validExtension = path.extname(filename).toLowerCase() === ".pdf";

  return validMimeType && validExtension;
}