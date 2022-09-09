import React, { useState } from "react";
// import { Box, List, Tag, ListItem, Divider } from "@chakra-ui/core";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";
import { default as data } from "./MOCK_DATA.json";

export default function App() {
  let [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />

      <ul>
        {_DATA.currentData().map(v => {
          return (
            <li key={v.id} >
              <span>{v.sku}</span>{" "}
               
              <span> {v.category_type}</span>{" "}
              
              <span>
                <p color="#0f4211">${v.msrp}</p>
              </span>
            </li>
          );
        })}
      </ul>

      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </>
  );
}
