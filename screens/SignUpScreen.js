import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { webClientID } from "../keys";
import * as Google from "expo-auth-session/providers/google";

import { FontAwesome5 } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: webClientID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
      }}
    >
      <StatusBar style="auto" />
      {/* header icon */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: 30,
        }}
      >
        <FontAwesome5 name="utensils" size={40} color="#fcbf49" />
        <Text style={styles.header}>Hungry Now</Text>
      </View>

      {/* sign in form */}
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* email */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* password */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        {/* confirm password */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        {/* don't have an account */}
        <View
          style={{ flexDirection: "row", alignItems: "center", margin: 15 }}
        >
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={{ marginLeft: 2 }}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={{ color: "#007AFF" }}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* login button */}
        <View
          style={{
            width: "90%",
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#fcbf49",
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* sign in with google button */}
      <View style={{ width: "90%" }}>
        <TouchableOpacity
          onPress={promptAsync}
          style={[
            styles.button,
            {
              backgroundColor: "#EEEEEE",
            },
          ]}
        >
          <Image style={styles.logo} source={require("../assets/google.png")} />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fcbf49",
    marginLeft: 15,
  },
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  signUpText: {
    fontSize: 12,
  },
});
