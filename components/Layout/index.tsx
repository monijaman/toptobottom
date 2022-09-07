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
    //  alert(JSON.stringify(selFilters, null, 4))


    if (filterType == "searchTerm") {
      newFilters['search'] = selFilters
    } else if (filterType === "category") {
      newFilters['category'] = selFilters
    } else if (filterType === "price") {
      newFilters['price'] = selFilters
    }


    // showFilteredResults(newFilters)
    // setFilters(newFilters)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>
          {/* {!noCategories && <CategoriesBar />} */}
      <div  style={{width: "20%"}}>
        <h4>Category</h4>
          <CheckBox  list={categories}    />
           
           <h4>Price Range</h4>
           
          <RadioBox  list={prices}    />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
