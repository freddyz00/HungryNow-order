import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import CompletedOrder from "../components/CompletedOrder";

import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    return (async () => {
      const unsub = onSnapshot(
        query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        ),
        (querySnapshot) => {
          setOrders(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      );
      return unsub;
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CompletedOrder
            item={item}
            cardStyle={index === orders.length - 1 && { marginBottom: 20 }}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading1}>Completed Orders</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  heading1: {
    fontSize: 20,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
