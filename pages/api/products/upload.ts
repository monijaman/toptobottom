import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
let mv = require('mv');
import User from 'models/Product';
import db from 'utils/db';
import Product from 'models/Product';

export const config = {
    api: {
        bodyParser: false,
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };
   
 
    const asyncParse = (req: NextApiRequest) =>
    new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({ multiples: true });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });

     

    const result = await asyncParse(req);
 
// Destructuring files 
   const {files:{file:allFiles}, fields = {}} = result
//    const {education: {school: {name}} = {}} = user;
 
    if (allFiles.length > 0) {

        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of allFiles) {
           const tempPath = file.filepath;
            //await fs.rename(tempPath, targetPath + file[1].originalFilename);
 
           await mv(tempPath, targetPath + file.originalFilename, { mkdirp: true }, function (err) {
                // done. it first created all the necessary directories, and then
                // tried fs.rename, then falls back to using ncp to copy the dir
                // to dest and then rimraf to remove the source dir
           });

        }
console.log(result.fields)
        // Save all data
        // const newProduct = new Product({
        //     name: req.body.name,
        //     price: req.body.email,
        //     categoty: req.body.categoty,
        //     color: req.body.username,
        //     brand:req.body.username,
        //     });
    
        //     const product = await newProduct.save();
        //     await db.disconnect();
    }

    res.status(status).json(resultBody);
}

export default handler;
