import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import OrderSummary from "../components/OrderSummary";

import { useCart } from "../context/CartContext";

const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useCart();

  return cart.items.length > 0 ? (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.restaurantTitle}>{cart.restaurant.name}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <OrderSummary cart={cart} />
      </View>
      <TouchableOpacity style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your cart is empty.</Text>
      <TouchableOpacity
        style={styles.browseItems}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Browse Items</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  restaurantTitle: {
    textAlign: "center",
    fontSize: 28,
    paddingTop: 20,
    paddingBottom: 10,
  },
  cartButton: {
    alignSelf: "center",
    backgroundColor: "#fcbf49",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  cartButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  browseItems: {
    backgroundColor: "#fcbf49",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: 10,
  },
});
