import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import GooglePlacesModal from "./components/GooglePlacesModal";
import TrackOrderScreen from "./screens/TrackOrderScreen";

// icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// context
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
              contentStyle: {
                backgroundColor: "white",
              },
              headerBackTitleVisible: false,
            }}
          >
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
              component={GooglePlacesModal}
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
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </CustomerLocationProvider>
  );
}
