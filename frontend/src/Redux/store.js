import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./Reducers/ProductReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from './Reducers/userReducers';
import cartReducer from "./Reducers/CartReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./Reducers/OrderReducers";


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []


//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

    //orderDetails
    const orderDetailsFromLocalStorage = localStorage.getItem("orderDetails")
        ? JSON.parse(localStorage.getItem("orderDetails"))
        : null;
    

    //shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
: {};






const initialState = {
    cart :{
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
        
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage,
    },
    order:{
        orderDetails: orderDetailsFromLocalStorage,
    }
   
    
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;