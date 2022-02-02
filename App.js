import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import LocationScreen from "./screens/LocationScreen";
import GooglePlacesModal from "./components/GooglePlacesModal";

// icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { CartProvider } from "./context/CartContext";
import { CustomerLocationProvider } from "./context/CustomerLocationContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CustomerLocationProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "#fcbf49",
              },
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: "HungryNow",
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Location", { buttonText: "Save" })
                    }
                    style={{ paddingRight: 10 }}
                  >
                    <Entypo name="location" size={24} color="white" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <AntDesign name="shoppingcart" size={24} color="white" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={({ navigation, route }) => ({
                title: route.params.item.name,
              })}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={({ navigation }) => ({
                presentation: "fullScreenModal",
                orientation: "portrait_up",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x" size={24} color="white" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={({ navigation }) => ({
                presentation: "fullScreenModal",
                orientation: "portrait_up",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x" size={24} color="white" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Choose Location"
              component={GooglePlacesModal}
              options={({ navigation }) => ({
                presentation: "fullScreenModal",
                orientation: "portrait_up",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x" size={24} color="white" />
                  </TouchableOpacity>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </CustomerLocationProvider>
  );
}
