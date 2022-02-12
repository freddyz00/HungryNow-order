import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import OrderSummary from "../components/OrderSummary";
import TextButton from "../components/TextButton";

import { useCart } from "../context/CartContext";
import { useCustomerLocation } from "../context/CustomerLocationContext";

import { computeSubtotal } from "../helpers";

const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useCart();
  const { customerLocation } = useCustomerLocation();

  const placeOrder = () => {
    if (customerLocation) {
      navigation.goBack();
      navigation.navigate("TrackOrder", { cart });
      setCart({ restaurant: {}, items: [] });
    } else {
      navigation.navigate("Change Location");
    }
  };

  return cart.items.length > 0 ? (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View>
        <Text style={styles.restaurantTitle}>{cart.restaurant.name}</Text>
      </View>
      <View style={{ flex: 1, maxHeight: "55%" }}>
        <OrderSummary cart={cart} />
      </View>

      {/* place order button */}
      <TextButton
        title={`Place Order - $${computeSubtotal(cart.items)}`}
        buttonStyle={{
          backgroundColor: "#fcbf49",
          width: "80%",
          position: "absolute",
          bottom: 30,
        }}
        textStyle={{ fontSize: 20, color: "white", fontWeight: "bold" }}
        onPress={placeOrder}
      />
    </View>
  ) : (
    // no items in cart``
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar style="dark" />

      <Text style={{ fontSize: 18 }}>Your cart is empty.</Text>
      <TextButton
        title="Browse Items"
        buttonStyle={{
          backgroundColor: "#fcbf49",
          margin: 20,
          width: 180,
        }}
        textStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  restaurantTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
  },
});
