import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const FoodItem = ({ item, onClick }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Text style={styles.menuText}>{item.name}</Text>
      <Text style={styles.menuPrice}>${item.price}</Text>
    </TouchableOpacity>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuText: {
    fontSize: 16,
  },
  menuPrice: {
    fontSize: 16,
  },
});
