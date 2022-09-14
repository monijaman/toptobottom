import React, { useEffect, useState } from "react";
import styles from "./layout.module.scss";
import Header from "../Header/adminHeader";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, userLogin } from "redux/authSlice";

export default function adminLayout({ children, noCategories }) {

    const [isAdmin, setIsAdmin] = useState(false);
    const { authState, userInfo } = useSelector(selectAuthState);
    const dispatch = useDispatch();
    ''
    let jsonObje = (typeof userInfo == "string") ? JSON.parse(userInfo) : userInfo

    useEffect(() => {
        userInfo ? setIsAdmin(jsonObje?.isAdmin) : false
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                <div className={styles.main}>
                    <div style={{ width: "30%" }}>
                        <h4>Page</h4>
                        {authState && isAdmin && <Link href="/add">Manage Products</Link>}
                        {authState && isAdmin && <Link href="/login">Manage Users</Link>}
                        {authState && isAdmin && <Link href="/login">Sales</Link>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
