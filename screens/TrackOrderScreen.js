import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import OrderSummary from "../components/OrderSummary";
import TextButton from "../components/TextButton";
import { AntDesign } from "@expo/vector-icons";

import { useCustomerLocation } from "../context/CustomerLocationContext";
import { useOrderTracker } from "../context/OrderTrackerContext";
import { useAuth } from "../context/AuthContext";

import Pusher from "pusher-js/react-native";
import { GiftedChat } from "react-native-gifted-chat";

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

const TrackOrderScreen = ({ navigation, route }) => {
  const { customerLocation, customerAddress } = useCustomerLocation();
  const {
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
  } = useOrderTracker();
  const { user } = useAuth();

  const { cart } = route.params;

  // initialize pusher channels
  useEffect(() => {
    if (!order) {
      setPusher(
        new Pusher(CHANNELS_APP_KEY, {
          authEndpoint: `${NGROK_URL}/pusher/auth`,
          cluster: CHANNELS_APP_CLUSTER,
          encrypted: true,
        })
      );
    }
  }, []);

  // if an order has just been made, subscribe to drivers channel and request for driver
  useEffect(() => {
    if (pusher && !order) {
      const available_drivers_channel = pusher.subscribe(
        "private-available-drivers"
      );

      // request for driver
      available_drivers_channel.bind("pusher:subscription_succeeded", () => {
        setTimeout(() => {
          available_drivers_channel.trigger("client-request-driver", {
            customer: user,
            restaurantLocation: cart.restaurant.location,
            restaurantAddress: cart.restaurant.address,
            customerLocation,
            customerAddress,
          });
        }, 1000);
      });

      // set order to cart
      setOrder(cart);
    }
  }, [pusher]);

  // otherwise listen for events from driver
  useEffect(() => {
    if (pusher) {
      // private channel between user and driver
      const user_rider_channel = pusher.subscribe(
        `private-user-rider-${user.uid}`
      ); // to change channel name

      // confirmation with driver
      user_rider_channel.bind("client-driver-response", () => {
        user_rider_channel.trigger("client-driver-response", {
          response: hasDriver ? "no" : "yes",
        });
      });

      // driver accepted the order
      user_rider_channel.bind("client-found-driver", (data) => {
        setIsSearchingForDriver(false);
        setHasDriver(true);
        setDriverLocation(data.location);
      });

      // update driver location
      user_rider_channel.bind("client-driver-location", (data) => {
        setDriverLocation(data.location);
      });

      // update order status
      user_rider_channel.bind("client-order-update", (data) => {
        setCurrentOrderStep(data.orderStep);
      });

      // listen for messages from driver
      user_rider_channel.bind("client-new-message", ({ messages }) => {
        setMessagesWithDriver((prevMessages) =>
          GiftedChat.append(prevMessages, [{ ...messages[0], sent: true }])
        );
      });

      //driver picked up order
      user_rider_channel.bind("client-order-picked-up", () => {
        setShowMap(true);
      });

      //driver completed order
      user_rider_channel.bind("client-order-delivered", () => {
        user_rider_channel.unbind();
        setOrder();
        setIsSearchingForDriver(true);
        setHasDriver(false);
        setDriverLocation();
        pusher.unsubscribe("private-available-drivers");
        pusher.unsubscribe(`private-user-rider-${user.uid}`);
        pusher.disconnect();
        setPusher();
      });

      // cleanup
      if (currentOrderStep === orderSteps.length - 1) {
        return () => {
          setShowMap(false);
          setCurrentOrderStep(0);
          setMessagesWithDriver([]);
        };
      }
    }
  }, [pusher]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View
        style={
          showMap ? styles.orderProgressWithMap : styles.orderProgressNoMap
        }
      >
        {showMap ? (
          // map with driver's realtime location
          <MapView
            style={{ width: "100%", height: "65%" }}
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

            {/*  show markers */}
            {order?.restaurant && (
              <Marker
                title="Restaurant"
                coordinate={{
                  latitude: order?.restaurant.location[0],
                  longitude: order?.restaurant.location[1],
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

            {/* show directions */}
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

        <Text
          style={[styles.margin20, styles.textSize, { textAlign: "center" }]}
        >
          {orderSteps[currentOrderStep]}
        </Text>

        {/* contact driver */}
        {hasDriver && (
          <TextButton
            title="Contact Your Driver"
            buttonStyle={{
              backgroundColor: "#fcbf49",
              width: "50%",
              position: "absolute",
              bottom: 50,
            }}
            textStyle={{
              color: "white",
              fontSize: 18,
            }}
            onPress={() => navigation.navigate("Chat")}
          />
        )}
      </View>

      {/* order summary */}
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
    flex: 3,
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
