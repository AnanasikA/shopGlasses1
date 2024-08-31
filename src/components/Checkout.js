import React  from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
          });

          if(!error) {
            console.log('Payment successful:', paymentMethod);
          }else{
            console.error('Payment error:', error);
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Zapłać {totalAmount} zł.</h2>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Zapłać
            </button>
        </form>
    );
};

export default Checkout;