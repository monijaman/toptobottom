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


   const {files:{file:allFiles}, fields  = {}} = result
//    const {education: {school: {name}} = {}} = user;
 

    const targetPath = path.join(process.cwd(), `/uploads/`);
    try {
        await fs.access(targetPath);
    } catch (e) {
        await fs.mkdir(targetPath);
    }
    if(allFiles){

    if(Array.isArray(allFiles) && allFiles.length > 0){
       
        for (const file of allFiles) {
            const tempPath = file.filepath;
             //await fs.rename(tempPath, targetPath + file[1].originalFilename);
  
            await mv(tempPath, targetPath + file.originalFilename, { mkdirp: true }, function (err) {
                 // done. it first created all the necessary directories, and then
                 // tried fs.rename, then falls back to using ncp to copy the dir
                 // to dest and then rimraf to remove the source dir
            });
 
         }
    }else{
 
       const tempPath = allFiles.filepath; 
       await mv(tempPath, targetPath + allFiles.originalFilename, { mkdirp: true }, function (err) {
      });
    }

 //const  {data} = fields
 //const dataSet = JSON.parse(data)
 //console.log(allFiles.length)

    // if (allFiles.length > 0) {
 console.log(fields)
        // Save all data
        const newProduct = new Product({
            name: fields.name,
            price: fields.price,
            categoty: fields.categoty,
            color: fields.color,
            brand:fields.brand,
            });
    
            const product = await newProduct.save();
           await db.disconnect();
     
    }
    res.status(status).json(resultBody);
}

export default handler;
