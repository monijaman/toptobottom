import type { AppProps } from 'next/app';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import DashboardLayout from "components/ui/DashboardLayout/DashboardLayout";
// import { Provider } from 'react-redux';
// import { ThemeProvider } from "styled-components";
// import "styles/globals.css";
// import 'styles/globals.scss';
// import { store } from '../store/store';
// import { theme } from "../styles/theme";
 

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

import { wrapper } from "redux/store";

// function MyApp({ Component, pageProps }: AppProps) {

//   // useEffect(() => {
//   //   const jssStyles = document.querySelector("#jss-server-side")!;
//   //   if (jssStyles) {
//   //     jssStyles.parentElement?.removeChild(jssStyles);
//   //   }
//   // }, []);

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//       <DashboardLayout>
//       <Provider store={store}>
//         <Component {...pageProps} />
//         </Provider>
//       </DashboardLayout>
//     </ThemeProvider>
//     </>
//   );
// }

 

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")!;
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
//https://bobbyhadz.com/blog/react-type-children-has-no-properties-in-common
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true} options={{ "client-id": "test" }}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}


export default wrapper.withRedux(MyApp);

// export default MyApp;
