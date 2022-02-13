import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { webClientID } from "../keys";
import * as Google from "expo-auth-session/providers/google";

import FormTextInput from "../components/FormTextInput";
import TextButton from "../components/TextButton";

import { FontAwesome5 } from "@expo/vector-icons";

import { validateEmail, validatePassword } from "../helpers";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: webClientID,
  });

  useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    if (!email) {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("");
    }
  }, [email, password]);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert(error.code);
    }
  };

  const onEmailChange = (val) => {
    setEmail(val);
    setEmailError(validateEmail(val));
  };

  const onPasswordChange = (val) => {
    setPassword(val);
    setPasswordError(validatePassword(val));
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
        <FormTextInput
          placeholder="Email"
          onChange={onEmailChange}
          error={emailError}
        />

        {/* password */}
        <FormTextInput
          placeholder="Password"
          onChange={onPasswordChange}
          secureTextEntry
          error={passwordError}
        />

        {/* don't have an account */}
        <View
          style={{ flexDirection: "row", alignItems: "center", margin: 15 }}
        >
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            style={{ marginLeft: 2 }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={{ color: "#007AFF" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* login button */}
        <View
          style={{
            width: "90%",
          }}
        >
          <TextButton
            title="Log In"
            buttonStyle={{ backgroundColor: "#fcbf49", marginVertical: 15 }}
            textStyle={{ color: "white" }}
            onPress={() => signIn(email, password)}
            disabled={!isValid}
          />
        </View>
      </View>

      {/* sign in with google button */}
      <View style={{ width: "90%" }}>
        <TextButton
          title="Sign in with Google"
          buttonStyle={{ backgroundColor: "#EEEEEE" }}
          icon={require("../assets/google.png")}
          onPress={promptAsync}
        />
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
  signUpText: {
    fontSize: 12,
  },
});
