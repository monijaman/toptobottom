import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import Product from 'models/Product';
import db from 'utils/db';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// const handler = nc < NextApiRequest, NextApiResponse> ();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();

    try {
        const multer = require('multer');

        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/')
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}_${file.originalname}`)
            },
            fileFilter: (req, file, cb) => {
                const ext = path.extname(file.originalname)
                if (ext !== '.jpg' || ext !== '.png') {
                    return cb(res.status(400).end('only jpg, png are allowed'), false);
                }
                cb(null, true)
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }

}

export default handler;
