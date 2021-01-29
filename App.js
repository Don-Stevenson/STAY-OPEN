import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Header from "./components/Header";
import AccordionListItem from "./components/AccordionListItem";

// useState
// useEffect to trigger the code the call change state

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <AccordionListItem title={"List Rocket"}>
        <StatusBar hidden />
      </AccordionListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 30,
    justifyContent: "flex-start",
  },
});
