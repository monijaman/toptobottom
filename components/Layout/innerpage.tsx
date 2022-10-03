import React from "react";
import styles from "./layout.module.scss";
import Header from "../Header/";

interface Props {
    children?: React.ReactNode
    // any props that come into the component
}

export default function Layout({ children  }: Props) {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                {children}
            </div>
        </div>
    );
}
