import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";

import * as Animatable from "react-native-animatable";

import TextButton from "./TextButton";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useCart } from "../context/CartContext";

const AddToCartModal = ({
  isModalVisible,
  setIsModalVisible,
  selectedItem,
  restaurant,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useCart();

  const animationRef = useRef();

  const addItemsToCart = (food, qty) => {
    if (!cart.restaurant || cart.restaurant.name === restaurant.name) {
      const found = cart.items.filter((item) => item.name === food.name);
      if (found.length === 0) {
        setCart({
          restaurant: {
            name: restaurant.name,
            address: restaurant.address,
            location: restaurant.location,
          },
          items: [...cart.items, { ...food, qty }],
        });
      } else {
        const other_items = cart.items.filter(
          (item) => item.name !== food.name
        );
        setCart({
          restaurant: {
            name: restaurant.name,
            address: restaurant.address,
            location: restaurant.location,
          },
          items: [...other_items, { ...found[0], qty: found[0].qty + qty }],
        });
      }
    } else {
      setCart({
        restaurant: {
          name: restaurant.name,
          address: restaurant.address,
          location: restaurant.location,
        },
        items: [{ ...food, qty }],
      });
    }
    closeModal();
  };

  const closeModal = () => {
    animationRef.current
      .animate(
        {
          from: {
            ["translateY"]: 0,
          },
          to: {
            ["translateY"]: 230,
          },
        },
        200
      )
      .then(() => setIsModalVisible(false));
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isModalVisible}
      onDismiss={() => {
        setQuantity(1);
      }}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        {/* modal backdrop */}
        <TouchableWithoutFeedback
          style={{ flex: 1, width: "100%" }}
          onPress={closeModal}
        >
          <View style={{ flex: 1, width: "100%" }} />
        </TouchableWithoutFeedback>

        {/* animate modal on mount */}
        <Animatable.View
          ref={animationRef}
          animation={{
            from: {
              ["translateY"]: 200,
            },
            to: {
              ["translateY"]: 0,
            },
          }}
          duration={300}
          style={styles.modalView}
        >
          {/* item details */}
          <View style={styles.modalTop}>
            <Text
              style={styles.modalTopText}
            >{`${selectedItem?.name} - $${selectedItem?.price}`}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Feather name="x" size={28} color="#fcbf49" />
            </TouchableOpacity>
          </View>

          {/* select number of items */}
          <View style={styles.modalCenter}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <AntDesign
                name="minuscircleo"
                size={28}
                color={quantity <= 1 ? "#00000022" : "#fcbf49"}
              />
            </TouchableOpacity>
            <Text style={styles.modalQuantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <AntDesign name="pluscircleo" size={28} color="#fcbf49" />
            </TouchableOpacity>
          </View>

          {/* add to cart button */}
          <View style={{ width: "80%", alignSelf: "center", margin: 30 }}>
            <TextButton
              title="Add to Cart"
              buttonStyle={{ backgroundColor: "#fcbf49" }}
              textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              onPress={() => addItemsToCart(selectedItem, quantity)}
            />
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default AddToCartModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  modalTopText: {
    fontSize: 22,
  },
  modalCenter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 15,
  },
  modalQuantity: {
    fontSize: 20,
  },
  modalAddToCartText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
