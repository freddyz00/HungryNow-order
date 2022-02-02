import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const AddToCartModal = ({
  isModalVisible,
  setIsModalVisible,
  selectedItem,
  restaurant,
}) => {
  const [quantity, setQuantity] = useState(1);

  const addItemsToCart = () => {};
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalTop}>
            <Text
              style={styles.modalTopText}
            >{`${selectedItem?.name} - $${selectedItem?.price}`}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
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
        </View>
      </View>
    </Modal>
  );
};

export default AddToCartModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
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
    paddingHorizontal: 40,
    paddingVertical: 15,
    margin: 15,
    borderRadius: 5,
  },
  modalAddToCartText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
