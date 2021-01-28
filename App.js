import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>STAY OPEN Tech challenge</Text>
      <Image source={{uri: 'https://donstevenson.netlify.app/static/media/profile-pic.67418619.jpg'}} style={styles.img} />
  
    </View>
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'darkslateblue',
    fontSize: 30
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 /2,
  }
});
