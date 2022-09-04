export type UserSubmitForm = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
export interface IUser {
  name: string;
  email: string;
  password?: string;
  username?:string;
  isAdmin: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProduct {
  quantity: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  countInStock: number;
  description: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface  queryParamType {
  skip: number;
  limit: number;
  page: number;
  price?: number;
  search?: string;
  category?: string;
}


export interface IAuthUser extends IUser {
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  username?:string;
  isAdmin: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
export  type ShippingAddressType = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type StateType = {
  darkMode: boolean;
  cart: {
    cartItems: IProduct[] | [];
    shippingAddress: ShippingAddressType | null;
    paymentMethod: string | undefined;
  };
  userInfo: IAuthUser | null;
};

export type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<any>;
};

export enum actionTypes {
  DARK_MODE_ON = "DARK_MODE_ON",
  DARK_MODE_OFF = "DARK_MODE_OFF",
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS",
  SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD",
  CART_CLEAR = "CART_CLEAR"
}

export interface Actions {
  type: string;
  payload?: IProduct | IAuthUser | ShippingAddressType | string;
}


 


export interface IPost {
  albumId: string
  id: number
  title: string
  url:string
  thumbnailUrl: string
}

export type UserData = {
  email: string;
  password: string;
};

export type zip ={
  zip:string
}

export type ProductType = {
  id: string;
  title:string;
  brand:string;
  name: string;
  description: string;
  price: number;
  category: string;
  imgurl?:  string[];
  rating?:number;
  stock:number;
  thumbnail:string;
  discountPercentage?:number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductSType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imgurl: { en: { uploadId: string } };
};

// Inventry table
export interface inventory {
  customerId:    string;
  paymentId:     string;
  paymentStatus: string;
  status:        string;
  currency:      string;
  totalCost:     number;
  items:         Item[];
  shipping:      Shipping;
}



export interface Shipping {
  address:  Address;
  origin:   Address;
  carrier:  string;
  tracking: string;
}


export interface Users {
  _id:                     string;
  fname:                   string;
  lname:                   string;
  hashedAndSaltedPassword: string;
  emailVerified:           boolean;
  address:                 Address;
}


export interface payments {
  customerId: string;
  status:     string;
  gateway:    string;
  type:       string;
  amount:     number;
  card:       Card;
}

export interface Card {
  brand:           string;
  pan:             string;
  expirationMonth: number;
  expirationYear:  number;
  cvv:             number;
}


export interface Orders {
  customerId:    string;
  paymentId:     string;
  paymentStatus: string;
  status:        string;
  currency:      string;
  totalCost:     number;
  items:         Item[];
  shipping:      Shipping;
}

export interface Item {
  sku:         string;
  quantity:    string;
  price:       number;
  discount?:   number;
  preTaxTotal: number;
  tax:         number;
  total:       number;
  optipns: ItemOptions
}

export interface ItemOptions {
  size:       Size;
  features:   string;
  categories: string[];
  image:      string;
}

export interface Size {
  h: number;
  l: number;
  w: number;
}

 
export interface Shipping {
  address:  Address;
  origin:   Address;
  carrier:  string;
  tracking: string;
}

export interface Address {
  street1:  string;
  street2:  string;
  city:     string;
  state:    string;
  country:  string;
  zip?:     string;
  zipCode?: string;
}




 