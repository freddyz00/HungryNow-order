import React from "react";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { CustomerLocationProvider } from "./CustomerLocationContext";
import { OrderTrackerProvider } from "./OrderTrackerContext";

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <CustomerLocationProvider>
        <CartProvider>
          <OrderTrackerProvider>{children}</OrderTrackerProvider>
        </CartProvider>
      </CustomerLocationProvider>
    </AuthProvider>
  );
};

export default Provider;
