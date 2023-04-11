import styles from "../index.module.scss";
import React from "react"
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
// import FileUpload from 'utils/FileUpload'
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import type { NextPage } from 'next';
import Axios from 'axios';
import { colors, brands, categories } from 'data/filterdata';
import RadioBtn from 'components/ui/htmlInputElem/RadioBtn';
import {
  Button,
  Link, List,
  ListItem, TextField,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Divider from '@mui/material/Divider';
import db from "utils/db";
import Input from '@mui/material/Input';
import Layout from "components/Layout/adminLayout";
import { InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "types/index";
import axios from "axios";
const queryString = require('querystring');
import { getProducts, updatFilter, selectFilterState } from "redux/filterSlice";
import Product from "models/Product";
import Image from "next/image";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// import RadioBtn from 'components/ui/htmlInputElem/RadioBtn';

type FormData = {
  name: string;
  price: number;
};


const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },

  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button:{
    display:"block",
    background:"red"
  }
  
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Page: NextPage = ({ product }: props) => {
  
  const [prodId, setprodId] =   React.useState(product._id);
  const [category, setCategory] = React.useState<string[]>([product.category]);
  const [color, setColor] = React.useState<string[]>(product.color);
  const [brand, setBrand] = React.useState(product.brand);
  const [name, setName] = useState(product.name)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  
  let imgPath = "/images/"+product.image;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const router = useRouter();
  const redirect = router.query.redirect as string;
  const [selectedFile, setSelectedFile] = React.useState(null);
  const classes = useStyles();


  /* Functionaltiyr for controlling checkbox, radio and search */
  const handleFilters = (checkedItem, filterType) => {
    if (filterType == "color") {
      setColor(checkedItem)
    }

  }

  const handleBrandChange = (event: SelectChangeEvent<typeof Brand>) => {
    setBrand(event.target.value as string);
    console.log(brand)
  };

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      // typeof value === 'string' ? value.split(',') : value,
    );
   
  };

 

  const submitHandler = async ({
    name,
    price,
    description,
    countInStock
  }: IProduct) => {

    /* Prevent form from submitting by default */
    // e.preventDefault();

    /* If file is not selected, then show alert message */
    if (!prodId && !inputFileRef.current?.files?.length) {
      alert('Please, select file you want to upload');
      return;
    }

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    const content = {
      prodId,
      name,
      price,
      category,
      color,
      brand,
      description,
      countInStock
    };

    formData.append("data", JSON.stringify(content))
    Object.values(inputFileRef.current.files).forEach(file => {
      formData.append('file', file);
    })

    try {
      const response = await axios({
        method: "post",
        url: "/api/products/editproduct",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(response.status==200){
        router.back()
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


  return (
    <>
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            {/* <Form onSubmit={onSubmit} > */}

            <Typography component="h1" variant="h1">
              Add/Edit Product
            </Typography>
            <br />
            <Divider />


            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>

              <List>

                <ListItem>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-simple-select-label">Brands</InputLabel>
                    <Select
                      labelId="Brand"
                      id="Brands"
                      value={brand}
                      label="Brand"
                      inputProps={{ type: "name", style: { fontSize: 20 } }} // font size of input text                                               error={Boolean(errors.price)}
                      // InputLabelProps={{style: {fontSize: 20}}} // font size of input label
                      onChange={handleBrandChange}
                    >

                      {brands.map((brand) => (
                        <MenuItem key={brand.name} value={brand.name}>
                          {brand.name}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="CategoryInput">Category</InputLabel>
                    <Select
                      labelId="categories"
                      id="categories"
                      multiple
                      value={category}
                      onChange={handleChange}
                      input={<OutlinedInput label="Category" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                      inputProps={{ type: "name", style: { fontSize: 20 } }} // font size of input text                                               error={Boolean(errors.price)}

                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat.name}>
                          <Checkbox checked={category.indexOf(cat.name) > -1} />
                          <ListItemText primary={cat.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </ListItem>
                <ListItem>
                  <RadioBtn
                    list={colors} selectedRdo={product.color}
                    handleRadioBtn={checkedItem => handleFilters(checkedItem, "color")}
                  />
                </ListItem>

                <ListItem>
                  <Controller
                    name="countInStock"
                    control={control}
                    defaultValue={product.countInStock}
                    rules={{
                      required: true,
                      minLength: 1,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="countInStock"
                        label="Count in Stock"
                        inputProps={{ type: "name" }}

                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "Count In Stock length is more than 1"
                              : "Count In Stock is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={product.name}
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: "name" }}

                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "Name length is more than 1"
                              : "Name is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={product.price}
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="price"
                        label="price"
                        inputProps={{ type: "name" }}
                        error={Boolean(errors.price)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "price length is more than 1"
                              : "price is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>




                <ListItem>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={product.description}
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={6}
                        id="description"
                        label="Description"
                        inputProps={{ type: "name", style: { fontSize: 20 } }} // font size of input text                                               error={Boolean(errors.price)}
                        InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "Description length is more than 1"
                              : "Description is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <input type="file" name="myfile"
                    ref={inputFileRef} multiple
                    onChange={handleFileSelect}
                  />
                </ListItem>
              </List>
                        
              <Image
                src={imgPath}
                alt={product.name}
                width={80}
                height={80}

              />

              <input className="btn btn-primary" type="submit" value="Submit" />
 
            </form>

          </main>
        </div>
      </Layout >
    </>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};
