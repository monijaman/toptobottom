import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
import { categories, prices } from 'data/filterdata';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await db.connect();

  try {

    let category = [];
    console.log(category)
    if (req.query.type && req.query.type == "server") {
      category = (req.query.category).split(",") || "all";
    } else {
      category = req.query['category[]'] || "all";
    }

    const search = req.query.search || "";
    // let category = req.query['category[]'] || "all";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 2;
    const priceSelected = req.query.price || 'any';
    const skip = (page - 1) * pageSize;

    let min = 0
    let max = 999999999999

    if (priceSelected != 'any') {
      let prices = priceSelected.split(",")
      min = prices[0]
      max = prices[1]
      console.log(555555)
    }


    if (category == 'all') {
      category = categories.map(catName => catName._id);
    }



    let query = Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ],
      price: { $gt: min, $lt: max },

    });


    const total = await Product.countDocuments({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ],
      price: { $gt: min, $lt: max },

    })
      .where("category")
      .in(category)



    const totalPage = Math.ceil(total / pageSize);

    if (page > totalPage) {
      return res.status(200).json({
        message: "No Data",
        category: category,
        status: "failed",
        count: total,
        pageSize,
        page,
        skip,
        totalPage,
        dataSet: [],
      });
    }


    // console.log('category', selcategory)
    query = query
      .where("category")
      .in(category)
      .skip(skip)
      .limit(pageSize);

    const result = await query;


    await db.disconnect();

    res.status(200).json({
      category: category,
      status: "success",
      count: total,
      page,
      skip,
      totalPage,
      dataSet: result,

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }


});

export default handler;


