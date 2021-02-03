import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Stay Open Challenge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "grey",
    textTransform:"uppercase"
  
  },
  text: {
    color: "White",
    fontSize: 23,
    textAlign: "center"
  },
});
