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

  let colors = ["#f6f6f6", "#99E6B0", "#f3e6c8", "#F9CADA", "#FBE285"]
  let partComponents = [];

  for (let i = 0; i < 3; i++) {
    partComponents[i] = []
    let color = colors[(Math.random() * colors.length) | 0]
    let horizontal = 0;
    for (let j = i * 4; j < (i + 1) * 4; j++) {

      if (dataResSet[j]) {
        //partComponents[i].push(dataResSet[j].name)
        if (horizontal < 2) {
          partComponents[i].push(
            <HorizontalCard key={dataResSet[j]}
              bgColor={color}
              title={dataResSet[j].name}
              image={dataResSet[j].image}
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
              image={dataResSet[j].image}
              price="300"
              sale_price="200"
              price={dataResSet[j].price}
              sale_price="140"
              price="900"
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



            {/* < Products >
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

