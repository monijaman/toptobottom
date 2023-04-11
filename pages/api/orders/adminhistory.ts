import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find();
  res.send(orders);
});

export default handler;