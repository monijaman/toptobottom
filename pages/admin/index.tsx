import styles from "../index.module.scss";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import FileUpload from 'utils/FileUpload'
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
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


const Admin: React.ReactNode = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const dispatch = useDispatch();
    const { query } = useRouter();


    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const redirect = router.query.redirect as string; // login?redirect=/shipping
    // const { state, dispatch } = useContext(StoreContext);
    // const { userInfo } = state;

    // const { userInfo, authState } = useSelector(selectAuthState);


    useEffect(() => {



    }, [])



    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }



    const classes = useStyles();

    const submitHandler = async ({ email, password }: UserSubmitForm) => {
        closeSnackbar();

        try {
            const { data } = await axios.post("/api/users/login", {
                email,
                password,
            });

            dispatch(setAuthState(true))
            dispatch(userLogin(data));
            Cookies.set("userInfo", JSON.stringify(data));
            Cookies.set("authState", JSON.stringify(true));
            router.push(redirect || "/");

        } catch (err: any) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };

    /* Invoked when pagination button is called */
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
                            <FileUpload refreshFunction={updateImages} />
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
                            </List>

                            <List>
                                <ListItem>
                                </ListItem>
                            </List>


                            <label>Price($)</label>
                            <Input
                                onChange={onPriceChange}
                                value={PriceValue}
                                type="number"
                            />


                            <Button onClick={onSubmit}>Submit </Button>

                        </form>

                    </main>
                </div >
            </Layout >
        </>
    );
}
export default Admin;