import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import User from 'models/User';
import { signToken } from 'utils/auth';
import db from 'utils/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  await db.connect();

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;