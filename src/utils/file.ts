import formidable from "formidable";
import type IncomingForm from "formidable/Formidable";
import type { NextApiRequest } from "next";

class FileUtil {

  private form: IncomingForm;

  constructor () {
    this.form = formidable({});
  }

  readFiles (req: NextApiRequest) {

    return new Promise<formidable.File[]>((resolve, reject) => {

      this.form.parse(req, (err, fields, files) => {
      
        if (err) return reject(err);

        if (!files.file) return reject (new Error("No file uploaded"));

        resolve(files.file);

      });

    })

  }

}

const fileUtil = new FileUtil();

export default fileUtil; 