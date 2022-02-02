import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const RestaurantCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={item.imageURL} style={styles.image} resizeMode="cover" />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderStyle: "solid",
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  restaurantInfo: {
    padding: 5,
    margin: 8,
  },
  restaurantName: {
    fontSize: 16,
  },
});
