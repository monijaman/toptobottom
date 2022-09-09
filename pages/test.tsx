import styles from "./index.module.scss";
import HorizontalCard from "components/HomeCard/horizontal-card";
import VerticalCard from "components/HomeCard/vertical-card";
import Products from "components/HomeProducts";
import Button from "components/FilterButton";

import Pagination from "@material-ui/lab/Pagination";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CircularProgress,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import type { NextPage } from "next";
import Layout from "components/Layout/";
// import axios from "axios";
import Axios from 'axios';
import Product from "models/Product";
import { InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { IProduct } from "types/index";
import db from "../utils/db";
import ImageSlider from 'components/ui/htmlInputElem/ImageSlider';
import CheckBox from 'components/ui/htmlInputElem/CheckBox';
import RadioBox from 'components/ui/htmlInputElem/RadioBox';
import SearchFeature from 'components/ui/htmlInputElem/SearchFeature';
import { categories, price } from 'data/filterdata';
import axios from "axios";
const queryString = require('querystring');

import { getProducts, updatFilter, selectFilterState } from "redux/filterSlice";


const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});


export default function paginationSSR({ pageNum, propCategory, prpPrice, prpSearch, prpLimit, prpTotalPages, prpDataSet }: props) {

  const dispatch = useDispatch();


  const { query } = useRouter();
  const classes = useStyles();
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(parseInt(query.page) || 1);
  const [dataResSet, setDataResSet] = useState(prpDataSet);
  const [totalPages, setTotalPages] = useState(prpTotalPages);
  const isMounted = useRef(false);
  
  const { isLoading, isError, isSuccess, dataSet, pagination, resetPage }
  = useSelector(selectFilterState)

  // let { search, category, price } = pagination;

  const [filterChange, setFilterChange] = useState(pagination?.category);
 
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState(isError);
  const [page, setPage] = useState(pageNumber);
  // const [totalPages, setTotalPages] = useState(pagination.totalPage);
 
  // const {  { isError, isSuccess } } = useSelector(selectFilterState);



 
  // const { state, dispatch } = useContext(StoreContext);
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(2)

  const [SearchTerms, setSearchTerms] = useState(prpSearch)
 

  useEffect(() => {


    let qString = queryString.stringify(pagination);
    router.push(`test/?${qString}`, undefined, { shallow: true });

     if (isMounted.current) {

      setDataResSet(dataSet)
      setPage(pagination.page);
      setTotalPages(pagination.totalPage);
    } else {
      isMounted.current = true;
    }
  
  }, [dataSet])

//   useEffect(() => {
//     if (isMounted.current) {
//       // setPage(1);
//       // setSkip(0)
//    } else {
     
//      isMounted.current = true;
//    }
 
//  }, [pagination])

 
  /* Invoked when pagination button is called */
  const handlePagination =   (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    setLoading(true);
    setPageNumber(parseInt(value));
 
 
    dispatch(updatFilter({page:value }  ))
// defining the object which will be stringified
 

// calling the stringify function with default delimiters
 
    //  let test = queryString.stringify({foo: ['one', 'two']}, {arrayFormat: 'colon-list-separator'});
    //  console.log(test)
    let qString = queryString.stringify(pagination);
  
    // let test = querystring.stringify(foo: [1, 2, 3], { arrayFormat: 'brackets', encode: false } );

    // let qString = querystring.stringify(pagination, { arrayFormat: 'brackets' });
    // console.log(test)
    // let qString = querystring.stringify(pagination, { arrayFormat: 'brackets', encode: false });
    // const res = await fetch(`/api/products/filter?${qString}`);

    // dispatch(getProducts())

    // const { data, pages: pages } = await res.json();
    dispatch(getProducts())
 
    setPage(value); 
    // setTotalPages(pagination.totalPage);
    // setProducts(data);
    setLoading(false);
    // console.log(totalPage)

  //  router.push(`test/?${qString}`, undefined, { shallow: true });

  }
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <div className={styles.header}>
              <h1 className={styles.title}>
                <span className={styles.emoji}>⚡</span>New In
              </h1>
              <div className={styles.headerButtons}>
                <Button type="sort" style={{ marginRight: 20 }} />
                <Button count={0} />
              </div>
            </div>
            <Grid container spacing={3}>
       {loading && (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) }

          {dataResSet.length > 0 ?   

          (dataResSet.map((product) => (
          
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>

                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product as IProduct)}>
                    Add to cart
                  </Button>
                </CardActions>
              </Card>

            </Grid>
          ))) : (
           
          <div>
           <h2>Sorry no data</h2>
          </div>
      
            )}
   </Grid>

          {/*    < Products >
            <HorizontalCard
              bgColor="#BCE7F0"
              title="Get up to 50% off"
              image="https://i.ibb.co/wL3nWkm/Pngtree-memphis-style-line-point-line-3797599.png"
              
            />
            <HorizontalCard
              bgColor="#dec8f3"
              image="https://i.ibb.co/qdY3T5g/kindpng-53319.png"
              title="New Jordan Series"
              desc="Best of daily wear"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="Hugo Boss Leather Jacket"
              image="https://i.ibb.co/ZK2L8cg/kisspng-fashion-model-hugo-boss-pinpoint-resource-of-oklah-mens-fashion-5a78e637c1bde9-3434957015178.png"
              price="300"
              sale_price="200"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="Polka-dotted slip dress"
              image="https://i.ibb.co/xmJdGXD/kisspng-slip-dress-clothing-casual-fashion-model-5abb4a319d2986-8864671115222236656438.png"
              price="200"
            />
          </Products>
          <Products reverse>
            <HorizontalCard
              bgColor="#FBE285"
              image="https://i.ibb.co/fd9gS8p/kisspng-model-fashion-photography-fashion-photography-model-5abb4a53e1f5b0-6067237715222236999256.png"
              title="New In Knitwear"
              desc="Layers. On. Layers"
            />
            <HorizontalCard
              bgColor="#F9CADA"
              image="https://i.ibb.co/db3Ww4J/kisspng-barbara-palvin-fashion-model-5b2b93c8c2c3a8-5507716115295825367978.png"
              title="New Season"
              desc="Reflect your style"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="CoolBrand Blouse"
              image="https://i.ibb.co/0hxvyPk/kisspng-odeya-rush-america-s-next-top-model-fashion-model-5ad7cae3ccf9c9-1015400915240916198396.png"
              price="100"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="NiceJeans Denim Shirt"
              image="https://i.ibb.co/dbqFKZT/kisspng-mikkel-gregers-jensen-denim-jeans-model-fashion-5b1e77ea4106c4-7687355115287234342664.png"
              price="150"
              sale_price="140"
            />
          </Products>
          <Products>
            <HorizontalCard
              bgColor="#99E6B0"
              image="https://i.ibb.co/0yKq1HK/kindpng-4043322.png"
              title="End of season"
              desc="Always sporty"
            />
            <HorizontalCard
              bgColor="#f3e6c8"
              image="https://i.ibb.co/68XpWPB/pngkey-com-ladies-purse-png-2499694.png"
              title="New Accessories"
              desc="Complete your combine"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="RandomBrand White Dress"
              image="https://i.ibb.co/yQqKVkR/kisspng-wedding-dress-bridesmaid-dress-5b17cb45c471f3-3928155515282860218047.png"
              price="150"
              sale_price="120"
            />

            <VerticalCard
              bgColor="#f6f6f6"
              name="ClothWorld Hooded Yellow Jacket"
              image="https://i.ibb.co/dtDfmFL/Kisspng-megan-fox-april-o-neil-teenage-mutant-ninja-turtle-april-5ac7c931c3d7f9-94147347152304260980.png"
              price="150"
            />
          </Products> */}
        </main>
      </div>
    </Layout>
 
    <Pagination
        count={totalPages}
        variant='outlined'
        color='primary'
        className='pagination'
        page={page}
        onChange={handlePagination}
      />
     
    </>
  );
}




