import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

const RestaurantCard = ({ item, onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        {/* restaurant image */}
        <Image source={item.imageURL} style={styles.image} resizeMode="cover" />
        <View style={styles.restaurantInfo}>
          <View>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDelivery}>Free Delivery</Text>
          </View>

          {/* restaurant ratings */}
          <View style={styles.ratingContainer}>
            <AntDesign
              name="star"
              size={16}
              color="#ffe234"
              style={styles.ratingElement}
            />
            <Text style={styles.ratingElement}>4.5</Text>
            <Text style={styles.ratingElement}>(55)</Text>
          </View>
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
    // shadowRadius: 2,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  restaurantName: {
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  restaurantDelivery: {
    color: "grey",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  ratingElement: {
    marginLeft: 3,
  },
});
