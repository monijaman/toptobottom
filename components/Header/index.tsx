import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import styles from "./header.module.scss";
import SearchIcon from "../icons/search";
import CartIcon from "../icons/cart";
import ArrowIcon from "../icons/arrow";
import SearchFeature from 'components/ui/htmlInputElem/SearchFeature';

// import { useCart } from "hooks/cart.hook";
import { useRouter } from "next/router";
import MenuIcon from "../icons/menu";
import { selectCartState } from "redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState, userLogin } from "redux/authSlice";


import Cookies from "js-cookie";
import {
  MenuItem
} from "@material-ui/core";

export default function Header() {
  const [showHeader, setShowHeader] = useState({
    transform: "translate3d(100vw, 0, 0)",
  });
 
  const dispatch = useDispatch();

  const router = useRouter();
  const { cart: { cartItems } } = useSelector(selectCartState);
  const [cartLength, setCartLength] = useState(cartItems.length);
  const [isAdmin, setIsAdmin] = useState(false);
  const { authState, userInfo } = useSelector(selectAuthState);
  const [userName, setUserName] = useState(false);
  let jsonObje = (typeof userInfo == "string") ? JSON.parse(userInfo) : userInfo
 
 
  console.log(authState)
  const logoutClickHandler = () => {
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("authState");
    dispatch(setAuthState(false))
    dispatch(userLogin(false));
    router.push("/login");
  };

  useEffect(() => {
    if (cartItems?.length > 0) {
      setCartLength(cartItems?.length)
    }

      if(jsonObje){
        setUserName(jsonObje?.name)  
      } else{
        setUserName("Guest")
      } 
 
    if(userInfo?.isAdmin){
      setIsAdmin(isAdmin)
    }
  
  
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo}>  
          <Image
      // loader={myLoader}
      src="/static/moucak.png"
      alt="Moucak"
      width={180}
      height={44}
    />
       
          </a>
        </Link>
        <div className={styles.rightContentMobile}>
          <Link href="/cart">
            <div className={styles.cartContainer}>
              <CartIcon width={28} height={28} className={styles.cartIcon} />
              <div>
                <span> {cartLength}</span>
              </div>
            </div>
          </Link>
          <div className={styles.profileContainer}>
            <MenuIcon
              width={30}
              height={30}
              className={styles.menuIcon}
              onClick={() =>
                setShowHeader({ transform: "translate3d(0vw, 0, 0)" })
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.rightMenu}>
        <div className={styles.menuContent} style={showHeader}>
          <Link href="/">My Account</Link>
          {authState && <Link href="/login">My Account</Link>}
          {authState && <Link href="/orders">My Orders</Link>}
          {authState && <Link href="/favorites">Favourites</Link>}
          {!authState && <Link href="/login">Profile</Link>}
          {!authState && <Link href="/login">Login</Link>}
          {!authState && <Link href="/register">register</Link>}
          
        </div>
        <div
          className={styles.background}
          style={showHeader}
          onClick={() =>
            setShowHeader({ transform: "translate3d(100vw, 0, 0)" })
          }
        />
      </div>
      <div className={styles.searchContainer}>
        <SearchIcon
          width={20}
          height={20}
          fill="grey"
          className={styles.searchIcon}
        />


        <SearchFeature />
      </div>
      <div className={styles.rightContent}>
        <Link href="/cart">
          <div className={styles.cartContainer}>
            <CartIcon width={20} height={20} className={styles.cartIcon} />
            <span>Cart: {cartLength}</span>
          </div>
        </Link>


        <div className={styles.profileContainer}>
          {/* <img
              src={user?.photoUrl || "https://picsum.photos/200/200"}
              className={styles.profilePhoto}
              loading="lazy"
            /> */}
          <span>
            Hello{" "}
            <span style={{ fontWeight: "normal" }}>
              {userName}
            </span>
          </span>
          <ArrowIcon width={10} height={10} className={styles.arrowIcon} />
          <div className={styles.dropdown}>
            <div className={styles.arrowUp} />
            <div className={styles.dropdownMenu}>
              {authState && <Link href="/login">My Account</Link>}
              {authState && <Link href="/orders">My Orders</Link>}
              {authState && <Link href="/favorites">Favourites</Link>}
              {authState && <Link href="/login">Profile</Link>}
              {authState && isAdmin && <Link href="/admin">Admin Panel</Link>}
              {!authState && <Link href="/login">Login</Link>}
              {!authState && <Link href="/register">Register</Link>}
              {authState && <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}
