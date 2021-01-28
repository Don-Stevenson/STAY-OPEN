import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function AccordionListItem({title, children}) {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodSectionHeight, setBodySectionHeight] = useState();

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodSectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }).start();
    }
    setOpen(!open);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={()=> toggleListItem()}>
        <View style={styles.titleContainer}>
          <Text>{title}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
          </Animated.View>
          <View style={styles.bodyBackground}>{children} </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
        <View
          style={styles.bodyContainer}
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }>
          {children}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  bodyBackground: {
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    paddingLeft: '1.5rem',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  bodyContainer: {
    padding: '1rem',
    paddingLeft: '1.5rem',
    position: 'absolute',
    bottom: 0,
  },
});
