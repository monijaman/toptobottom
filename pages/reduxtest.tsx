// https://blog.logrocket.com/use-redux-next-js/
// https://stackoverflow.com/questions/69798089/redux-saga-typeerror-cannot-read-properties-of-undefined-reading-data
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

import axios from 'axios';
import Product from "models/Product";
import { InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { IProduct } from "types/index";
import db from "../utils/db";
// import { useDispatch, useSelector } from "react-redux";
import { selectCartState } from "redux/cartSlice";

// import { wrapper } from "redux/store";
// import "../styles/globals.css";


const Home: NextPage = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  const router = useRouter()  
   const {    cart: { cartItems }  } = useSelector(selectCartState);
  
  // const { state, dispatch } = useContext(StoreContext);
  
  const addToCartHandler = async (product: IProduct) => {
    
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock'); 
      return;
    }
   // dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...item, quantity } });
    console.log(data)

    // dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...product, quantity } });
  //  router.push('/cart');
  };


  return (

    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Card>
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
                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product as IProduct)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </NextLink>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>

    
  );
};

export default Home;

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
 

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       // we can set the initial state from here
//       // we are setting to false but you can run your custom logic here
//     //  await store.dispatch(setCartState(false)); 
//       console.log("State on server", store.getState());

//       await db.connect();
//       const products = await Product.find({}).lean();
//       await db.disconnect();
//       return {
//         props: {
//           authState: false,
//         },
//       };
//     }
// );