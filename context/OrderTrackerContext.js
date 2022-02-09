import React, { createContext, useContext, useState } from "react";

const OrderTrackerContext = createContext();

export const OrderTrackerProvider = ({ children }) => {
  const [hasOrder, setHasOrder] = useState(false);
  const [messagesWithDriver, setMessagesWithDriver] = useState([]);
  const [pusher, setPusher] = useState();

  return (
    <OrderTrackerContext.Provider
      value={{
        hasOrder,
        setHasOrder,
        messagesWithDriver,
        setMessagesWithDriver,
        pusher,
        setPusher,
      }}
    >
      {children}
    </OrderTrackerContext.Provider>
  );
};

export const useOrderTracker = () => useContext(OrderTrackerContext);
