import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await db.connect();

  try {

    const search = req.query.search || "";
    let category = req.query.category || "";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * pageSize;

   // let query = Product.find({ name: { $regex: search, $options: "i" } });

    let selPrice = req.query.price;
    const selPriceArray= selPrice.split(",")

    let min = selPriceArray[0];
    let max = selPriceArray[1]

  /*  Product.find({ 
      $or: [{ name: { $regex: search, $options: "i" } }, 
      { brand: { $regex: search, $options: "i" } }]    ,
    // , price: { $gt : min , $lt : max }
    price : { '$gt': 0, '$lt': 100}
  });*/

   // category = "Shirts";
  let query = Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } }, 
      { brand: { $regex: search, $options: "i" } }
    ],
    price: { $gt : min , $lt : max },
    // category: { $regex: category, $options: "i" } 
  });

     
  /*
  let query = Product.find({
    $or: [{ name: { $regex: search, $options: "i" } }, 
      { brand: { $regex: search, $options: "i" } }],
    price: { $gt : min , $lt : max }},(err, data) => {
    if (err){
        console.log(err);
    }
    else{
        console.log(data);
    }
  });
 */
  /*const dateBetweenDates = await Model.find({
    $or: [
      {
    $and: [
      { From: { $gte: DateFrom } },
      { To: { $lte: DateTo } },
    ],    // and operator body finishes
    },
      { _id: req.user.id},
    ], //Or operator body finishes
  })*/



    // const query = await Movie.find({ name: { $regex: search, $options: "i" } })
    //   .where("genre")
    //   .in([...genre])
    //   .sort(sortBy)
    //   .skip(page * limit)
    //   .limit(limit);

    let selcategory = category.split(",")
    // console.log(11212)

    // const total = await Product.countDocuments();


    // Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search, $options: "i" } }] });

    // const total = await Product.countDocuments()
    //   .where("category")
    //   .in([...selcategory]);

    // console.log(query.length)
    let total = 3;
    const pages = Math.ceil(total / pageSize);

    // console.log('category', selcategory)
    query = query
     .where("category")
     .in([...selcategory])
      .skip(skip)
      .limit(pageSize);

    /*      
    const dateBetweenDates = await Model.find({
        $or: [
          {
        $and: [
          { From: { $gte: DateFrom } },
          { To: { $lte: DateTo } },
        ],    // and operator body finishes
        },
          { _id: req.user.id},
        ], //Or operator body finishes
      })
*/
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No Data"
      });
    }

    const result = await query;

    await db.disconnect();
    
    res.status(200).json({
      category: selPriceArray,
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

  const currPage: number = req.query.page;
  const dataLimit: number = req.query.page;

  const products = await Product.aggregate([
    { $match: { price: { $gt: 70, $lte: 90 } } },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);


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
  return res.status(200).json({ products: products, total_count: currPage });
  //   res.send(products);
});

/*
handler.post("/getProducts", (req, res) => {
  db.connect();
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {

    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs)

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, products, postSize: products.length })
      })
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, products, postSize: products.length })
      })
  }

});

//IMDB_Clone_MERN_Stack
handler.put("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

*/
export default handler;


