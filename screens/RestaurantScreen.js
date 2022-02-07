import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import FoodItem from "../components/FoodItem";
import AddToCartModal from "../components/AddToCartModal";

import { useCart } from "../context/CartContext";
import { getNumItemsInCart } from "../helpers";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const RestaurantScreen = ({ route, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { name, menu, imageURL } = route.params.item;

  const { cart } = useCart();

  const onFoodItemClick = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* image */}
      <View style={[styles.icon, styles.iconLeft]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={30} color="#fcbf49" />
        </TouchableOpacity>
      </View>
      <View style={[styles.icon, styles.iconRight]}>
        <TouchableOpacity
          style={{ right: 1, top: 1 }}
          onPress={() => {
            navigation.navigate("Cart");
          }}
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
      </View>
      <Image source={imageURL} style={styles.image} />
      {/* menu items */}
      <View style={styles.menuItems}>
        <FlatList
          data={menu}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => (
            <FoodItem item={item} onClick={() => onFoodItemClick(item)} />
          )}
          ListHeaderComponent={
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantHeading}>{name}</Text>
              <View style={styles.restaurantRating}>
                <View style={{ flexDirection: "row" }}>
                  <AntDesign name="star" size={16} color="#ffe234" />
                  <AntDesign name="star" size={16} color="#ffe234" />
                  <AntDesign name="star" size={16} color="#ffe234" />
                  <AntDesign name="star" size={16} color="#ffe234" />
                  <AntDesign name="star" size={16} color="#DDDDDD" />
                  <Text style={styles.numRatings}>55 ratings</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="delivery-dining"
                    size={22}
                    color="#fcbf49"
                    style={{ position: "absolute", left: -20 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fcbf49",
                      marginLeft: 5,
                    }}
                  >
                    Free Delivery
                  </Text>
                </View>
              </View>
              <Text></Text>
            </View>
          }
        />
      </View>
      {cart.items.length > 0 && (
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text
            style={styles.viewCartButtonText}
          >{`View Your Cart (${getNumItemsInCart(cart.items)} item${
            cart.items.length === 1 ? "" : "s"
          })`}</Text>
        </TouchableOpacity>
      )}

      <AddToCartModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedItem={selectedItem}
        restaurant={route.params.item}
      />
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 0,
  },
  icon: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 0,
    width: 36,
    height: 36,
    borderRadius: 25,
    justifyContent: "center",

    top: 50,
    zIndex: 100,
  },
  iconLeft: {
    left: 20,
  },
  iconRight: {
    right: 20,
  },
  restaurantInfo: {
    paddingHorizontal: 15,
    paddingTop: 10,
    borderStyle: "solid",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 5,
  },
  restaurantHeading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  restaurantRating: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
  },
  numRatings: {
    marginHorizontal: 5,
  },
  menuItems: {
    flex: 1,
    marginBottom: 10,
  },
  viewCartButton: {
    alignSelf: "center",
    backgroundColor: "#fcbf49",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  viewCartButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
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
