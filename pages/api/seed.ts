import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import Product from '../../models/Product';
import User from "../../models/User";
import data from '../../utils/data';
import db from '../../utils/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;