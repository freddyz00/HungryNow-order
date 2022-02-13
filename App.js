import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import Provider from "./context/Provider";

import StackNavigator from "./navigator";

import "react-native-gesture-handler";

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
