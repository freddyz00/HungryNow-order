import React, { createContext, useContext, useState } from "react";

const CustomerLocationContext = createContext();

export const CustomerLocationProvider = ({ children }) => {
  const [customerLocation, setCustomerLocation] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  return (
    <CustomerLocationContext.Provider
      value={{
        customerLocation,
        setCustomerLocation,
        customerAddress,
        setCustomerAddress,
      }}
    >
      {children}
    </CustomerLocationContext.Provider>
  );
};

export const useCustomerLocation = () => useContext(CustomerLocationContext);
