import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

const TextButton = ({ title, buttonStyle, textStyle, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle && { ...buttonStyle }]}
      onPress={onPress}
    >
      {icon && (
        <Image
          source={icon}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
      )}
      <Text style={[styles.buttonText, textStyle && { ...textStyle }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
