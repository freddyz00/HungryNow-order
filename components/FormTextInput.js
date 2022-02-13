import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const FormTextInput = ({
  placeholder,
  onChange,
  secureTextEntry,
  onEndEditing,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.textInputContainer,
        isFocused && { borderColor: "#fcbf49" },
      ]}
    >
      {error ? (
        <Text style={{ color: "red", position: "absolute", top: -25 }}>
          {error}
        </Text>
      ) : null}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onEndEditing={onEndEditing}
      />
    </View>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({
  textInputContainer: {
    width: "90%",
    marginVertical: 15,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#DDDDDD",
    borderRadius: 10,
  },
  textInput: {
    padding: 15,
  },
});
