import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { NoticeHeight } from "@/utils/Scaling";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../CustomText";
import { Defs, G, Path, Svg, Use } from "react-native-svg";
import { wavyData } from "@/utils/dummyData";
import CustomSafeAreaView from "../CustomSafeAreaView";

const Notice = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView>
            <CustomText style={styles.heading} variant="h8">
              It's raining near this location It's raining near this location
            </CustomText>
            <CustomText variant="h9">
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      {/* <Svg
        width="100%"
        height="35"
        fill="#ccd5e4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
          <G>
            <Use href="#wavepath" y="321" />
          </G>
        </Defs>
      </Svg> */}
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCD5E4",
  },
  noticeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCD5E4",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  heading: {
    color: "black",
    marginBottom: 8,
    textAlign: "center",
  },
  wave: {
    width: "100%",
    transform: [{ rotateX: "180deg" }],
  },
});
