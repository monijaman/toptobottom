// import Employee from "@/models/Employee";
// import "@/utils/dbConnect";

import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
let mv = require('mv');
import User from 'models/Product';
import db from 'utils/db';
import Product from 'models/Product';

 

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const producs = await Product.find({}).sort({
					createdAt: "desc",
				});

				return res.status(200).json({
					success: true,
					data: producs,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "POST":
			try {
				const producs = await Product.create(req.body);
				return res.status(201).json({
					success: true,
					data: producs,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};
