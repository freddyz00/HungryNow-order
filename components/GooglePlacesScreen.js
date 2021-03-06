import { View, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import TextButton from "./TextButton";

import { useCustomerLocation } from "../context/CustomerLocationContext";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { GOOGLE_MAPS_API_KEY } from "../keys";

const GooglePlacesScreen = ({ navigation }) => {
  const {
    customerLocation,
    customerAddress,
    setCustomerLocation,
    setCustomerAddress,
  } = useCustomerLocation();

  return (
    <View style={{ flex: 1 }}>
      {/* google maps places */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        styles={{ container: styles.googlePlacesAutocomplete }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setCustomerLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
          setCustomerAddress(details.formatted_address);
        }}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
      />
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
      <TextButton
        title="Confirm"
        buttonStyle={{
          backgroundColor: "#fcbf49",
          width: "80%",
          position: "absolute",
          bottom: 30,
        }}
        textStyle={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default GooglePlacesScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  googlePlacesAutocomplete: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 10,
  },
});
