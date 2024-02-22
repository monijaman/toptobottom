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

    let status = 200;
    let   resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

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
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });


   
    // Destructure form data
    const string_to_slug =(str:string) =>{
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    }
    
    const { files, fields} = formData
    const jsonData:string = fields[0][1]
    const parsedData = JSON.parse(jsonData)
    const insertedFiles: string[] = []

  
    if (files?.length >0 ) {

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
      
        let puerSlug:string = string_to_slug(parsedData.name)
        let color  =  parsedData.colors;

       // if (parsedData.color === undefined || parsedData.color.length == 0) {
            //  color =  [];
      //  }
     

 // Example data to save
const exampleData = [
    { 
        "Red": 0,
        "Blue": 6
    }
];

const conds =  [
    {
     "id": "56a53ba04ce46bf01ae2bda7",
     "name": "First condition"             
    },
    {
     "id": "56a53bae4ce46bf01ae2bda8",
     "name": "Second condition"
    }
 ]

      
        const newProduct = new Product({
            name: parsedData.name,
            price: parsedData.price,
            slug:puerSlug,
            description: parsedData.description,
            image:insertedFiles.toString(),
            category: parsedData.category.toString(),
            // colors: exampleData,
          conditions: conds,
            // coloro: exampleData,
            brand:parsedData.brand,
            });
            console.log(newProduct)
       const product = await newProduct.save();
         console.log(product)
           await db.disconnect();
    }

    res.status(status).json(resultBody);
    
}

export default handler;
