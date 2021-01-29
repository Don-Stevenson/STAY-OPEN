import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AccordionListItem({ title, children }) {
  const [missions, setMissions] = useState([]);
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodSectionHeight, setBodySectionHeight] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.spacexdata.com/v3/missions/`);
      const responseJSON = await response.json();
      // console.log(responseJSON);
      setMissions(responseJSON);
      // console.log("missions", missions);
    } catch (error) {
      console.log(error);
    }
    // console.log('response:', response)
    // return response;
  };

  useEffect(() => {
    fetchData();
    // console.log({ missions });
  }, []);

  console.log("missions", missions);

  return (
    <View style={styles.bodyContainer}>
      {missions.map(({ mission_name, description }) => {
        return (
          <TouchableOpacity
            key={mission_name}
            onPress={() => {}}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, {backgroundColor: "darkblue" }]}>
              <Text style={[styles.heading, {color: "pink"}]}>{mission_name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 38,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: -2,
  },
});
