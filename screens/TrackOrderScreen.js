import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import OrderSummary from "../components/OrderSummary";
import { AntDesign } from "@expo/vector-icons";

import { useCustomerLocation } from "../context/CustomerLocationContext";

import Pusher from "pusher-js/react-native";

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

  useEffect(() => {
    const pusher = new Pusher(CHANNELS_APP_KEY, {
      authEndpoint: `${NGROK_URL}/pusher/auth`,
      cluster: CHANNELS_APP_CLUSTER,
      encrypted: true,
    });

    const available_drivers_channel = pusher.subscribe(
      "private-available-drivers"
    );

    available_drivers_channel.bind("pusher:subscription_error", (error) => {
      console.log(error);
    });

    available_drivers_channel.bind("pusher:subscription_succeeded", () => {
      console.log("subscription success");
      setTimeout(() => {
        available_drivers_channel.trigger("client-request-driver", {
          customer: { username: "freddy" },
          restaurantLocation: cart.restaurant.location,
          restaurantAddress: cart.restaurant.address,
          customerLocation,
          customerAddress,
        });
      }, 1000);
    });

    const user_rider_channel = pusher.subscribe("private-user-rider-freddy"); // to change channel name

    user_rider_channel.bind("client-driver-response", () => {
      user_rider_channel.trigger("client-driver-response", {
        response: hasDriver ? "no" : "yes",
      });
    });

    user_rider_channel.bind("client-found-driver", (data) => {
      setIsSearchingForDriver(false);
      setHasDriver(true);
      setDriverLocation(data.location);
    });

    user_rider_channel.bind("client-driver-location", (data) => {
      setDriverLocation(data.location);
    });

    user_rider_channel.bind("client-order-update", (data) => {
      setCurrentOrderStep(data.orderStep);
    });

    user_rider_channel.bind("client-order-picked-up", () => {
      setShowMap(true);
    });

    user_rider_channel.bind("client-order-delivered", () => {
      user_rider_channel.unbind();
      setIsSearchingForDriver(true);
      setHasDriver(false);
      setDriverLocation();
    });
    return () => {
      setShowMap(false);
      setCurrentOrderStep(0);
      pusher.unsubscribe("private-available-drivers");
      pusher.unsubscribe("private-user-rider-freddy");
      pusher.disconnect();
    };
  }, []);

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
        <OrderSummary cart={cart} isTrackOrderScreen />
      </View>
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
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
});
