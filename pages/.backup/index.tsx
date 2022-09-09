import styles from "./index.module.scss";
import Pagination from "@material-ui/lab/Pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CircularProgress,
  Button, Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import type { NextPage } from "next";
import Layout from "../components/Layout";
// import axios from "axios";
import Axios from 'axios';
import Product from "models/Product";
import { InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { additem, selectCartState } from "redux/cartSlice";
import { IProduct } from "types/index";
import db from "../utils/db";
import ImageSlider from 'components/ui/htmlInputElem/ImageSlider';
import CheckBox from 'components/ui/htmlInputElem/CheckBox';
import RadioBox from 'components/ui/htmlInputElem/RadioBox';
import SearchFeature from 'components/ui/htmlInputElem/SearchFeature';
import { categories, price } from 'data/filterdata';
import axios from "axios";
const querystring = require('querystring');


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


export default function paginationSSR({ pageNum, propCategory, prpPrice, prpSearch, prpLimit }: props) {
  const { query } = useRouter();
  const classes = useStyles();
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(parseInt(query.page) || 1);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(0);
  const { cart: { cartItems } } = useSelector(selectCartState);
  const dispatch = useDispatch();
  // const { state, dispatch } = useContext(StoreContext);
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(2)

  const [SearchTerms, setSearchTerms] = useState(prpSearch)


  const [Filters, setFilters] = useState({
    category: [],
    price: []
  })



  useEffect(() => {

    let propCat = propCategory.split(',');
    const newFilters = { ...Filters }
    newFilters['category'] = propCat;
    newFilters['price'] = prpPrice;


    setFilters(newFilters)
    showFilteredResults(newFilters)

  }, [])


  /* Add products to cart  */
  const addToCartHandler = async (product: IProduct) => {

    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch(additem({ ...product, quantity }))

  };


  /* Invoked when pagination button is called */
  const handlePaginationChange = async (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    setLoading(true);
    setPageNumber(parseInt(value));
 
    router.query.page = value;

    let qString = querystring.stringify(router.query);

    const res = await fetch(`/api/products/filter?${qString}`);

    const { data, pages: pages } = await res.json();

    setPage(value);
    setPages(pages);
    setProducts(data);
    setLoading(false);

    router.push(`/?${qString}`, undefined, { shallow: true });

  }
 
/* Response according handleFilters function or on load with useeffect */
  const showFilteredResults = (filters) => {

    // alert(JSON.stringify(filters, null, 4))
    setPage(1);
    setSkip(0)
    let queryParama = {
      skip: Skip,
      limit: Limit,
      page: pageNum,
      price: filters['price'],
      search: filters['search'],
      category: filters['category'].join(',')
    }

    getProducts(queryParama)

    router.push({
      pathname: '/',
      query: queryParama
    })

  }

  /* Get all data and set url query string */
  const getProducts = async (queryParama: any) => {

    let qString = querystring.stringify(queryParama);
    // alert(JSON.stringify(queryParama, null, 4) + "getproducts")
    setLoading(true);
    const res = await fetch(`/api/products/filter?${qString}`);

    const { data, pages: pages } = await res.json();
    setPages(pages)
   

    if (res.status == 200) {
      setProducts(data);
      setLoading(false);
     
    } else {
      setLoading(false);
      setProducts([]);
    }

  }
 

/* Functionaltiyr for controlling checkbox, radio and search */
  const handleFilters = (selFilters, filterType) => {

    const newFilters = { ...Filters }
    //  alert(JSON.stringify(selFilters, null, 4))


    if (filterType == "searchTerm") {
      newFilters['search'] = selFilters
    } else if (filterType === "category") {
      newFilters['category'] = selFilters
    } else if (filterType === "price") {
      newFilters['price'] = selFilters
    }


    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

 


  return (
    <>
      <Layout>
      <div className={styles.container}>
        <Head>
          <title>Cart Page</title>
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

           
        </main>

        <h1>Products</h1>

        <Typography component="h2" variant="h2">Filter</Typography>
        <div>
          categories
          <CheckBox
            list={categories} selectedChk={propCategory}
            handleFilters={chkFilters => handleFilters(chkFilters, "category")}
          />
        </div>
        <div>
          Price
          <RadioBox
            list={price} selectedRdo={prpPrice}
            handleFilters={rdoFilters => handleFilters(rdoFilters, "price")}
          />
        </div>
        <div>
          <SearchFeature
            searchTrm={prpSearch}
            refreshFunction={filters => handleFilters(filters, "searchTerm")}
          />
        </div>
 
        <Grid container spacing={3}>
          {loading && (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) }
 
          {products && products.length > 0? 
          
          (products.map((product) => (
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
          )))
          : 
          
          <h2>No Data</h2>
          
          }
        </Grid>
        </div>
      </Layout>


      <Pagination
        count={pages}
        variant='outlined'
        color='primary'
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />

    </>
  );
}




export const getServerSideProps: GetServerSideProps = async (context) => {
  let pageNum = context.query["page"] ? parseInt(context.query["page"]) : 1;
  let prpSearch = context.query["search"] ? context.query["search"].toString() : "";
  let propCategory = context.query["category"] ? (context.query["category"]).toString() : "all";
  let prpPrice = context.query["price"] ? (context.query["price"]).toString() : "any";
  let prpLimit = context.query["limit"] ? parseInt(context.query["limit"]) : 8;
  let prpSkip = context.query["skip"] ? parseInt(context.query["skip"]) : 0;


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



  return {
    props: {
      pageNum,
      prpSearch,
      propCategory,
      prpPrice,
      prpLimit,
      prpSkip
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