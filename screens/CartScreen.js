import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import OrderSummary from "../components/OrderSummary";

import { useCart } from "../context/CartContext";
import { useCustomerLocation } from "../context/CustomerLocationContext";

import { computeSubtotal } from "../helpers";

const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useCart();
  const { customerLocation } = useCustomerLocation();

  return cart.items.length > 0 ? (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.restaurantTitle}>{cart.restaurant.name}</Text>
      </View>
      <View style={{ flex: 1, maxHeight: "55%" }}>
        <OrderSummary cart={cart} />
      </View>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {
          if (customerLocation) {
            navigation.goBack();
            navigation.navigate("TrackOrder", { cart });
            setCart({ restaurant: {}, items: [] });
          } else {
            navigation.navigate("Change Location");
          }
        }}
      >
        <Text style={styles.cartButtonText}>{`Place Order - $${computeSubtotal(
          cart.items
        )}`}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Your cart is empty.</Text>
      <TouchableOpacity
        style={styles.browseItems}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Browse Items
        </Text>
      </TouchableOpacity>
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
  cartButton: {
    alignSelf: "center",
    backgroundColor: "#fcbf49",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
  },
  cartButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  browseItems: {
    backgroundColor: "#fcbf49",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: 20,
  },
});
