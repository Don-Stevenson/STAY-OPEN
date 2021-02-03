import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";


// map of rockets (obeject with key value pairs), map of missions, launch pads
// use object look up
// no nests loops

export default function AccordionListItem({ title, children }) {
  const [currentMissionId, setCurrentMissionId] = useState(null);
  const [launchPadInfo, setLaunchPadInfo] = useState([]);
  const [launches, setLaunches] = useState([]);
  
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
      fetchLaunchPadInfo();
    fetchLaunchs();
  }, []);

  return (
    <Transitioning.View
      // transition={transitionObj}
      style={styles.bodyContainer}
    >
      {launches.map((mission, index) => {
        console.log({ mission }, { index });
        return (
          <TouchableOpacity
            key={mission.launch_date_unix}
            onPress={() => {
              setCurrentMissionId(mission.launch_date_unix);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: "grey" }]}>
              <Text style={[styles.heading, { color: "White" }]}>
                {mission.mission_name}
              </Text>
              {mission.launch_date_unix === currentMissionId && (
                <View style={styles.descriptionList}>
                  <Text
                    key={"flight_number_" + index}
                    style={[styles.body, { color: "White" }]}
                  >
                    <p>Flight Start: {mission.launch_date_local}</p>
                    <p>Flight End: convert {mission.launch_date_local} to unix time + flightduration convert back to human readable time </p>
                    <p>Launch Site: {mission.launch_site.site_name}</p>
                    <p>{mission.launch_success ? "This mission was a Success!" : "The mission failed for this reason: " + mission.launch_failure_details.reason}</p>
                    <p>Launch Site Lattitude: Insert code with a call to the launch sites that matches the launch site from the launches with the lauch site Lat and Long</p>
                    <p>Launch Site Longitude: Same as above</p>
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
    letterSpacing: 0,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
});
