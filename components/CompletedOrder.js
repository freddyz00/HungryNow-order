import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { images } from "../data/images";

const imageMap = {
  "Coffee Corner": "coffee",
  "Pizza Hut": "pizza",
  "Salad Bar": "salad",
  "Noodle House": "noodle",
  "Sandwich Club": "sandwich",
};

const CompletedOrder = ({ item, cardStyle }) => {
  const { restaurantName, totalPrice, timestamp } = item;
  return (
    <View style={[styles.container, cardStyle]}>
      {/* left */}
      <Image style={styles.image} source={images[imageMap[restaurantName]]} />
      {/* main content */}
      <View style={styles.main}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.amount}>${totalPrice}</Text>
        <Text>{timestamp.toDate().toLocaleString().split(",")[0]}</Text>
      </View>
      {/* right */}
      <View style={styles.right}>
        <Text>
          {timestamp.toDate().toLocaleString().split(",")[1].substring(0, 6)}{" "}
          {item.timestamp
            .toDate()
            .toLocaleString()
            .split(",")[1]
            .substring(10, 12)}
        </Text>
      </View>
    </View>
  );
};

export default CompletedOrder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderStyle: "solid",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  main: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  right: {
    marginLeft: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
