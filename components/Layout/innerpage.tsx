import React from "react";
import styles from "./layout.module.scss";
import Header from "../Header/";
import CategoriesBar from "components/Categories";
import CheckBox from 'components/ui/htmlInputElem/CheckBox';
import RadioBox from 'components/ui/htmlInputElem/RadioBox';
import { categories, prices } from 'data/filterdata';

export default function Layout({ children, noCategories }) {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                {children}
            </div>
        </div>
    );
}
