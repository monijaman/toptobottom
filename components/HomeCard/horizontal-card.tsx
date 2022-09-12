import React from "react";
import { Button } from "@material-ui/core";
import styles from "./horizontal.module.scss";
import NextLink from "next/link";
import { additem, selectCartState } from "redux/cartSlice";
import { IProduct } from "types/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HeartIcon from "../icons/heart";

export default function HorizontalCard({
  bgColor,
  title,
  desc,
  image,
  slug,
  product,
  price,
  sale_price,
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

        <HeartIcon className={styles.likeContainer} />
        {sale_price && price && (
          <button className={styles.favContainer}>
            {(((price - sale_price) / price) * 100) | 0}%
          </button>
        )}

        <NextLink href={`/product/${slug}`} passHref>
          <div
            className={styles.textContainer}
            style={{ padding: 0, marginRight: 0 }}
          >
            <h3 style={{ marginBottom: 0, fontSize: 32 }}>{title}</h3>
          </div>
          {sale_price ? (
            <div className={styles.priceContainer}>
              <div className={styles.prices}>
                <span className={styles.priceText}>{price}$</span>
                <span className={styles.salePriceText}>{sale_price}$</span>
              </div>
            </div>
          ) : (
            <span className={styles.salePriceText}>{price || 0}$</span>
          )}

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
      <HeartIcon className={styles.likeContainer} />
      {sale_price && price && (
        <button className={styles.favContainer}>
          {(((price - sale_price) / price) * 100) | 0}%
        </button>
      )}

      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <span className={styles.description}>{desc}</span>
      </div>
      {sale_price ? (
        <div className={styles.priceContainer}>
          <div className={styles.prices}>
            <span className={styles.priceText}>{price}$</span>
            <span className={styles.salePriceText}>{sale_price}$</span>
          </div>
        </div>
      ) : (
        <span className={styles.salePriceText}>{price || 0}$</span>
      )}


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
