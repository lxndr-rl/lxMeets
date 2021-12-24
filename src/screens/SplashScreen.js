import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./App";
const phoneWidth = Dimensions.get("window").width;

export default function App() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    Platform.OS == "web"
      ? setSplash(false)
      : setTimeout(() => {
          setSplash(false);
        }, 1000);
  }, []);

  return splash ? (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Image style={styles.image} source={require("../assets/lxMeets.png")} />
    </View>
  ) : (
    <HomeScreen />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    position: "absolute",
    width: phoneWidth,
    height: phoneWidth - 200,
  },
});
