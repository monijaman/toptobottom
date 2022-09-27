import React from "react";

import styles from "./vertical.module.scss";
import { Button } from "@material-ui/core";
import HeartIcon from "../icons/heart";
import NextLink from "next/link";
import { additem, selectCartState } from "redux/cartSlice";
import { IProduct } from "types/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
type CarDProps = {
  bgColor: string;
  title: string;
  desc: string;
  image: string;
  slug: string;
  product: IProduct;
  price: number;
  sale_price:number;
};

export default function VerticalCard({
  bgColor,
   image,
  slug,
  product,
  price,
  sale_price 
} : CarDProps) {


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


  return (
    <>
      <div
        className={styles.verticalCard}
        style={{
          backgroundColor: bgColor || "",
          border:  "2px solid #eee",
        }}
      >

        <HeartIcon className={styles.likeContainer} />
        {sale_price && price && (
          <button className={styles.favContainer}>
            {(((price - sale_price) / price) * 100) | 0}%
          </button>
        )}


        <div className={styles.imageContainer}>
          <NextLink href={`/product/${slug}`} passHref>
            {image && <Image alt=""   layout='fill' className={styles.image} src={image} loading="lazy" />}
          </NextLink>
        </div>
        <div className={styles.textContainer}>
          {/* <h4 className={styles.brandText}>{brand}</h4> */}
          {/* <h4>{name}</h4> */}
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
        </div>
      </div>
    </>
  );
}
