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

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

    /* Get files using formidable */
    const formData = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        const fields: ProcessedFiles = [];
     
        form.on('file', function (field, file) {
            files.push([field, file]);
        })

        form.on('field', function (field, value) {
            fields.push([field, value]);
        })
        form.on('end', () => resolve({files, fields}));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            //fields.push
        });
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });

    // Destructure form data
    
    
    const { files, fields} = formData
    const jsonData:string = fields[0][1]
    // console.log(fields[0][1])
    const parsedData = JSON.parse(jsonData)
    const insertedFiles: string[] = []
    if (parsedData) {

        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/public/images/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of files) {
           const tempPath = file[1].filepath;
           insertedFiles.push(file[1].originalFilename)
            //await fs.rename(tempPath, targetPath + file[1].originalFilename);
            await mv(tempPath, targetPath + file[1].originalFilename, { mkdirp: true }, function (err) {
                // done. it first created all the necessary directories, and then
                // tried fs.rename, then falls back to using ncp to copy the dir
                // to dest and then rimraf to remove the source dir
           });

        }

      //  let puerSlug:string = string_to_slug(parsedData.name)
     
        
            
            const filter = { _id: parsedData.prodId };
            
           const update = {     
            name: parsedData.name,
            price: parsedData.price,
            image:insertedFiles.toString(),
            description: parsedData.description,
            category: parsedData.category.toString(),
            colors: parsedData.color,
            brand:parsedData.brand
         }
       
         //console.log(parsedData)
            let product = await Product.findOneAndUpdate(filter, update, {
                new: true
              });
           
       // console.log(product)
         // const product = await newProduct.save();
           await db.disconnect();
    }

    res.status(status).json(resultBody);
}

export default handler;
