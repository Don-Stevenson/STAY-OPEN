import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";

// animate next seems to be fine according to the docs reanimated on mobile vew
// setup the animation characteristics
const transitionObj = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function AccordionListItem({ title, children }) {
  const [currentMissionId, setCurrentMissionId] = useState(null);
  const [missions, setMissions] = useState([]);
  const [launchPadInfo, setLaunchPadInfo] = useState([]);
  const [launches, setLaunches] = useState([]);
  const ref = useRef();

  const fetchMissionData = async () => {
    try {
      const missionResponse = await fetch(
        `https://api.spacexdata.com/v3/missions/`
      );
      const missionResponseJSON = await missionResponse.json();
      setMissions(missionResponseJSON);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLaunchPadInfo = async () => {
    try {
      const launchPadResponse = await fetch(
        "https://api.spacexdata.com/v3/launchpads"
      );
      const launchPadResponseJSON = await launchPadResponse.json();
      setLaunchPadInfo(launchPadResponseJSON);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLaunchs = async () => {
    try {
      const launchesResponse = await fetch(
        "https://api.spacexdata.com/v3/launches"
      );
      const launchesResponseJSON = await launchesResponse.json();
      setLaunches(launchesResponseJSON);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMissionData();
    fetchLaunchPadInfo();
    fetchLaunchs();
  }, []);

  console.log("MISSIONs are: ", missions);
  console.log("launch pads are", launchPadInfo);
  console.log("launches are", launches);

  return (
    <Transitioning.View
      ref={ref}
      transition={transitionObj}
      style={styles.bodyContainer}
    >
      {missions.map((mission, index) => {
        return (
          <TouchableOpacity
            key={mission.mission_id}
            onPress={() => {
              // this is problematic-  old way of calling the next transition
              // look at docs for better examples
              //  https://docs.swmansion.com/react-native-reanimated/docs/animations
              ref.current.animateNextTransition();
              setCurrentMissionId(mission.mission_id);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: "darkblue" }]}>
              <Text style={[styles.heading, { color: "pink" }]}>
                {mission.mission_name}
              </Text>
              {mission.mission_id === currentMissionId && (
                <View style={styles.descriptionList}>
                  <Text
                    key={"description_" + index}
                    style={[styles.body, { color: "yellow" }]}
                  >
                    {mission.description}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  descriptionList: {
    fontSize: 20,
    fontWeight: "500",
    textTransform: "lowercase",
    letterSpacing: 0,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
});
