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
  makeStyles,
  Typography
} from "@material-ui/core";

import Layout from "components/Layout/";
import { InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "types/index";
import axios from "axios";
const queryString = require('querystring');
import { getProducts, updatFilter, selectFilterState } from "redux/filterSlice";
import Product from "models/Product";


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


export default function HomePage({ prpTotalPages, prpDataSet }: props) {

  const dispatch = useDispatch();
  const { query } = useRouter();
  const classes = useStyles();
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(parseInt(query.page) || 1);
  const [dataResSet, setDataResSet] = useState(prpDataSet);
  const [totalPages, setTotalPages] = useState(prpTotalPages);
  const isMounted = useRef(false);

  const { isLoading, isError, dataSet, pagination }
    = useSelector(selectFilterState)


  const [loading, setLoading] = useState(isLoading);

  const [page, setPage] = useState(pageNumber);


  useEffect(() => {

    if (isMounted.current) {
      let qString = queryString.stringify(pagination);
      router.push(`?${qString}`, undefined, { shallow: true });

      setDataResSet(dataSet)
      setPage(pagination?.page);
      setTotalPages(pagination?.totalPage);
    } else {
      // dispatch(updatFilter())
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSet])

  /* Invoked when pagination button is called */
  const handlePagination = (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    setLoading(true);
    setPageNumber(parseInt(value));
    dispatch(updatFilter({ page: value }))
    dispatch(getProducts())
    setPage(value);
    setLoading(false);
  }

  let colors = ["#f6f6f6", "#e6eaed", "#f3f0e8", "#d8f1ff", "#fbf7e9"]
  let partComponents = [];

  for (let i = 0; i < 3; i++) {
    partComponents[i] = []
    let color = colors[(Math.random() * colors.length) | 0]
    let horizontal = 0;
    for (let j = i * 4; j < (i + 1) * 4; j++) {

      if (dataResSet[j]) {
        let imgpath = "/images/"+dataResSet[j].image
        //partComponents[i].push(dataResSet[j].name)
        if (horizontal < 2) {

         
          partComponents[i].push(
            <HorizontalCard key={dataResSet[j]}
              bgColor={color}
              title={dataResSet[j].name}
              image={imgpath}
              desc="Best of daily wear"
              price={dataResSet[j].price}
              sale_price="140"
              slug={dataResSet[j].slug}
              product={dataResSet[j]}
            />

          )
        } else {
          partComponents[i].push(
            <VerticalCard key={dataResSet[j]}
              bgColor={color}
              name={dataResSet[j].name}
              image={imgpath}
              sale_price="200"
              price={dataResSet[j].price}
              slug={dataResSet[j].slug}
              product={dataResSet[j]}
            />
          )
        }
      }

      horizontal++

    }

  }


  return (
    <>
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>Mouck.com</title>
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

            {loading && (
              <div className={classes.loader}>
                <CircularProgress size="3rem" thickness={5} />
              </div>
            )}


            < Products >
              {partComponents[0]}
            </Products>

            <Products reverse>
              {partComponents[1]}
            </Products>
            < Products >
              {partComponents[2]}
            </Products>

          </main>
        </div >
      </Layout >

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


// Get Server side data for fast time loading.SEO purpose

export const getServerSideProps: GetServerSideProps = async (context) => {

  let pageNum = context.query["page"] ? parseInt(context.query["page"]) : 1;
  let prpSearch = context.query["search"] ? context.query["search"].toString() : "";
  let propCategory = context.query["category"] ? (context.query["category"]).toString() : "all";
  let prpPrice = context.query["price"] ? (context.query["price"]).toString() : "any";
  let prpLimit = context.query["limit"] ? parseInt(context.query["limit"]) : 12;
  let prpSkip = context.query["skip"] ? parseInt(context.query["skip"]) : 0;


  const API_URL = '/api/products/filter'
  let quertyString = {
    skip: prpSkip,
    limit: prpLimit,
    page: pageNum,
    price: prpPrice,
    search: '',
    category: propCategory,
    type: "server"
  }


  const res = await axios.get("http://localhost:3000/api/products/filter", {
    responseType: 'json',
    params: {
      ...quertyString
    }
  })

  let prpDataSet = res.data.dataSet
  let prpTotalPages = res.data.totalPage


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

    },
  };
};

