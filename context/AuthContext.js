import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Image, ActivityIndicator } from "react-native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setUser(authUser);
          setLoading(false);
        } else {
          setUser();
          setLoading(false);
        }
      }),
    []
  );

  const renderLoadingScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fcbf49",
        }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? renderLoadingScreen() : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
