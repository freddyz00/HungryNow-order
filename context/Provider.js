import React from "react";

import { CartProvider } from "./CartContext";
import { CustomerLocationProvider } from "./CustomerLocationContext";
import { OrderTrackerProvider } from "./OrderTrackerContext";

const Provider = ({ children }) => {
  return (
    <CustomerLocationProvider>
      <CartProvider>
        <OrderTrackerProvider>{children}</OrderTrackerProvider>
      </CartProvider>
    </CustomerLocationProvider>
  );
};

export default Provider;
