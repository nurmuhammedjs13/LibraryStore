import React from "react";
import PaymentDetails from "./basketSection/Paymentdetails/PaymentDetails";
import PlacinganOrder from "./basketSection/PlacinganOrder/PlacinganOrder";

const BasketPage = () => {
  return (
    <div>
      <PaymentDetails />
      <PlacinganOrder />
    </div>
  );
};

export default BasketPage;
