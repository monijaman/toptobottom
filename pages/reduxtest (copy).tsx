// https://blog.logrocket.com/use-redux-next-js/
// https://stackoverflow.com/questions/69798089/redux-saga-typeerror-cannot-read-properties-of-undefined-reading-data
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { removeitems, selectCartState, setCartState } from "redux/cartSlice";
import Layout from "../components/Layout";

import { wrapper } from "redux/store";
// import "../styles/globals.css";

const Home: NextPage = () => {
  const authState = useSelector(selectCartState);
  const dispatch = useDispatch();
  return (
    <Layout title="Shopping Cart">
      <h1>
        Shopping Cart
        </h1>
    <div>
      <button
        onClick={() =>
          authState
            ? dispatch(removeitems(false))
            : dispatch(removeitems(true))
        }

        
      >{console.log(authState)}
        {authState ? "Logout" : "LogIn"}
      </button>
    </div>
    </Layout>
  );
};

export default Home;
// export default wrapper.withRedux(Home);
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async ({ params }) => {
        // we can set the initial state from here
        // we are setting to false but you can run your custom logic here
        await store.dispatch(setCartState(false)); 
        console.log("State on server", store.getState());
        return {
          props: {
            authState: false,
          },
        };
      }
  );