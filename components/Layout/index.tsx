import React from "react";
import styles from "./layout.module.scss";
import Header from "../Header/";
import CheckBox from 'components/ui/htmlInputElem/CheckBox';
import RadioBox from 'components/ui/htmlInputElem/RadioBox';
import { categories, prices } from 'data/filterdata';

interface Props {

  children: React.ReactNode; 
}
  
export default function Layout({ children }: Props) {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>

          <div style={{ width: "25%" }}>
            <h4>Category</h4>
            <CheckBox   lists={categories} />
            <h4>Price Range</h4>

            <RadioBox list={prices} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
