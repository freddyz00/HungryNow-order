import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";

import FoodItem from "../components/FoodItem";
import AddToCartModal from "../components/AddToCartModal";

import { useCart } from "../context/CartContext";
import { getNumItemsInCart } from "../helpers";

const RestaurantScreen = ({ route, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { menu, imageURL } = route.params.item;

  const { cart } = useCart();

  const onFoodItemClick = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* image */}
      <Image source={imageURL} style={styles.image} />
      {/* menu items */}
      <View style={styles.menuItems}>
        {menu.map((foodItem, index) => (
          <FoodItem
            item={foodItem}
            key={index}
            onClick={() => onFoodItemClick(foodItem)}
          />
        ))}
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
  menuItems: {
    flexGrow: 1,
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
});
