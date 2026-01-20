import {
  View, StyleSheet, TouchableOpacity
} from "react-native";
import React, { FC } from "react";
import { Colors } from "@/utils/Constants";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";

const CustomHeader: FC<{ title: string; search?: boolean }> = ({
  title,
  search,
}) => {
  return (
    <View style={styles.flexRow}>
      {/* <Pressable onPress={() => router.back()}>
        <Ionicons name="chevron-back" color={Colors.text} size={RFValue(16)} />
      </Pressable> */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" color={Colors.text} size={RFValue(16)} />
      </TouchableOpacity>
      <CustomText style={[{ fontWeight: 600 }, styles.text]} variant="h5">
        {title}
      </CustomText>
      <View>
        {search && (
          <Ionicons name="search" color={Colors.text} size={RFValue(16)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: "space-between",
    padding: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  text: {
    textAlign: "center",
  },
});

export default CustomHeader;
