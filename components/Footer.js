import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Footer() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Stay Open Tech Challenge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "grey",
    textTransform:"uppercase",
    fontWeight: "900",
    color: "white"
  }
});
