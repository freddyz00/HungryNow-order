import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import OrderSummary from "../components/OrderSummary";
import { AntDesign } from "@expo/vector-icons";

import { useCustomerLocation } from "../context/CustomerLocationContext";

import { calculateMapCoords } from "../helpers";

import {
  CHANNELS_APP_KEY,
  CHANNELS_APP_CLUSTER,
  GOOGLE_MAPS_API_KEY,
  NGROK_URL,
} from "../keys";

const orderSteps = [
  "Finding a driver...",
  "Driver is on the way to pick up your order",
  "Driver has picked up your order and is on the way to you",
  "Driver has delivered your order",
];

const TrackOrderScreen = ({ route }) => {
  const { customerLocation, customerAddress } = useCustomerLocation();
  const { cart } = route.params;

  const [isSearchingForDriver, setIsSearchingForDriver] = useState(true);
  const [currentOrderStep, setCurrentOrderStep] = useState(0);
  const [hasDriver, setHasDriver] = useState(false);
  const [driverLocation, setDriverLocation] = useState();
  const [showMap, setShowMap] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={
          showMap ? styles.orderProgressWithMap : styles.orderProgressNoMap
        }
      >
        {showMap ? (
          <MapView
            style={{ width: "100%", height: "80%" }}
            provider="google"
            region={calculateMapCoords(customerLocation, driverLocation)}
          >
            {customerLocation && (
              <Marker
                title="Your Location"
                coordinate={customerLocation}
                pinColor="red"
              />
            )}

            {cart.restaurant && (
              <Marker
                title="Restaurant"
                coordinate={{
                  latitude: cart.restaurant.location[0],
                  longitude: cart.restaurant.location[1],
                }}
                pinColor="blue"
              />
            )}

            {driverLocation && (
              <Marker
                title="Your Location"
                coordinate={driverLocation}
                pinColor="#fcbf49"
              />
            )}

            {customerLocation && driverLocation && (
              <MapViewDirections
                origin={driverLocation}
                destination={customerLocation}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={4}
                strokeColor="#fcbf49"
              />
            )}
          </MapView>
        ) : (
          <>
            <AntDesign
              name="checkcircle"
              size={80}
              color="#fcbf49"
              style={styles.margin20}
            />
            <Text style={[styles.margin10, styles.textSize]}>
              Your order has been placed.
            </Text>
          </>
        )}

        <Text style={[styles.margin20, styles.textSize]}>
          {orderSteps[currentOrderStep]}
        </Text>
      </View>
      <View style={{ maxHeight: "40%" }}>
        <Text style={styles.orderDetailsText}>Order Details</Text>
        <OrderSummary cart={cart} isTrackOrderScreen />
      </View>
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  orderProgressWithMap: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  orderProgressNoMap: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  margin20: {
    margin: 20,
  },
  margin10: {
    margin: 10,
  },
  textSize: {
    fontSize: 18,
  },
  orderDetailsText: {
    marginHorizontal: 15,
    marginVertical: 5,
    fontSize: 18,
    color: "#fcbf49",
  },
});
