import React from "react";
import styles from "./layout.module.scss";
import Header from "../Header/";
import CategoriesBar from "components/Categories";
import CheckBox from 'components/ui/htmlInputElem/CheckBox';
import RadioBox from 'components/ui/htmlInputElem/RadioBox';
import { categories, prices } from 'data/filterdata';

export default function Layout({ children, noCategories }) {

    const handleFilters = (selFilters, filterType) => {

        const newFilters = { ...Filters }

        if (filterType == "searchTerm") {
            newFilters['search'] = selFilters
        } else if (filterType === "category") {
            newFilters['category'] = selFilters
        } else if (filterType === "price") {
            newFilters['price'] = selFilters
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                {children}
            </div>
        </div>
    );
}
