import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const OrderSummary = ({ cart, isTrackOrderScreen }) => {
  const deliveryFees = 3;
  return (
    <View>
      <ScrollView style={isTrackOrderScreen && { maxHeight: "40%" }}>
        {cart?.items.map((item, index) => (
          <View
            style={[styles.cartItem, styles.flexRow, styles.borderBot]}
            key={index}
          >
            <View style={styles.flexRow}>
              <Text style={[styles.cartItemQty, styles.textSize]}>
                {item.qty}
              </Text>
              <Text style={styles.textSize}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.textSize}>${item.price * item.qty}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.cartFooter, styles.borderBot]}>
        <View style={[styles.cartFooterItem, styles.flexRow]}>
          <Text style={styles.textSize}>Subtotal</Text>
          <Text style={styles.textSize}>${computeSubtotal(cart.items)}</Text>
        </View>
        <View style={[styles.cartFooterItem, styles.flexRow]}>
          <Text style={styles.textSize}>Delivery Fees</Text>
          <Text style={styles.textSize}>${deliveryFees}</Text>
        </View>
      </View>
      <View style={[styles.cartTotal, styles.flexRow]}>
        <Text style={[styles.cartTotalText, styles.textSize]}>
          Total{"   "}${deliveryFees + computeSubtotal(cart.items)}
        </Text>
      </View>
    </View>
  );
};

export default OrderSummary;

const computeSubtotal = (arr) => {
  return arr.reduce((value, item) => value + item.qty * item.price, 0);
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  borderBot: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  textSize: {
    fontSize: 16,
  },
  cartItem: {
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  cartItemQty: {
    marginRight: 10,
  },
  cartFooter: {
    padding: 15,
  },
  cartFooterItem: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  cartTotal: {
    padding: 15,
    justifyContent: "flex-end",
  },
  cartTotalText: {
    fontWeight: "bold",
  },
});
