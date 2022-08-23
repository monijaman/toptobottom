import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await db.connect();


  try {
    let query = Product.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * pageSize;
    const total = await Product.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;
    await db.disconnect();
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
//   const products = await Product.find({});

// db.collection.aggregate( [
// { $match : { score : { $gt : 70, $lte : 90 } } },
// { $group: { _id: null, count: { $sum: 1 } } }

// ] );

// [
//     { $match : { score : { $gt : 70, $lte : 90 } } },
//     { $count: 'count' }
//     ] 
const currPage:number = req.query.page;
const dataLimit:number = req.query.page;

const products = await Product.aggregate([
    { $match : { price : { $gt : 70, $lte : 90 } } },
    { $group: { _id: null, count: { $sum: 1 } } },
    ] );


//     const result = await Product.aggregate([
//         { $match : { price : { $gt : 70, $lte : 90 } } },
//      //   {$sort: {[sort]:order}},
//    //     {$project: {password: 0, avatarData: 0, tokens: 0}},
//         {$facet:{
//             users: [{ $skip: +10 }, { $limit: +10}],
//             totalCount: [
//               {
//                 $sum: 1 
//               }
//             ]
//           }}
//         ]);
    //   console.log(JSON.stringify(result));
    //   console.log(result[0]);
    //  return res.status(200).json({users: result[0].users, total_count: result[0].totalCount[0].count});

  await db.disconnect();
//   const dataset:any = {};
//   dataset.results = products;
  // dataset.info.count = 121;
  return res.status(200).json({products: products, total_count: currPage});
//   res.send(products);
});

export default handler;


