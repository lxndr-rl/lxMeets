import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";

const phoneWidth =
  Platform.OS == "web"
    ? Dimensions.get("window").width < 800
      ? Dimensions.get("window").width
      : Dimensions.get("window").width / 2.5
    : Dimensions.get("window").width;

const Item = (props) => {
  const colors = [["#2b2b2b", "#2b2b2b"]];
  const materia = props.materia;
  return (
    <LinearGradient
      colors={colors[Math.floor(Math.random() * colors.length)]}
      style={styles.cardView}
    >
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardTitle}>
        {materia}
      </Text>
      <View style={styles.cardSection}>
        <Text style={styles.cardTextSection1}>{props.horas}</Text>
      </View>
    </LinearGradient>
  );
};
export default Item;

const styles = StyleSheet.create({
  cardView: {
    margin: 7,
    borderRadius: 20,
    backgroundColor: "gray",
    width: phoneWidth - 30,
    alignSelf: "center",
    height: 120,
  },
  cardTitle: {
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    paddingStart: 15,
  },
  cardSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextSection1: {
    flex: 2,
    color: "#a2a2a2",
    padding: 8,
    alignSelf: "stretch",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
