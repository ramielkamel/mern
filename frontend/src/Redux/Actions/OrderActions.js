
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from './../Constants/OrderConstants';
import  axios  from 'axios';
import { CART_CLEAR_ITEMS } from '../Constants/CartConstants';
import { ORDER_CREATE_FAIL } from './../Constants/OrderConstants';
import {  logout } from './userActions';


//Create Order
export const createOrder = (order) => async (dispatch,getState) => {
    try{
        dispatch({type: ORDER_CREATE_REQUEST});
        
        const {
            userLogin: { userInfo }, } = getState();
            
            
        const  config = {
            headers : {
                "Content-type":"Application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({ type: CART_CLEAR_ITEMS, payload: data});

        localStorage.removeItem("cartItems");




    }catch (error){
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        if (message === "Not Authorized! Token Failed")  {
            dispatch(logout());
        } 
        dispatch({type: ORDER_CREATE_FAIL, payload: message});
        
    }
};


// Order details
export const getOrderDetails = (id) => async (dispatch,getState) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST});
        
        const {
            userLogin: { userInfo }, } = getState();
            
            
        const  config = {
            headers : {
                
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`,  config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data});
        localStorage.setItem("orderDetails", JSON.stringify(getState().order.orderDetails));

        



    }catch (error){
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        if (message === "Not Authorized! Token Failed")  {
            dispatch(logout());
        } 
        dispatch({type: ORDER_DETAILS_FAIL , payload: message});
        
    }
};




