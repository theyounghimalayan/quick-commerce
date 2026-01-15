import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { Colors } from "@/utils/Constants";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}
const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
}: CustomButtonProps) => {
  return (
    // <Pressable
    //   onPress={onPress}
    //   disabled={disabled || loading}
    //   style={({ pressed }) => [
    //     {
    //       width: "100%",
    //       opacity: pressed ? 0.8 : 1,
    //       backgroundColor: disabled ? Colors.disabled : Colors.secondary,
    //     },
    //   ]}
    // >
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <CustomText style={styles.text} variant="h6">
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
  {
    /* </Pressable> */
  }
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: "100%",
  },
  text: {
    color: "#fff",
  },
});
