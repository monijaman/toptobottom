/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";
import { Actions, actionTypes, ContextType, IAuthUser, IProduct, ShippingAddressType, StateType } from "types/index";

 const cartCookie :string = Cookies.get("cartItems");
 const shippingCookie:string = Cookies.get("cartItems");
 const paymentCookie:string = Cookies.get("cartItems");
 const userCookie:string = Cookies.get("userInfo");

const initialState: StateType = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,

  cart: {
    cartItems: cartCookie ? JSON.parse(cartCookie): [],
    shippingAddress: shippingCookie ? JSON.parse(shippingCookie): {},
    paymentMethod: paymentCookie ? JSON.parse(paymentCookie): "",
  },

  userInfo: userCookie  ? JSON.parse(userCookie!) : null,
};

const StoreContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state = initialState, action: Actions): StateType => {
  switch (action.type) {
    case actionTypes.DARK_MODE_ON:
      return { ...state, darkMode: true };

    case actionTypes.DARK_MODE_OFF:
      return { ...state, darkMode: false };

    case actionTypes.CART_ADD_ITEM: {
      const newItem = action.payload as IProduct;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

    
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

       // console.log('New', newItem)

      Cookies.set("cartItems", JSON.stringify(cartItems));
      //return { ...state, cart: { ...state.cart, cartItems } };
    }

    case actionTypes.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== (action.payload as IProduct)?._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case actionTypes.CART_CLEAR:
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case actionTypes.USER_LOGIN:
      return { ...state, userInfo: action.payload as IAuthUser };

    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        cart: {
          ...state.cart,
          cartItems: [],
          shippingAddress: null,
          paymentMethod: "",
        },
      };

    case actionTypes.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload as ShippingAddressType,
        },
      };

    case actionTypes.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload as string },
      };
      
    default:
      return state;
  }
};

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, actionTypes, StoreContext };
