import styles from "pages/index.module.scss";
import Pagination from "@material-ui/lab/Pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';

import type { NextPage } from "next";
import Layout from "components/Layout/adminLayout";
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
import CheckBtn from 'components/ui/htmlInputElem/CheckBtn';
import RadioPrice from 'components/ui/htmlInputElem/RadioPrice';
import SearchFeature from 'components/ui/htmlInputElem/SearchBtn';
import { categories, prices } from 'data/filterdata';
import axios from "axios";
const querystring = require('querystring');
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


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


export default function Products({ pageNum, propCategory, prpPrice, prpSearch, prpLimit }: props) {
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
  const [Limit, setLimit] = useState(12)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  /* Add products to cart  */
  const removeProduct = async (productId) => {

    const response = await fetch(`/api/products/crud/`, {
      method: 'DELETE',
      body: JSON.stringify({ data: productId })
    })
    if (response.status) {
      router.reload(window.location.pathname)
    }
 

  };


  /* Invoked when pagination button is called */
  const handlePaginationChange = async (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    setLoading(true);
    setPageNumber(parseInt(value));

    router.query.page = value;
    router.query.type = "server"
    let qString = querystring.stringify(router.query);

    const res = await fetch(`/api/products/filter?${qString}`);

    const { dataSet, totalPage: totalPage, count: count } = await res.json();
    setPages(totalPage)


    setPage(value);
    setProducts(dataSet);
    setLoading(false);

    router.push(`/admin/products/?${qString}`, undefined, { shallow: true });

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
      category: filters['category'].join(','),
      type: "server"
    }


    getProducts(queryParama)

    router.push({
      pathname: '/admin/products/',
      query: queryParama
    })

  }

  /* Get all data and set url query string */
  const getProducts = async (queryParama: any) => {

    let qString = querystring.stringify(queryParama);
    // alert(JSON.stringify(queryParama, null, 4) + "getproducts")
    setLoading(true);
    const res = await fetch(`/api/products/filter?${qString}`);

    const { dataSet, totalPage: totalPage, count: count } = await res.json();
    setPages(totalPage)


    if (res.status == 200) {
      setProducts(dataSet);
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
                <span className={styles.emoji}>⚡</span>Products
              </h1>
              <Link href="/admin/" >New Product</Link>
              <div className={styles.headerButtons}>
                <Button type="sort" style={{ marginRight: 20 }} />
                <Button count={0} />
              </div>
            </div>


          </main>

          <h1>Products</h1>

          <Typography component="h2" variant="h2">Filter</Typography>
          <div>
            <SearchFeature
              searchTrm={prpSearch}
              handleFilters={filters => handleFilters(filters, "searchTerm")}
            />
          </div>

          <div>
            Categories
            <CheckBtn
              list={categories} selectedChk={propCategory}
              handleFilters={chkFilters => handleFilters(chkFilters, "category")}
            />
          </div>

          <div>
            Price
            <RadioPrice
              list={prices} selectedRdo={prpPrice}
              handleFilters={rdoFilters => handleFilters(rdoFilters, "price")}
            />
          </div>


          <Grid container spacing={3}>
            {loading && (
              <div className={classes.loader}>
                <CircularProgress size="3rem" thickness={5} />
              </div>
            )}

            {products && products.length > 0 ?

              (products.map((product) => (

               
                  <Grid container   key={product._id} spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="{product.name}" src={"/images/" + product.image} />
                      </ButtonBase>
                    </Grid>
                    <Grid item  sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            Name: {product.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {product.description}
                          </Typography>
                          <Typography variant="body2"  >
                            Price: ${product.price}
                          </Typography>
                          <Typography sx={{ cursor: 'pointer' }} variant="body2">
                            Category: {product.category}
                          </Typography>

                        </Grid>
                        <Grid item>
                          

                          <NextLink href={`/admin/${product.slug}`} passHref>
                            Edit
                          </NextLink>
                          <Button size="small"
                            color="primary"
                            onClick={() => removeProduct(product._id)}>
                            Remove
                          </Button>

                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" component="div">
                          $19.00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
              
                // <Grid item md={4} key={product.name}>
                //   <Card>
                //     <NextLink href={`/product/${product.slug}`} passHref>
                //       <CardActionArea>
                //         <CardMedia
                //           component="img"
                //           image={product.image}
                //           title={product.name}
                //         ></CardMedia>
                //         <CardContent>
                //           <Typography>{product.name}</Typography>
                //         </CardContent>
                //       </CardActionArea>
                //     </NextLink>

                //     <CardActions>
                //       <Typography>${product.price}</Typography>
                //       <Button size="small"
                //         color="primary"
                //         onClick={() => addToCartHandler(product as IProduct)}>
                //         Add to cart
                //       </Button>
                //     </CardActions>
                //   </Card>

                // </Grid>
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






