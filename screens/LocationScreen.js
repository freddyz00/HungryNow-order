import {
  View,
  Text,
  Alert,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import { useCustomerLocation } from "../context/CustomerLocationContext";

const LocationScreen = ({ navigation, route }) => {
  const {
    customerLocation,
    customerAddress,
    setCustomerLocation,
    setCustomerAddress,
  } = useCustomerLocation();

  const { buttonText } = route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied");
        }
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: 3,
      });

      setCustomerLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const currentAddress = await Location.reverseGeocodeAsync(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        {}
      );

      setCustomerAddress(
        `${currentAddress[0].street} ${currentAddress[0].city}`
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.container, { width: "100%" }]}>
        <Text style={styles.deliveryAddress}>
          Delivering To: {customerAddress && customerAddress}
        </Text>
        {customerLocation ? (
          <MapView
            style={styles.map}
            region={{
              latitude: customerLocation.latitude,
              longitude: customerLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider={PROVIDER_GOOGLE}
          >
            {customerLocation && (
              <Marker
                coordinate={{
                  latitude: customerLocation.latitude,
                  longitude: customerLocation.longitude,
                }}
                title="You are here"
              />
            )}
          </MapView>
        ) : null}

        <Button
          title="Change Location"
          onPress={() => {
            navigation.navigate("Choose Location");
          }}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !customerLocation && { backgroundColor: "grey" },
        ]}
        disabled={!customerLocation}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: Dimensions.get("window").width,
    margin: 10,
  },
  deliveryAddress: {
    fontSize: 18,
    margin: 20,
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#fcbf49",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
