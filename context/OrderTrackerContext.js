import React, { createContext, useContext, useState } from "react";

const OrderTrackerContext = createContext();

export const OrderTrackerProvider = ({ children }) => {
  const [order, setOrder] = useState(false);
  const [hasDriver, setHasDriver] = useState(false);
  const [isSearchingForDriver, setIsSearchingForDriver] = useState(true);
  const [driverLocation, setDriverLocation] = useState();
  const [messagesWithDriver, setMessagesWithDriver] = useState([]);
  const [currentOrderStep, setCurrentOrderStep] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [pusher, setPusher] = useState();

  return (
    <OrderTrackerContext.Provider
      value={{
        order,
        setOrder,
        hasDriver,
        setHasDriver,
        isSearchingForDriver,
        setIsSearchingForDriver,
        driverLocation,
        setDriverLocation,
        messagesWithDriver,
        setMessagesWithDriver,
        currentOrderStep,
        setCurrentOrderStep,
        showMap,
        setShowMap,
        pusher,
        setPusher,
      }}
    >
      {children}
    </OrderTrackerContext.Provider>
  );
};

export const useOrderTracker = () => useContext(OrderTrackerContext);
