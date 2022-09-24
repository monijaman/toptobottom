import React, { useEffect, useState } from "react";
import styles from "./layout.module.scss";
import Header from "../Header/adminHeader";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, userLogin } from "redux/authSlice";
import {List,
    ListItem} from "@material-ui/core";

export default function adminLayout({ children }) {

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
                        <h4>Pages</h4>
                        <List>
                            <ListItem>
                        {authState && isAdmin && <Link href="/admin/products">Manage Products</Link>}
                        </ListItem>
                        <ListItem>
                        {authState && isAdmin && <Link href="/admin/orders">Manage Users</Link>}
                        </ListItem>
                        <ListItem>
                        {authState && isAdmin && <Link href="/admin/users">Sales</Link>}
                        </ListItem>
                        </List>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
