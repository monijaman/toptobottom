/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import { actionTypes, StoreContext } from '../utils/Store';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from "components/Layout/innerpage";
import useStyles from '../utils/styles';

import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod, selectCartState } from "redux/cartSlice";

import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

const Payment: React.ReactNode = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  // const { state, dispatch } = useContext(StoreContext);

  const dispatch = useDispatch();

  const {
    cart: { shippingAddress },
  } = useSelector(selectCartState);

  useEffect(() => {
    if (!shippingAddress?.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);
  console.log(paymentMethod)
  const submitHandler = (e: React.FormEvent) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch(savePaymentMethod({ paymentMethod }));

      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default Payment