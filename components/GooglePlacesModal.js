import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { useCustomerLocation } from "../context/CustomerLocationContext";

import { GOOGLE_MAPS_API_KEY } from "../keys";

const GooglePlacesModal = ({ navigation }) => {
  const { setCustomerLocation, setCustomerAddress } = useCustomerLocation();

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setCustomerLocation({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
        setCustomerAddress(details.formatted_address);
        navigation.goBack();
      }}
      fetchDetails={true}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: "en",
      }}
    />
  );
};

export default GooglePlacesModal;
