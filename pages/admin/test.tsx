import styles from "../index.module.scss";
import React from "react"
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import FileUpload from 'utils/FileUpload'
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import type { NextPage } from 'next';
import Axios from 'axios';
import {
    Button,
    Link, List,
    ListItem, TextField,
    CircularProgress,
    makeStyles,
    Typography
} from "@material-ui/core";

import Input from '@mui/material/Input';
import Layout from "components/Layout/adminLayout";
import { InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "types/index";
import axios from "axios";
const queryString = require('querystring');
import { getProducts, updatFilter, selectFilterState } from "redux/filterSlice";
import Product from "models/Product";

type FormData = {
    name: string;
    price: number;
};

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    loader: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        marginBottom: "1rem",
        padding: "13px",
    },
    filters: {
        padding: "0 1.5rem",
    },
    priceRangeInputs: {
        display: "flex",
        justifyContent: "space-between",
    },
});

const Home: NextPage = () => {


    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const redirect = router.query.redirect as string;

    const classes = useStyles();

    const submitHandler = async ({
        name,
        price
    }: IProduct) => {

        /* Prevent form from submitting by default */
        // e.preventDefault();

        /* If file is not selected, then show alert message */
        if (!inputFileRef.current?.files?.length) {
            alert('Please, select file you want to upload');
            return;
        }
        console.log(inputFileRef)

        setIsLoading(true);

        /* Add files to FormData */
        const formData = new FormData();

        formData.append("name", name)
        formData.append("price", price)

        Object.values(inputFileRef.current.files).forEach(file => {
            formData.append('file', file);
        })

        /* Send request to our api route */
        const response = await fetch('/api/products/upload', {
            method: 'POST',
            body: formData
        });

        const body = await response.json() as { status: 'ok' | 'fail', message: string };

        console.log(body);

        if (body.status === 'ok') {
            inputFileRef.current.value = '';
            // Do some stuff on successfully upload
        } else {
            // Do some stuff on error
        }

        setIsLoading(false);
    };

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
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                            {/* DropZone */}

                            <input type="file" name="myfile"
                                ref={inputFileRef} multiple
                                onChange={(e) => {
                                    submitHandler
                                }}
                            />

                            <List>
                                <ListItem>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        name="price"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                            minLength: 2,
                                        }}
                                        render={({ field }) => (
                                            <Input
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
                            </List>

                            <List>
                                <ListItem>
                                </ListItem>
                            </List>



                            {/* <Button onClick={onSubmit}>Submit </Button> */}
                            {/* <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={uploadToServer}
                            > */}
                            <input type="submit" value="Upload" disabled={isLoading} />

                        </form>

                    </main>
                </div>
            </Layout >
        </>
    )
}

export default Home
