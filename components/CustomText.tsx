import { Fonts } from "@/utils/Constants";
import { FC, ReactNode } from "react";
import { StyleSheet, TextStyle } from "react-native";

interface Props {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8"
    | "h9"
    | "body";
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

import { View, Text } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/utils/Constants";

const CustomText: FC<Props> = ({
  variant = "body",
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedFontSize: number;
  switch (variant) {
    case "h1":
      computedFontSize = RFValue(fontSize || 22);
      break;
    case "h2":
      computedFontSize = RFValue(fontSize || 20);
      break;
    case "h3":
      computedFontSize = RFValue(fontSize || 18);
      break;
    case "h4":
      computedFontSize = RFValue(fontSize || 16);
      break;
    case "h5":
      computedFontSize = RFValue(fontSize || 14);
      break;
    case "h6":
      computedFontSize = RFValue(fontSize || 12);
      break;
    case "h7":
      computedFontSize = RFValue(fontSize || 12);
      break;
    case "h8":
      computedFontSize = RFValue(fontSize || 10);
      break;
    case "h9":
      computedFontSize = RFValue(fontSize || 9);
      break;
    case "body":
      computedFontSize = RFValue(fontSize || 12);
      break;
  }
  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        { color: Colors.text, fontSize: computedFontSize },
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});

export default CustomText;
