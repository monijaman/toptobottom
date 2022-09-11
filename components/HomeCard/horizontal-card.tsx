import React from "react";
import { Button } from "@material-ui/core";
import styles from "./horizontal.module.scss";
import NextLink from "next/link";
import { additem, selectCartState } from "redux/cartSlice";
import { IProduct } from "types/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function HorizontalCard({
  bgColor,
  title,
  desc,
  image,
  slug,
  product,
  ...props
}) {



  const { cart: { cartItems } } = useSelector(selectCartState);
  const dispatch = useDispatch();


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



  if (!desc) {
    return (

      <div
        className={styles.horizontalCard}
        style={{ backgroundColor: bgColor || "" }}
      >
        <NextLink href={`/product/${slug}`} passHref>
          <div
            className={styles.textContainer}
            style={{ padding: 0, marginRight: 0 }}
          >
            <h3 style={{ marginBottom: 0, fontSize: 32 }}>{title}</h3>
          </div>

        </NextLink>
        <img className={styles.bgImage} src={image} />
      </div>
    );
  }


  return (
    <div
      className={styles.horizontalCard}
      style={{ backgroundColor: bgColor || "" }}
    >
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <span className={styles.description}>{desc}</span>
      </div>

      <Button size="medium" className={styles.addToCart}
        color="primary"
        onClick={() => addToCartHandler(product as IProduct)}>
        Add to cart
      </Button>

      {image && (
        <NextLink href={`/product/${slug}`} passHref>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={image} />
          </div>
        </NextLink>
      )}
    </div>
  );
}
