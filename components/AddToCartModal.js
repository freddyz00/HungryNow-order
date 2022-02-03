import {
  Animated,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

import * as Animatable from "react-native-animatable";

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
    setIsModalVisible(false);
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
        300
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
        <TouchableWithoutFeedback
          style={{ flex: 1, width: "100%" }}
          onPress={closeModal}
        >
          <View style={{ flex: 1, width: "100%" }} />
        </TouchableWithoutFeedback>
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
          <View style={styles.modalTop}>
            <Text
              style={styles.modalTopText}
            >{`${selectedItem?.name} - $${selectedItem?.price}`}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Feather name="x" size={28} color="#fcbf49" />
            </TouchableOpacity>
          </View>
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
          <View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addItemsToCart(selectedItem, quantity)}
            >
              <Text style={styles.modalAddToCartText}>Add To Cart</Text>
            </TouchableOpacity>
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
  addToCartButton: {
    alignSelf: "center",
    backgroundColor: "#fcbf49",
    width: "80%",
    alignItems: "center",
    paddingVertical: 15,
    margin: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  modalAddToCartText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
