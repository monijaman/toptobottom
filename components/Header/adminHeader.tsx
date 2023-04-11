import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import styles from "./header.module.scss";

// import SearchIcon from "../icons/search";
import CartIcon from "../icons/cart";
import ArrowIcon from "../icons/arrow";

// import { useCart } from "hooks/cart.hook";
import { useRouter } from "next/router";
import MenuIcon from "../icons/menu";
import { selectCartState } from "redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, userLogin } from "redux/authSlice";


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
    let userJsonInfo = (typeof userInfo == "string") ? JSON.parse(userInfo) : userInfo
    const myLoader = ({ src, width, quality }) => {
        return `https://example.com/${src}?w=${width}&q=${quality || 75}`
      }
      
    // console.log(authState)
    const logoutClickHandler = () => {
        Cookies.remove("userInfo");
        Cookies.remove("cartItems");
        Cookies.remove("authState");

        dispatch(userLogin(false));
        router.push("/login");
    };

    useEffect(() => {
        if (cartItems?.length > 0) {
            setCartLength(cartItems?.length)
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
                    loader={myLoader}
                    src="/static/moucak.png"
                    alt="Moucak"
                    width={500}
                    height={500}
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
                    <Link href="/">My Account </Link>

                    {!authState && <Link href="/login">Login</Link>}
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
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
                {/* <SearchIcon
                    width={20}
                    height={20}
                    fill="grey"
                    className={styles.searchIcon}
                /> */}


                {/* <SearchFeature /> */}
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
                            Admin
                        </span>
                    </span>
                    <ArrowIcon width={10} height={10} className={styles.arrowIcon} />
                    <div className={styles.dropdown}>
                        <div className={styles.arrowUp} />
                        <div className={styles.dropdownMenu}>
                            <Link href="/">My Account</Link>
                            {authState && isAdmin && <Link href="/admin">Admin Panel</Link>}
                            {authState && isAdmin && <Link href="/admin">Add Products</Link>}
                            {authState && <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>}
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}
