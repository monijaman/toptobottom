import React, { useEffect, useState, ReactNode } from "react";
import styles from "./layout.module.scss";
import Header from "../Header/adminHeader";

import Link from "next/link";
import {  useSelector } from "react-redux";
import { selectAuthState } from "redux/authSlice";
import {List, ListItem} from "@material-ui/core";

    interface Props {
        children?: ReactNode
        // any props that come into the component
    }

export default function AdminLayout({ children }: Props) {

    const [isAdmin, setIsAdmin] = useState(false);
    const { authState, userInfo } = useSelector(selectAuthState);
     
    let jsonObje = (typeof userInfo == "string") ? JSON.parse(userInfo) : userInfo

    useEffect(() => {
        userInfo ? setIsAdmin(jsonObje?.isAdmin) : false

            // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {authState && isAdmin && <Link href="/admin/users">Manage Users</Link>}
                        </ListItem>
                        <ListItem>
                        {authState && isAdmin && <Link href="/admin/orders">Manage Orders</Link>}
                        </ListItem>
                        </List>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
