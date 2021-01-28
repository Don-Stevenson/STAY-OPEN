import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "./components/Header";
import AccordionListItem from "./components/AccordionListItem"

// useState 
// useEffect to trigger the code the call change state

export default function App() {
  // const [rockets, setRockets] = useState([]);

  return (
    <View style={styles.container}>
      <Header />
      <AccordionListItem title={"List Rocket"}>
        <Text>Some body text!</Text>
      </AccordionListItem>
      <Text style={styles.text}>Other Body Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 30,
    justifyContent: 'flex-start'
  },
  text: {
    color: "darkslateblue",
    fontSize: 16,
  },
});
