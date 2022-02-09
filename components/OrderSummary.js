import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import { computeSubtotal } from "../helpers";

const OrderSummary = ({ cart, isTrackOrderScreen }) => {
  const deliveryFees = 0;
  return (
    <View>
      <Text style={styles.orderDetailsText}>Order Details</Text>
      <ScrollView style={isTrackOrderScreen && { maxHeight: "40%" }}>
        {/* render each item in cart */}
        {cart?.items.map((item, index) => (
          <View
            style={[styles.cartItem, styles.flexRow, styles.borderBot]}
            key={index}
          >
            <View style={styles.flexRow}>
              <Text style={[styles.cartItemQty, styles.textSize]}>
                {item.qty}x
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
        {/* subtotal */}
        <View style={[styles.cartFooterItem, styles.flexRow]}>
          <Text style={styles.textSize}>Subtotal</Text>
          <Text style={styles.textSize}>${computeSubtotal(cart.items)}</Text>
        </View>

        {/* delivery fees */}
        <View style={[styles.cartFooterItem, styles.flexRow]}>
          <Text style={styles.textSize}>Delivery Fees</Text>
          <Text
            style={[
              styles.textSize,
              deliveryFees === 0 && { fontWeight: "bold" },
            ]}
          >
            {deliveryFees === 0 ? "Free" : `${deliveryFees}`}
          </Text>
        </View>
      </View>

      {/* total price */}
      <View style={[styles.cartTotal, styles.flexRow]}>
        <Text style={[styles.cartTotalText, styles.textSize]}>
          Total{"   "}${deliveryFees + computeSubtotal(cart.items)}
        </Text>
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  orderDetailsText: {
    marginHorizontal: 15,
    marginVertical: 5,
    fontSize: 20,
    color: "#fcbf49",
  },
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
