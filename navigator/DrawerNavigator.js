import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <DrawerItemList {...props} />
      </View>

      <View>
        <DrawerItem
          label="Sign Out"
          onPress={() => signOut(auth)}
          icon={({ color }) => (
            <MaterialCommunityIcons name="logout" size={24} color={color} />
          )}
          labelStyle={{ fontSize: 18 }}
        />
      </View>
    </SafeAreaView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        sceneContainerStyle: { backgroundColor: "white" },
        drawerActiveBackgroundColor: "#fcbf49",
        drawerActiveTintColor: "white",
        headerTintColor: "#fcbf49",
        swipeEnabled: false,
        drawerLabelStyle: {
          fontSize: 18,
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{ marginRight: 20 }}
            >
              <AntDesign name="shoppingcart" size={24} color="#fcbf49" />
            </TouchableOpacity>
          ),
          drawerIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
