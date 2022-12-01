import React, { useState} from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from "../Redux/Actions/CartActions";

const PaymentScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state)=> state.cart)
  const {shippingAddress, paymentMethod} = cart;
  

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethodvar, setPaymentMethod] = useState(paymentMethod.paymentMethodvar)

  const dispatch = useDispatch();

  

  
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodvar))
    
     if(paymentMethodvar === undefined   ){
      history.push("/payment")

    }
    else
    {history.push("/placeorder")}
    
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input className="form-check-input" type="radio" value="PayPal or Credit Card" onChange={(e)=> setPaymentMethod(e.target.value)} />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>
          
          <button  type="submit">
           
              Continue
            
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
