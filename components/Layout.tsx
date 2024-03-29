import {
  AppBar,
  Badge,
  Container,
  createTheme,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
// import { StoreContext } from "../utils/Store";
import { IAuthUser } from "../models/User";
import {  useSelector } from "react-redux";
import {  selectCartState } from "redux/cartSlice";
import {  selectAuthState } from "redux/authSlice";
import Header from "./Header/";

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode; 
}

/**Layout represents a page wrapper to wrap pages
 * It wraps it's children with the relevant header and footer and it also allows setting relevant meta tags using next head
 *
 */
const Layout: React.FC<Props> = ({ title, description, children }) => {
  const router = useRouter()  
  const {    cart: { cartItems }   } = useSelector(selectCartState);
  
  const { userInfo } = useSelector(selectAuthState);
 
  
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
 
  });

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e: React.ChangeEvent<any>) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (redirect: string) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
   // dispatch(userLogin());
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Next TS E-commerce` : "Next TS E-commerce"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <Header />
 

      <ThemeProvider theme={theme}>
        <div className={classes.parent}>
          <AppBar position="static" className={classes.navbar}>
            <Toolbar>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>
                    Next TS E-commerce
                  </Typography>
                </Link>
              </NextLink>
              <div className={classes.grow}></div>
              <div>
                <NextLink href="/cart" passHref>
                  <Link>
                    {cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )}
                  </Link>
                </NextLink>
                {userInfo ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={loginClickHandler}
                      className={classes.navbarButton}
                    >
                      {(userInfo as IAuthUser).name}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={loginMenuCloseHandler}
                    >
                      <MenuItem
                        onClick={() => loginMenuCloseHandler("/profile")}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          loginMenuCloseHandler("/order-history")
                        }
                      >
                        Order History
                      </MenuItem>
                      <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                )}
              </div>
            </Toolbar>
          </AppBar>

          <Container className={classes.main}>{children!}</Container>
         
          <footer className={classes.footer}>
            <Typography>All rights resesrved. Next TS E-commerce</Typography>
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
