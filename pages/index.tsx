import { useQuery, dehydrate, QueryClient } from "react-query";
import Pagination from "@material-ui/lab/Pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button, Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
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
import { continents, price } from 'data/filterdata';

export default function paginationSSR({ pageNum }: props) {
  const { query } = useRouter();

  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(parseInt(query.page) || 1);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const { cart: { cartItems } } = useSelector(selectCartState);
  const dispatch = useDispatch();
  // const { state, dispatch } = useContext(StoreContext);
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")

  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  })

  useEffect(() => {

    const variables = {
      skip: Skip,
      limit: Limit,
    }

    fecthIniPosts(variables)

  }, [])

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



  function handlePaginationChange(e: React.ChangeEvent<HTMLInputElement>, value: any) {

    //const [pageNumber, setPageNumber] = useState(parseInt(value));

    setPage(value);
    router.push(`ptest/?page=${value}`, undefined, { shallow: true });


    const fecthPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/agg/?page=${value}`);

        const { data, pages: totalPages } = await res.json();

        setPages(totalPages);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        //  setError("Some error occured");
      }
    };

    fecthPosts();

  }

  const fecthIniPosts = async () => {

    // router.push(`ptest/?page=1`, undefined, { shallow: true });

    setLoading(true);
    //console.log({page})
    try {
      const res = await fetch(`/api/products/agg/?page=${pageNum}}`);

      const { data, pages: totalPages } = await res.json();

      setPages(totalPages);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      //  setError("Some error occured");
    }

  }




  // useEffect(() => {
  //   // console.log(' useeffect '+query.page)
  //   fecthIniPosts();
  // }, []);



  const showFilteredResults = (filters) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters

    }
    getProducts(variables)
    setSkip(0)

  }

  const getProducts = (variables) => {
    Axios.post('/api/product/agg/', variables)
      .then(response => {
        if (response.data.success) {
          if (variables.loadMore) {
            setProducts([...Products, ...response.data.products])
          } else {
            setProducts(response.data.products)
          }
          setPostSize(response.data.postSize)
        } else {
          alert('Failed to fectch product datas')
        }
      })
  }

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {

      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log('array', array)
    return array
  }
  const handleFilters = (filters, category) => {

    const newFilters = { ...Filters }

    newFilters[category] = filters

    if (category === "price") {
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues

    }

    console.log(newFilters)

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const updateSearchTerms = (newSearchTerm) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)

    getProducts(variables)
  }


  return (
    <>

      <Layout>

        {console.log(continents)}
        <h1>Products</h1>

        <Typography component="h2" variant="h2">Filter</Typography>
        <div>
          Continents

          <CheckBox
            list={continents}
            handleFilters={filters => handleFilters(filters, "continents")}
          />
        </div>
        <div>
          Price

          <RadioBox
            list={price}
            handleFilters={filters => handleFilters(filters, "price")}
          />
        </div>

        <div>
          <SearchFeature
            refreshFunction={updateSearchTerms}
          />
        </div>

        <Grid container spacing={3}>
          {products.map((product) => (
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
          ))}
        </Grid>

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
  var pageNum = parseInt(context.query["page"]) || 1;

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
      // products: products.map(db.convertDocToObj), 
    },
  };
};