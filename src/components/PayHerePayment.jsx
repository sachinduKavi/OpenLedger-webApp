import React, { useEffect, useState } from 'react';
import { generateHashCodeQuery } from '../query/paymentQuery';

const PayHerePayment = (props) => {
  const paymentValues = props.payment
  const user = props.user

  const [hash, setHash] = useState("");
  const amount = paymentValues.getAmount()*1.033


  useEffect(() => {
    // // Define PayHere event handlers
    payhere.onCompleted = function (orderId) {
        console.log("Payment completed. OrderID:", orderId);
        // Implement your logic here for successful payment
        props.success()
    }

    payhere.onDismissed = function () {
        console.log("Payment dismissed");
        // Implement your logic here for dismissed payment
    }

    payhere.onError = function (error) {
        console.log("Error:", error);
        // Implement your logic here for payment errors
    }
  }, [])

  const generateHash = async () => {
    const data = {
      merchant_id: "1226760", // Replace with your Merchant ID
      order_id: paymentValues.getPaymentID(),
      amount: amount,
      currency: "LKR",
      merchant_secret: "MzQ3MTE5MzAwMzMwMzk4MjgyMzEzMTMwOTI5NTgzMzI1NTAyMzkzMA==" // Replace with your Merchant Secret
    };

    const response = await generateHashCodeQuery(data)
    if(response.status === 200 && response.data.proceed) 
        setHash(response.data.content)
  }

  const handlePayment = async () => {
    console.log('user', user)
    await generateHash();

    const payment = {
      sandbox: true,
      merchant_id: "1226760",
      return_url: undefined,
      cancel_url: undefined,
      notify_url: "#",
      order_id: paymentValues.getPaymentID(),
      items: paymentValues.getReference(),
      amount: amount,
      currency: "LKR",
      hash: hash,
      first_name: user.getUserName(),
      last_name: "",
      email: user.getUserEmail(),
      phone: user.getUserMobile(),
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
      // delivery_address: "No. 46, Galle road, Kalutara South",
      // delivery_city: "Kalutara",
      // delivery_country: "Sri Lanka",
      custom_1: "",
      custom_2: ""
    }

    payhere.startPayment(payment)
  }

  return (
    <button onClick={handlePayment} disabled={!props.transactionReady}>PAY HERE</button>
  );
};

export default PayHerePayment