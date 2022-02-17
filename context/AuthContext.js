import React, { createContext, useContext, useState, useEffect } from "react";
import { Image, View } from "react-native";

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
        }
      }),
    []
  );

  const renderLoadingScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={{ width: 200, height: 200 }}
          resizeMethod="cover"
        />
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