export const getServerSideProps: GetServerSideProps = async (context) => {


  let propCategory = context.query["category"] ? (context.query["category"]).toString() : "all";
  
  let pageNum = context.query["page"] ? parseInt(context.query["page"]) : 1;
  let prpSearch = context.query["search"] ? context.query["search"].toString() : "";
  
  let prpPrice = context.query["price"] ? (context.query["price"]).toString() : "any";
  let prpLimit = context.query["limit"] ? parseInt(context.query["limit"]) : 2;
  let prpSkip = context.query["skip"] ? parseInt(context.query["skip"]) : 0;
 
console.log(propCategory)
  const API_URL = '/api/products/filter'
  let quertyString = {
    skip: prpSkip,
    limit: prpLimit,
    page: pageNum,
    price: prpPrice,
    search: '',
    category:[]
  }

  // const res = await fetch(`http://localhost:3000/api/products/filter`)
  // const data = await res.json()

  const res = await axios.get("http://localhost:3000/api/products/filter", {
    responseType: 'json',  
  params: {
      ...quertyString
    }
  })  // const data = await res 
  // const { dataSet, totalPage } = data
  let prpDataSet = res.data.dataSet
  let prpTotalPages = res.data.totalPage
  

  // console.log(response)
  // In this example, we might call a database or an API with given ID from the query parameters
  // I'll call a fake API to get the players name from a fake database
  // const res = await fetch(`https://baseball.com/api/getTeamFromPlayerId/${id}`);
  // const res = await fetch(`http://localhost:3000/ptest?page=1}`);
  //  const result = await res.text();
  //const { dataSet, serverPages: totalPages } = await res.json();
  // Return the ID to the component


  // await db.connect();
  // const products  = await Product.find({}).lean();
  // await db.disconnect();

  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
 
 
  return {
    props: {
      pageNum,
      prpSearch,
      propCategory,
      prpPrice,
      prpLimit,
      prpSkip,
      prpDataSet,
      prpTotalPages
      // products: products.map(db.convertDocToObj), 
    },
  };
};








/* import { InferGetServerSidePropsType } from 'next'

type Data = { ... }

export const getServerSideProps = async () => {
  const res = await fetch('https://.../data')
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve posts to type Data
}

export default Page
*/

// paginationSSR.getInitialProps = async ctx => {
//   const { dispatch } = ctx.store;

//   const res = await dispatch(getProducts())
//   const resSet  = res.payload;
// console.log(resSet)
//   return {
//     name: "Jairo",
//     weapons
//   };
// };
