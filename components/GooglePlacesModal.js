import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { useCustomerLocation } from "../context/CustomerLocationContext";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { GOOGLE_MAPS_API_KEY } from "../keys";

const GooglePlacesModal = ({ navigation }) => {
  const {
    customerLocation,
    customerAddress,
    setCustomerLocation,
    setCustomerAddress,
  } = useCustomerLocation();

  return (
    <View style={{ flex: 1 }}>
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
          {/* google maps places */}
          <GooglePlacesAutocomplete
            placeholder="Search"
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GooglePlacesModal;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 30,
    paddingVertical: 15,
    backgroundColor: "#fcbf49",
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
