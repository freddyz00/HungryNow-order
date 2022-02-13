import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import { StatusBar } from "expo-status-bar";

// import the data
import { restaurants } from "../data/restaurants";

import RestaurantCard from "../components/RestaurantCard";

import { AntDesign } from "@expo/vector-icons";

import TextButton from "../components/TextButton";

import * as Location from "expo-location";

import { useCart } from "../context/CartContext";
import { useCustomerLocation } from "../context/CustomerLocationContext";
import { useOrderTracker } from "../context/OrderTrackerContext";

const HomeScreen = ({ navigation }) => {
  const {
    customerLocation,
    customerAddress,
    setCustomerLocation,
    setCustomerAddress,
  } = useCustomerLocation();
  const { cart } = useCart();
  const { order } = useOrderTracker();

  // number of items on the cart icon
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{ marginRight: 20 }}
        >
          <AntDesign name="shoppingcart" size={24} color="#fcbf49" />
          {cart.items.length > 0 && (
            <View style={styles.numCartItems}>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "white" }}
              >
                {cart.items.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [cart]);

  // get customer location
  useEffect(() => {
    if (!customerAddress) {
      (async () => {
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permission denied");
          }
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: 3,
        });

        setCustomerLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        const currentAddress = await Location.reverseGeocodeAsync(
          {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          {}
        );

        setCustomerAddress(
          `${currentAddress[0].street} ${currentAddress[0].city}`
        );
      })();
    }
  }, []);

  // set customer address in the header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Change Location")}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>HungryNow</Text>
            <Text style={{ fontSize: 12, maxWidth: 200 }}>
              {customerAddress &&
                (customerAddress.length < 20
                  ? customerAddress
                  : `${customerAddress?.substring(0, 20)}...`)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    });
  }, [customerAddress]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RestaurantCard
            onClick={() => {
              navigation.navigate("Restaurant", {
                item,
              });
            }}
            item={item}
            cardStyle={index === restaurants.length - 1 && { marginBottom: 20 }}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading1}>All Restaurants</Text>
          </View>
        }
      />
      {/* show button if there is currently an ongoing order */}
      {order && (
        <TextButton
          title="You have an ongoing order"
          buttonStyle={{
            backgroundColor: "#fcbf49",
            zIndex: 1,
            position: "absolute",
            bottom: 30,
            width: "80%",
          }}
          textStyle={{ fontSize: 18, color: "white", fontWeight: "bold" }}
          onPress={() => navigation.navigate("TrackOrder", { cart: order })}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heading1: {
    fontSize: 20,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
  numCartItems: {
    width: 18,
    height: 18,
    position: "absolute",
    left: 13,
    bottom: 13,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcbf49",
  },
});
