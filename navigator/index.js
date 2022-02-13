import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import CartScreen from "../screens/CartScreen";
import GooglePlacesScreen from "../components/GooglePlacesScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import ChatScreen from "../screens/ChatScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

// icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerBackTitleVisible: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: () => (
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Change Location")}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      HungryNow
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                  <AntDesign name="shoppingcart" size={24} color="#fcbf49" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Restaurant"
            component={RestaurantScreen}
            options={() => ({
              headerShown: false,
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
                  <Feather name="x" size={24} color="#fcbf49" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Change Location"
            component={GooglePlacesScreen}
            options={({ navigation }) => ({
              presentation: "fullScreenModal",
              orientation: "portrait_up",
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="x" size={24} color="#fcbf49" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="TrackOrder"
            component={TrackOrderScreen}
            options={{
              headerTitle: "Track Your Order",
              headerTintColor: "#fcbf49",
              headerTitleStyle: {
                color: "black",
              },
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerTintColor: "#fcbf49",
              headerTitleStyle: {
                color: "black",
              },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
