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

const RestaurantScreen = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { menu, imageURL } = route.params.item;

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
});
