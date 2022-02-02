import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

// import the data
import { restaurants } from "../data/restaurants";

// import the components
import RestaurantCard from "../components/RestaurantCard";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard item={item} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading1}>All Restaurants</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  heading1: {
    fontSize: 20,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
  },
});
