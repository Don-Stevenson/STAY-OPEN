import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import Header from "./components/Header"

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.text}>STAY OPEN Tech challenge</Text>
        
    </View>
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  text: {
    color: 'darkslateblue',
    fontSize: 30
  },
 });
